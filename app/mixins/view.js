// https://github.com/jamesarosen/ember-i18n

// Add the mixin Ember.I18n.TranslateableAttributes, and use
// {{#view Ember.Button titleTranslation="button.add_user.title"}}
// <a {{translateAttr title="button.add_user.title" data-disable-with="button.add_user.disabled"}}>Link</a>
define(["ember", "i18n", "app/mixins/presence"], function(Ember, I18n, Presence){
  Ember.View.reopen(Ember.I18n.TranslateableProperties, Presence, {})
})

