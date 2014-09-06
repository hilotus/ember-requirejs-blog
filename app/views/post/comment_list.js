define(["ember", "text!app/templates/post/comment_list_item.hbs", "app/helpers/alert", "app/helpers/utilities", 
  "app/helpers/persistence", "app/views/common/markdown"], function(Ember, CommentListItemHBS, Alert, Utilities, Persistence){
  var CommnetListView = Ember.CollectionView.extend({
    classNames: ['comment-list'],

    content: null,
    currentUser: null,

    itemViewClass: Ember.View.extend({
      classNames: ["comment-item"],
      template: Ember.Handlebars.compile(CommentListItemHBS),

      discardSave: function() {
        this.set('buffered', this.get('content.body'));
        this.set('isEditing', false);
      },

      didSave: function() {
        this.set('isEditing', false);
      },

      isEditing: false,
      isReplying: false,
      buffered: Ember.computed.oneWay('content.body'),

      actions: {
        edit: function() {
          this.set('buffered', this.get('content.body'));
          this.set('isEditing', true);
          Ember.run.schedule("afterRender", this, function(){
            this.$().find('textarea').focus();
          })
        },

        delete: function() {
          var comment = this.get('content'), store = this.container.lookup('store:main');

          Alert.warn(Ember.I18n.t("post.comment.delete.confirm"), "", [
            Ember.I18n.t("button.cancel"), 
            Ember.I18n.t("button.delete")
          ], function(index) {
            if (index == 2) {  // 删除
              Utilities.ajax({url: "comment/%@".fmt(comment.get("id")), type: "DELETE"}).then(function(result){
                if (result.errors) {
                  Alert.error(Ember.I18n.t("post.comment.delete.error"), result.errors[0].errorMessage)
                } else {
                  store.unloadRecord(comment)
                  store.pushPayload('post', result.post)
                }
              }, function(result){
                Alert.error(Ember.I18n.t("post.comment.delete.error"), result.statusText)
              })
            }
          })
        },

        cancel: function() {
          this.discardSave()
        },

        save: function() {
          var comment = this.get('content'), store = this.container.lookup('store:main'), view = this;

          if (!Ember.isEmpty(this.get('buffered').trim()) && comment.get('body') != this.get('buffered')) {
            var data = {
              body: this.get('buffered')
            }
            var onSuccess = function() { view.didSave() }
            Persistence.updateRecord(store, 'comment', comment, data, onSuccess)
          } else {
            this.discardSave()
          }
        },

        reply: function() {

        }
      }
    })
  })

  Ember.Handlebars.helper('comment-list', CommnetListView)
})