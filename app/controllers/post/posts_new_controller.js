define(["ember", "app/helpers/alert", "app/helpers/utilities", 
  "app/helpers/persistence"], function(Ember, Alert, Utilities, Persistence){
  return Ember.ObjectController.extend({
    needs: ['posts'],
    isEditting: false,

    headerTitle: function(){
        return this.get('isEditting') ? Ember.I18n.t("posts.edit") : Ember.I18n.t("posts.create")
    }.property('isEditting'),

    createOrEditTitle: function(){
        return this.get('isEditting') ? Ember.I18n.t("button.edit") : Ember.I18n.t("button.create")
    }.property('isEditting'),

    // 副文本编辑器中textarea
    textarea: null,

    actions: {
      createOrEdit: function() {
        if (!this.get('currentUser')) {
          Alert.warn(Ember.I18n.t("posts.create.error"), Ember.I18n.t("posts.create.error.unlogon"))
          return;
        }

        var post = this.get('model'), store = this.store, controller = this, 
          // body = this.get("textarea").data("sceditor").val();
          body = post.get("body");

        if (!post.get('title') || !post.get('title').trim() || !body || !post.get("category")) {
          Alert.warn(Ember.I18n.t("posts.create.error"), Ember.I18n.t("posts.create.error.check.unpass"))
          return; 
        }

        if (!post.get("id")) {  // 创建
          var data = {
            id: Utilities.UUID(),
            title: post.get("title"),
            body: body,
            category: post.get("category.id"),
            tags: post.get("tags").getIds(),
            comment_count: 0,
            creator: this.get("currentUser.id"),
            updater: this.get("currentUser.id"),
          }
          var onSuccess = function(newRecord) {
            controller.get('controllers.posts.model').insertAt(0, newRecord);
            controller.transitionToRoute("posts");
          }
          Persistence.createRecord(this.store, 'post', data, onSuccess)
        } else {  // 编辑
          var postId = post.get("id"), data = {
            title: post.get("title"),
            body: body,
            category: post.get("category.id"),
            tags: post.get("tags").toArray().getIds(),
            updater: this.get("currentUser.id"),
          }
          var onSuccess = function() {
            controller.transitionToRoute("post", postId);
          }
          Persistence.updateRecord(this.store, 'post', post, data, onSuccess)
        }
      },

      // 如果是编辑，返回到Post；如果是创建，返回到Index
      cancel: function() {
        if (!this.get('isEditting')) {
          this.transitionToRoute('posts')
        } else {
          this.transitionToRoute('post', this.get('model'))
        }
      },
    }

  })
})

