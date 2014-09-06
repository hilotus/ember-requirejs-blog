define(["ember"], function(Ember){
  var PostDescriptionView = Ember.View.extend({
    tagName: "p",
    classNameBindings: [':post-description'],

    // html or text
    body: "",
    template: function() {
      var html = this.get('body') ,text = html.substring(html.indexOf("<p>") + 3, html.indexOf("</p>"));
      return Ember.Handlebars.compile(text)
    }.property('body')
  })

  Ember.Handlebars.helper("post-description", PostDescriptionView)
})

