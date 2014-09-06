define(["ember", "app/helpers/alert", "app/helpers/utilities", 
  "app/helpers/persistence"], function(Ember, Alert, Utilities, Persistence){
  return Ember.ObjectController.extend({
    needs: ['posts'],
    isEditting: false,

    headerTitle: function(){
      return this.get('isEditting') ? Ember.I18n.t("posts.edit") : Ember.I18n.t("posts.create")
    }.property('isEditting'),

    creatingIn: false,
    showSpinner: function() {
      return this.get('creatingIn');
    }.property('creatingIn'),

    createOrEditTitle: function(){
      if (this.get('isEditting')) {
        return this.get('creatingIn') ? Ember.I18n.t("button.editting") : Ember.I18n.t("button.edit")
      } else {
        return this.get('creatingIn') ? Ember.I18n.t("button.creating") : Ember.I18n.t("button.create") 
      }
    }.property('isEditting', 'creatingIn'),

    // 副文本编辑器中textarea
    textarea: null,

    actions: {
      createOrEdit: function() {
        if (!this.get('currentUser')) {
          Alert.warn(Ember.I18n.t("posts.create.error"), Ember.I18n.t("posts.create.error.unlogon"))
          return;
        }

        var post = this.get('model'), store = this.store, controller = this, 
          body = this.get("textarea").data("sceditor").val();

        if (!post.get('title') || !post.get('title').trim() || !body || !post.get("category")) {
          Alert.warn(Ember.I18n.t("posts.create.error"), Ember.I18n.t("posts.create.error.check.unpass"))
          return; 
        }

        post.set('body', body)

        this.set('creatingIn', true)
        if (!post.get("id")) {  // 创建
          var data = {
            id: Utilities.UUID(),
            title: post.get("title"),
            body: body,
            category: post.get("category.id"),
            tags: post.get("tags").getIds(),
            comment_count: 0,
            author: this.get("currentUser.id"),
          }

          Alert.operating(Ember.I18n.t("button.creating"))
          Persistence.createRecord(this.store, 'post', data, function(newRecord){
            controller.get('controllers.posts.model').insertAt(0, newRecord)
            controller.transitionToRoute("posts")
          }).then(function(){
            controller.set('creatingIn', false)
            Alert.removeLoading()
          })
        } else {  // 编辑
          var postId = post.get("id"), data = {
            title: post.get("title"),
            body: body,
            category: post.get("category.id"),
            tags: post.get("tags").toArray().getIds(),
            updater: this.get("currentUser.id"),
          }

          Alert.operating(Ember.I18n.t("button.editting"))
          Persistence.updateRecord(this.store, 'post', post, data, function(){
            controller.transitionToRoute("post", postId)
          }).then(function(){
            controller.set('creatingIn', false)
            Alert.removeLoading()
          })
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

