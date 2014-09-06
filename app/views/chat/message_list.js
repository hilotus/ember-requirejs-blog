define(["ember", "text!app/templates/chat/message_item.hbs"], function(Ember, MessageItemHBS) {
  var MesssageListView = Ember.CollectionView.extend({
    tagName: 'ul',
    classNames: ["chat-thread"],
    content: [],

    itemViewClass: Ember.View.extend({
      tagName: 'li',
      classNameBindings: ["content.isMe:is-me:is-not-me"],
      template: Ember.Handlebars.compile(MessageItemHBS),
    })
  })

  Ember.Handlebars.helper('message-list', MesssageListView)
})

