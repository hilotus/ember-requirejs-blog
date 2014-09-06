define(["ember", "app/views/common/navigation", "app/views/admin/navigatable/menu"], 
  function(Ember, NavigationView, AdminMenuNavigatableView){
  return NavigationView.extend({
    classNames: ["admin"],

    // 为navigation加入第一个navigatable
    didInsertElement: function() {
      this._super();

      this.get("controller").push(AdminMenuNavigatableView)
    }
  })
})

