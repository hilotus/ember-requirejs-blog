define(["ember", "text!app/templates/application.hbs"], function(Ember, appHbs){
    return Ember.View.extend({
        template: Ember.Handlebars.compile(appHbs)
    })
})

