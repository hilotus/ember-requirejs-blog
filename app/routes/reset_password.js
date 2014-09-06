define(["app/routes/route"], function(Route){
  return Route.extend({
    renderTemplate: function() {
      Route.showModal(this, 'reset');
      this.controllerFor('reset').resetForm();
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

