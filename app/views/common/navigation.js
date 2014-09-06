define(["ember", "text!app/templates/common/navigation.hbs"], function(Ember, NavigationHBS){
  return Ember.View.extend({
    classNames: ["navigation"],
    template: Ember.Handlebars.compile(NavigationHBS),

    init: function() {
      this._super()
      this.set("contentView", Ember.ContainerView.create())
    },

    didInsertElement: function() {
      this.set("controller.contentView", this.get("contentView"));

      var $elem = this.$(), width = $elem.find(".navigation-well").width();
      $elem.find(".navigatable-channel").css({width: width * this.get("controller.level")})

      // TODO: 当 Navigation 在大于第一页处(如: 第二页)时，窗口大小变化，正确计算magin-left的值
    }
  })
})

