define(["ember", "text!app/templates/chat/message_create.hbs", "app/helpers/utilities"], 
  function(Ember, MessageCreateHBS, Utilities){
  var MessageCreateView = Ember.View.extend({
    classNames: ['message-create'],
    template: Ember.Handlebars.compile(MessageCreateHBS),

    currentUser: null,
    relativeController: null,

    body: "",

    actions: {
      createMessage: function() {
        if (this.blank("body")) {
          return
        }

        var data = {
          id: Utilities.UUID(),
          body: this.get("body"),
          creator: this.get("currentUser.id") || "",
          created: new Date,
          updater: this.get("currentUser.id") || "",
          updated: new Date,
        }, store = this.container.lookup('store:main'), view = this;

        this.set("body", "")

        Utilities.ajax({
          url: "chat/message",
          type: "POST",
          data: data
        }).then(function(){
          var message = store.push('message', data)
          view.get("relativeController.messages").pushObject(message)
        }, function(){
          alert("send error")
        })
      }
    }
  })

  Ember.Handlebars.helper('message-create', MessageCreateView)
})

