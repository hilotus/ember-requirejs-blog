/**
 * Model to setup default Parse attributes like create/update date
 * fields.
 * @type {DS.Model}
 */
define(["ember", "ember-data", "moment"], function(Ember, DS, moment){
  var FBModel = DS.FBModel = DS.Model.extend({
    created: DS.attr('datetime'),
    updated: DS.attr('datetime'),
    creator: DS.belongsTo('user'),
    updater: DS.belongsTo('user'),

    className: "",
    parseClassName: function(){
      return this.get("className");
    },

    format: "LLL",
    createdAtFormat: function() {
      var user = this.container.lookup("user:current");
      return moment(this.get("created")).lang(user ? (user.get("locale") || "zh-cn") : "zh-cn").format(this.get("format"))
    }.property('format', 'created'),

    updatedAtFormat: function() {
      var user = this.container.lookup("user:current");
      return moment(this.get("updated")).lang(user ? (user.get("locale") || "zh-cn") : "zh-cn").format(this.get("format"))
    }.property('format', 'updated')

  });

  return FBModel;
})

