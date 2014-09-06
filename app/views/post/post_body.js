define(["ember", "app/views/common/markdown"], function(Ember){
  var PostBodyView = Ember.View.extend({
    classNameBindings: [':post-description', 'isShowAll::not-showall'],
    isShowAll: true,

    // html or text
    body: "",
    template: Ember.Handlebars.compile("{{format-markdown view.body}}")
  })

  Ember.Handlebars.helper("post-body", PostBodyView)
})

