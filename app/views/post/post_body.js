define(["ember", "app/views/common/markdown"], function(Ember){
  var PostBodyView = Ember.View.extend({
    classNameBindings: [':post-body'],

    // html or text
    body: "",
    // template: Ember.Handlebars.compile("{{format-markdown view.body}}")
    template: function() {
      var html = this.get('body')
      return Ember.Handlebars.compile(html)
    }.property('body')
  })

  Ember.Handlebars.helper("post-body", PostBodyView)
})

