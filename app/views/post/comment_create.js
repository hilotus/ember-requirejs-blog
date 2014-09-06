define(["ember", "text!app/templates/post/comment_create.hbs", "app/helpers/alert", "app/helpers/utilities", 
  "app/helpers/persistence"], function(Ember, CommentCreateHBS, Alert, Utilities, Persistence){
  var CommnetCreateView = Ember.View.extend({
    classNames: ['comment-create'],
    template: Ember.Handlebars.compile(CommentCreateHBS),

    post: null,
    currentUser: null,

    body: "",
    creator_name: "",
    creator_email: "",
    creator_url: "",
    creator_ip: "",

    creatingIn: false,
    createDisabled: function() {
      if (!this.get('currentUser') && !Utilities.emailValid(this.get('creator_email'))) {
        return true
      }
      return this.get('creatingIn') || this.blank('body');
    }.property('body', 'currentUser', 'creator_email', 'creatingIn'),

    showSpinner: function() {
      return this.get('creatingIn');
    }.property('creatingIn'),

    actions: {
      createComment: function() {
        var view = this, data = {
          post: this.get("post.id"),
          body: this.get("body"),
          creator_name: this.get("creator_name") || this.get("currentUser.name"),
          creator_email: this.get("creator_email") || this.get("currentUser.email"),
          creator_url: this.get("creator_url"),
          creator_ip: this.get("creator_ip"),
          creator: this.get("currentUser.id"),
        }, store = this.container.lookup('store:main');

        this.set('creatingIn', true);
        Alert.operating(Ember.I18n.t("post.comment.creating"))
        Persistence.createRecord(store, "comment", data, function(comment){
          view.set('creatingIn', false)
          view.set("body", "")
          view.set("creator_email", "")
          Alert.removeLoading()
        })
      }
    }
  })

  Ember.Handlebars.helper('comment-create', CommnetCreateView)
})

