define(["ember", "ember-data", "app/mixins/moment_format"], 
  function(Ember, DS, MomentFormat){
  return DS.Model.extend(MomentFormat, {
    body: DS.attr('string'),

    created: DS.attr('date'),
    updated: DS.attr('date'),
    creator: DS.belongsTo('user'),
    updater: DS.belongsTo('user'),

    // 是否为登录用户创建
    isMe: function() {
      var user = this.container.lookup("user:current")
      return user && user.get("id") == this.get('creator.id')
    }.property('creator')
  })
})

