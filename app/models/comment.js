define(["ember", "ember-data", "app/mixins/moment_format"], 
  function(Ember, DS, MomentFormat){
  return DS.Model.extend(MomentFormat, {
    post: DS.belongsTo('post'),
    body: DS.attr('string'),

    creator_name: DS.attr('string'),
    creator_email: DS.attr('string'),
    creator_url: DS.attr('string'),
    creator_ip: DS.attr('string'),

    created: DS.attr('date'),
    updated: DS.attr('date'),
    creator: DS.belongsTo('user'),
    updater: DS.belongsTo('user'),

    // 是否为登录用户创建的评论
    isMe: function() {
      var user = this.container.lookup("user:current")
      return user && user.get("id") == this.get('creator.id')
    }.property('creator'),

    // 登录用户是否为文章作者
    isAuthor: function() {
      var user = this.container.lookup("user:current")
      return user && user.get("id") == this.get('post.creator.id')
    }.property('post.creator'),

    // 评论是否为文章作者创建
    isBelongToAuthor: function() {
      var commentCreatorId = this.get('creator.id'), postCreatorId = this.get('post.creator.id');
      return commentCreatorId && postCreatorId && commentCreatorId == postCreatorId
    }.property('creator', 'post.creator')
  })
})

