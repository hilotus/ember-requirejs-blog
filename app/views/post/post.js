define(["ember", "text!app/templates/post/post.hbs", "app/views/post/post_category", "app/views/post/post_tag", 
  "app/views/post/post_body", "app/views/post/comment_create", "app/views/post/comment_list"], function(Ember, PostHbs){
    return Ember.View.extend({
      template: Ember.Handlebars.compile(PostHbs),
    })
  }
)

