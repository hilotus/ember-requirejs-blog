define(["jquery", "ember"], function($, Ember, Notification) {
  return Ember.Object.create({
    // email检验
    emailValid: function(email) {
      return /^([A-Z0-9\.\-\_\+])*([A-Z0-9\+\-\_])+\@[A-Z0-9]+([\-][A-Z0-9]+)*([\.][A-Z0-9\-]+){1,8}$/i.test(email || "")
    },

    baseUrl: "http://blog.foreverboy.net",
    baseServerUrl: "http://blog.foreverboy.net",

    // 重写ajax
    ajax: function(options) {
      var utils = this;
      var performAjax = function(promise) {
        if ((options.type.toUpperCase() == "POST" || options.type.toUpperCase() == "PUT") && options.data) {
          /*
            这么写防止ajax将data以表单formData格式提交后台
            想将数据以request.data来传递
          */
          options.contentType = 'application/json;charset=UTF-8',
          options.data = JSON.stringify(options.data)
        }
        if (options.url.indexOf("account") > -1) {
          options.url = "%@/%@".fmt(utils.get("baseServerUrl"), options.url)
        } else {
          options.url = "%@/blog/%@".fmt(utils.get("baseServerUrl"), options.url)
        }
        options.dataType = 'json';
        options.xhrFields = { 'withCredentials': true };

        /*
          原ajax中success方法参数，data, status, response
        */
        options.success = function(xhr) {
          Ember.run(promise, promise.resolve, xhr);
        };

        /*
          原ajax中error方法参数，response, message, status
        */
        options.error = function(xhr) {
          // If it's a parseerror, don't reject
          if (xhr.status === 200) return options.success(xhr);
          Ember.run(promise, promise.reject, xhr);
        };

        $.ajax(options);
      };

      return Ember.Deferred.promise(performAjax);
    },

    /**
      Debounce a Javascript function. This means if it's called many times in a time limit it
      should only be executed once (at the end of the limit counted from the last call made).
      Original function will be called with the context and arguments from the last call made.

      @method debounce
      @module Discourse
      @param {function} func The function to debounce
      @param {Number} wait how long to wait
    **/
    debounce: function(func, wait) {
      var self, args;
      var later = function() {
        func.apply(self, args);
      };

      return function() {
        self = this;
        args = arguments;
        Ember.run.debounce(null, later, wait);
      }
    },

    // 从url中通过参数名获取参数
    gup: function(url, name) {
      name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
      var regexS = "[\\#&?]"+name+"=([^&#]*)";
      var regex = new RegExp(regexS);
      var results = regex.exec(url);
      if( results == null )
        return "";
      else
        return results[1];
    },

    // 左右摇摆
    vacillate: function(element) {
      // 左摇右摆时的速度
      var speed = 30;
      element.animate({left:"-=3px"},speed).animate({left:"+=6px"},speed).animate({left:"-=6px"},speed).animate({left:"+=6px"},speed).animate({left:"-=6px"},speed).animate({left:"+=6px"},speed).animate({left:"-=6px"},speed).animate({left:"+=6px"},speed).animate({left:"-=3px"},speed);
    },

    UUID: function() {
      return this.UUIDcreatePart(4) + '-' +
        this.UUIDcreatePart(2) + '-' +
        this.UUIDcreatePart(2) + '-' +
        this.UUIDcreatePart(2) + '-' +
        this.UUIDcreatePart(6);
    },

    UUIDcreatePart: function(length) {
      var uuidpart = "";
      for (var i=0; i<length; i++) {
        var uuidchar = parseInt((Math.random() * 256), 10).toString(16);
        if (uuidchar.length == 1) {
          uuidchar = "0" + uuidchar;
        }
        uuidpart += uuidchar;
      }
      return uuidpart;
    },

    colors: '#AB9364 #283890 #25AAE2 #92278F #990000 #05f #3AB54A #aaa #F7941D #5aba59 #4d85d1 #8156a7 #df2d4f'.w(),
    color: function() {
      var array = this.get('colors');
      var n = Math.floor(Math.random() * array.length + 1) - 1;
      return array[n];
    }
  })
})

