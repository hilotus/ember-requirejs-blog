define(['ember', 'moment'], function(Ember, moment){
  // 用于model中创建时间和更新时间的显示的mixin
  return Ember.Mixin.create({
    format: "LLL",
    format_created: function() {
      var user = this.container.lookup("user:current");
      return moment(this.get("created")).lang(user ? (user.get("locale") || "zh-cn") : "zh-cn").format(this.get("format"))
    }.property('format', 'created'),

    format_updated: function() {
      var user = this.container.lookup("user:current");
      return moment(this.get("created")).lang(user ? (user.get("locale") || "zh-cn") : "zh-cn").format(this.get("format"))
    }.property('format', 'updated')
  })
})

