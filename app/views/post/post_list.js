define(["ember", "app/mixins/scrolling", "text!app/templates/post/post_list_item.hbs", "app/views/post/post_description"], 
  function(Ember, Scrolling, PostListItemHbs) {
  var PostListView = Ember.CollectionView.extend(Scrolling, {
    classNames: ["list-article"],
    content: null,

    didInsertElement: function() {
      this.bindScrolling()
    },
    willDestroyElement: function() {
      this.unbindScrolling();
    },
    scrolled: function(evt) {
      // 到底部的位置，便加载新文章
      if ($(window).scrollTop() + $(window).height() == $(document).height()) {
        // Ember.debug('Todo something')
        if (this.get('controller')) this.get('controller').paginate();
      }
    },

    itemViewClass: Ember.View.extend({
      classNames: ["pure-g"],
      template: Ember.Handlebars.compile(PostListItemHbs)
    })
  })

  Ember.Handlebars.helper('post-list', PostListView)
})

