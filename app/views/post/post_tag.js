define(["ember"], function(Ember){
    var TagView = Ember.View.extend({
        tagName: "a",
        classNames: ["post-tag"],
        tag: null,

        // TODO: Post 中点击标签
        click: function() {
            
        },

        template: Ember.Handlebars.compile("{{view.tag.name}}")
    })

    Ember.Handlebars.helper("post-tag", TagView)
})

