define(["app/routes/route"], function(Route) {
  // 文章列表
  return Route.extend({
    // 依次进入以下方法

    // 查询该route中的model(应用的数据)
    model: function() {
      var controller = this.controllerFor('posts');
      if (controller.get("page") == 1 && controller.get("page") != controller.get("pages") 
        && (!controller.get("model") || controller.get("model.length") == 0))
        return this.store.findQuery('post', {per_page: controller.get("per_page"), page: controller.get("page")})
      else 
        return undefined
    },
    // 给要使用的controller的model赋值
    setupController: function(controller, model) {
      /*
        metadata的使用，请参考 http://emberjs.com/guides/models/handling-metadata/
      */
      var controller = this.controllerFor('posts');
      if (model) {
        var meta = this.store.metadataFor("post");
        controller.set('model', model).set("pages", meta.pages)
      }
    },
    // 使用哪一个controller来刷新template
    renderTemplate: function() {
      this.render({ controller: 'posts' });
    },

    // 离开文章列表route时做的处理
    actions: {
      willTransition: function(transition) {
        // 所以得使用一下方式取得postsController，再设值
        this.controllerFor("posts").setProperties({
          keywords: "",
          hasDisplayAll: false
        })
      }
    }
  })
})

