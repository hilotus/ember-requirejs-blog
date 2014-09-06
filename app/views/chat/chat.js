define(["ember", "text!app/templates/chat/chat.hbs", "app/views/chat/message_list", 
  "app/views/chat/message_create"], function(Ember, ChatHbs){
  return Ember.View.extend({
    template: Ember.Handlebars.compile(ChatHbs)
  })
})

