define(["ember", "text!app/templates/post/posts_index.hbs", "app/views/common/search", "app/views/post/post_list"], 
  function(Ember, PostIndexHbs){
  return Ember.View.extend({
    template: Ember.Handlebars.compile(PostIndexHbs),
  })
})

