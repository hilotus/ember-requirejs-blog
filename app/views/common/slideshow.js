define(["ember", "text!app/templates/common/slideshow.hbs"], function(Ember, slideshow){
  var Slideshow = Ember.View.extend({
    template: Ember.Handlebars.compile(slideshow)
  })

  Ember.Handlebars.helper('slideshow', Slideshow)
})