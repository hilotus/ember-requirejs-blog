define(["app/controllers/navigation_controller"], function(NavigationController){
  return NavigationController.extend({
    // Navigatable的总页数
    level: 3,
    // 页面滑动时间(秒)
    wait: 0.4,
  })
})

