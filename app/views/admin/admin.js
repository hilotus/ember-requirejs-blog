define(["ember", "text!app/templates/admin/admin.hbs"], function(Ember, AdminHbs){
  return Ember.View.extend({
    template: Ember.Handlebars.compile(AdminHbs)
  })
})

