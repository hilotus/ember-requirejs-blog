define(["ember", "app/helpers/utilities"], function(Ember, Utilities){
  var CategoryView = Ember.View.extend({
    tagName: 'a',
    classNames: ['post-category'],
    category: null,
    template: Ember.Handlebars.compile("{{view.category.name}}"),

    // TODO: Post 中点击分类
    click: function() {
    },

    didInsertElement: function() {
      this.$().css({"background-color": this.get('category.color')})
    }
  })

  Ember.Handlebars.helper("post-category", CategoryView)
})

