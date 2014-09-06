define(["jquery", "ember", "app/helpers/utilities"], function($, Ember, Utilities) {
  return Ember.Controller.extend({
    // 可以使用needs引入其他controller, 进行推送成功后的操作
    needs: ["chat"],

    notif: function(title, message, pushName) {
      this._notifcation(title, message)
    },

    notifWhite: function(title, message) {
      this._notifcation(title, message, "notif-white")
    },

    _notifcation: function(title, message, type) {
      var $notif = $('body .notif');
      $notif.find('.notif-title').text(title)
      $notif.find('p').text(message)

      $notif.css({top: "10px", visibility: "visible", opacity: 1})
      var _timeout = setTimeout(function() {
        $notif.css({top: "-10px", visibility: "hidden", opacity: 0})
        clearTimeout(_timeout)
      }, 5000);
    },

    baseServerPushUrl: "http://blog.foreverboy.net/webcourier",
    baseServerWebSocketUrl: "blog.foreverboy.net/webcourier",

    currentUser: null,
    store: null,

    /*
     * changeSet
     */
    lastSyncTime: null,

    /*
     * Push Start
     */
    PUSH_RETRY_WAIT: 10,
    scheduleAttempt: function (functionName) {
      var m = "_attemptCount_" + functionName, runLater = this[m];
      if (!runLater) {
        this[m] = runLater = 1
      }
      var l = "_attemptTimer_" + functionName, j = this[l];
      if (j) {
        Ember.warn("Push: There is already an attemptTimer for %@", functionName);
        return
      }

      var h = this.get("PUSH_RETRY_WAIT"), notif = this;
      Ember.debug("Push: Scheduling '%@' in %@ seconds".fmt(functionName, h));

      this[l] = setTimeout(function() {
        notif[l] = null;
        notif[functionName]()
      }, h * 1000);
    },

    hasPushConnection: false,
    parkConnection: function() {
      if (this.get("hasPushConnection")) {
        Ember.warn("We already have an established push connection");
        return
      }

      var xhr = new XMLHttpRequest(), notif = this;
      xhr.open("POST", this.get("baseServerPushUrl") + "?uid=%@".fmt(this.get('currentUser.id')), !0)
      xhr.setRequestHeader("Content-Type", "text/plain");
      xhr.withCredentials = false;
      xhr.timeout = 600 * 1000;

      xhr.ontimeout = function() {
        notif.set("hasPushConnection", false);
        notif.scheduleAttempt("parkConnection");
      }

      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {  // success
            try {
              var result = JSON.parse(decodeURI(xhr.responseText))

              // 接收消息
              if (result.model && result.model == "message") {
                var store = notif.get("store"), chatController = notif.get("controllers.chat");
                delete result.model
                var message = store.push("message", result)
                chatController.get("messages").pushObject(message)
              }

              // TODO: changeSet处理
              // result为{}，发送changSet请求来更新长连接对应的前台的store；
              // 若包含badge，更新对应app的提醒数目；
              // 若包含message和title，弹出通知提示框。
            } catch (ex) {
              Ember.debug("no data")
            }

            notif.set("hasPushConnection", false);
            var _timeout = setTimeout(function() {
              notif.parkConnection();
              clearTimeout(_timeout)
            }, 500);
          }
        
          if (xhr.status == 408) {
            Ember.debug("409: Request Time-out")
            notif.set("hasPushConnection", false);
            notif.scheduleAttempt("parkConnection");
          }

          if (xhr.status == 409) {
            Ember.debug("409: Re-parked multiple connections with the same pushToken")
            notif.set("hasPushConnection", false);
            notif.scheduleAttempt("parkConnection");
          }

          if (xhr.status == 403 || xhr.status == 401) {
            Ember.debug("403: The pushToken has expired")
            notif.set("hasPushConnection", false);
            alert("APNS 403 response")
          }

          if (xhr.status == 0) {
            Ember.debug("Unknown error: The park push connection closed unexpectedly")
            notif.set("hasPushConnection", false);
            notif.scheduleAttempt("parkConnection");
          }
        }
      }
      this.set("hasPushConnection", true);
      xhr.send(null)
    }
  })
})

