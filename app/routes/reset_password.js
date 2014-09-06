define(["app/routes/route", "app/helpers/utilities"], function(Route, Utilities){
  return Route.extend({
    renderTemplate: function() {
      this._super();
      var email = Utilities.gup(window.location.href, "email");
      Route.showModal(this, 'reset');
      this.controllerFor('reset').resetForm(email);
    },

    actions: {
      // 关闭后重置密码页面，跳转到首页
      closeModal: function() {
        this._super()
        this.transitionTo('index')
      },
    }
  })
})

