define(["ember", "text!app/templates/post/post_create_or_edit.hbs", "app/views/common/picker"
  /*, "app/views/common/sceditor_textarea"*/], function(Ember, PostCreateOrEditHbs){
  return Ember.View.extend({
    template: Ember.Handlebars.compile(PostCreateOrEditHbs)
  })
})

