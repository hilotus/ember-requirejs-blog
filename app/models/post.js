define(["ember", "ember-data", "app/models/model"], function(Ember, DS, FBModel){
  return FBModel.extend({
    title: DS.attr('string'),
    body: DS.attr('string'),
    category: DS.belongsTo('term'),
    /*
        hasMany一定要加上{async: true}，否则报错。
        Assertion failed: You looked up the 'tags' relationship on '<Blog.Post:ember368:be0b58a8-bf97-8295-512d-76363b2939a1>' 
        but some of the associated records were not loaded. Either make sure they are all loaded together with the parent record, 
        or specify that the relationship is async (`DS.hasMany({ async: true })`)
    */
    tags: DS.hasMany('term', {async: true}),
    author: DS.belongsTo('user'),
    comments: DS.hasMany('comment', {async: true}),
    comment_count: DS.attr('number', {defaultValue: 0}),

    // 是否为登录用户创建
    isMe: function() {
      var user = this.container.lookup("user:current");
      return user && user.get("id") == this.get('creator.id')
    }.property('creator')
  })
})

