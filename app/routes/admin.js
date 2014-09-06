define(["app/routes/route"], function(Route){
  return Route.extend({
    renderTemplate: function() {
      this._super()

      if (this.get("currentUser")) {
        // 添加AdminNavigation
        this.render("adminNavigation", {
          into: 'admin',
          outlet: 'adminNavigation',
          controller: 'adminNavigation',
        })
      }
    },

    actions: {
      willTransition: function(transition) {
        this.disconnectOutlet({
          outlet: '',
          parentView: 'admin'
        });
      }
    }
  })
})

