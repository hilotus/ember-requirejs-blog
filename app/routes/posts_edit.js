define(["app/routes/route", "preload-store"], function(Route){
  return Route.extend({
    model: function(params) {
      var post = PreloadStore.get('selectedPost'), needRequest = false;
      // 如果缓存中没有该Post，则从后台读取
      if (!post || post.get("id") != params.post_id) {
        needRequest = true
      }

      return needRequest ? this.store.find('post', params.post_id) : post
    },

    setupController: function(controller, model) {
      PreloadStore.store('selectedPost', model);
      this.controllerFor('postsNew').set('model', model).set("isEditting", true);
    },

    renderTemplate: function() {
      this.render("post_create_or_edit", { controller: "postsNew" })
    },

    actions: {
      willTransition: function(transition) {
        var model = this.get("currentModel");
        // TODO: post的category发生变化，但是isDirty还是false。
        // if (model.get("isDirty")) {
            model.rollback();
        // }
      }
    }
  })
})