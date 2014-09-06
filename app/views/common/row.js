define(["ember", "i18n"], function(Ember){
  /*
    section rows
    1. select row
    2. common row
  */
  return Ember.Object.extend({
    type: "",

    isSelect: function() {
      return this.get("type") == "select"
    }.property("type"),

    isDesHorizontal: function() {
      return this.get("type") == "des-horizontal"
    }.property("type"),

    isDesHorizontalSelect: function() {
      return this.get('type') == "des-horizontal-select"
    }.property('type'),

    isSwitch: function() {
      return this.get('type') == "switch"
    }.property("type"),

    isInput: function() {
      return this.get('type') == "input"
    }.property("type"),

    isCreateInput: function() {
      return this.get('type') == "create-input"
    }.property("type"),

    isButton: function() {
      return this.get('type') == "button"
    }.property("type")
  })
})

