define(["app/routes/route"], function(Route){
    // 创建文章
    return Route.extend({
        setupController: function(controller, model) {
            controller.set('model', Ember.Object.create({ tags: [] }))
            controller.set("isEditting", false);
        },

        renderTemplate: function() {
            this.render("post_create_or_edit")
        }
    })
})

