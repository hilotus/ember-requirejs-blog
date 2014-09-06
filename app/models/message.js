define(["ember", "ember-data", "app/models/model"], function(Ember, DS, FBModel){
  return FBModel.extend({
    body: DS.attr('string'),

    // 是否为登录用户创建
    isMe: function() {
      var user = this.container.lookup("user:current")
      return user && user.get("id") == this.get('creator.id')
    }.property('creator')
  })
})

