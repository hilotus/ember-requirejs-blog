define(["ember", "ember-data", "app/models/model"], function(Ember, DS, FBModel){
  return FBModel.extend({
    post: DS.belongsTo('post'),
    body: DS.attr('string'),

    creator_name: DS.attr('string'),
    creator_email: DS.attr('string'),
    creator_url: DS.attr('string'),
    creator_ip: DS.attr('string'),

    // 评论是否为登录用户创建
    isMe: function() {
      var user = this.container.lookup("user:current")
      return user && user.get("id") == this.get('creator.id')
    }.property('creator'),

    // 评论是否为文章作者创建
    isBelongToAuthor: function() {
      var commentCreatorId = this.get('creator.id'), postCreatorId = this.get('post.author.id');
      return commentCreatorId && postCreatorId && commentCreatorId == postCreatorId
    }.property('creator', 'post.author')
  })
})

