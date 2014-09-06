define(["ember", "i18n", "app/mixins/presence"], function(Ember, I18n, Presence){
  Ember.Component.reopen(Ember.I18n.TranslateableProperties, Presence, {})
})

