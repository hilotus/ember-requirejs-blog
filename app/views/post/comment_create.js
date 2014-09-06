define(["ember", "text!app/templates/post/comment_create.hbs", "app/helpers/alert", "app/helpers/utilities"], 
  function(Ember, CommentCreateHBS, Alert, Utilities){
  var CommnetCreateView = Ember.View.extend({
    classNames: ['comment-create'],
    template: Ember.Handlebars.compile(CommentCreateHBS),

    postId: null,
    currentUser: null,

    body: "",
    creator_name: "",
    creator_email: "",
    creator_url: "",
    creator_ip: "",

    actions: {
      createComment: function() {
        if (this.blank("body")) {
          Alert.warn(Ember.I18n.t("post.comment.create.error"), Ember.I18n.t("post.comment.create.error.nocontent"))
          return
        }
        if (!this.currentUser && (this.blank("creator_email") || !Utilities.emailValid(this.get('creator_email')))) {
          Alert.warn(Ember.I18n.t("post.comment.create.error"), Ember.I18n.t("post.comment.create.error.email"))
          return
        }

        var data = {
          id: Utilities.UUID(),
          post: this.get("postId"),
          body: this.get("body"),
          creator_name: this.get("creator_name"),
          creator_email: this.get("creator_email"),
          creator_url: this.get("creator_url"),
          creator_ip: this.get("creator_ip"),
          creator: this.get("currentUser.id") || "",
          updater: this.get("currentUser.id") || "",
        }, store = this.container.lookup('store:main');

        this.set("body", "")
        this.set("creator_email", "")

        Utilities.ajax({url: "comment", type: "POST", data: data}).then(function(result){
          if (result.errors) {
            Alert.error(Ember.I18n.t("post.comment.create.error"), result.errors[0].errorMessage)
          } else {
            store.push('comment', result.comment)
            store.pushPayload('post', result.post)
          }
        }, function(result){
          Alert.error(Ember.I18n.t("post.comment.create.error"), result.statusText)
        })
      }
    }
  })

  Ember.Handlebars.helper('comment-create', CommnetCreateView)
})

