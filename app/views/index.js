define(["ember", "text!app/templates/index.hbs", "app/views/common/slideshow"], function(Ember, indexHbs){
  return Ember.View.extend({
    template: Ember.Handlebars.compile(indexHbs)
  })
})

