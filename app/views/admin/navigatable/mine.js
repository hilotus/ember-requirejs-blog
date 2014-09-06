define(["ember", "app/views/common/navigatable", "app/views/common/row", "app/views/admin/navigatable/mine_password",
  "app/helpers/persistence"], function(Ember, NavigatableView, Row, AdminMinePasswordNavigatableView, Persistence){
  return NavigatableView.extend({
    title: function(){
      return Ember.I18n.t("admin.mine.title")
    }.property(),

    hasLeftButton: true,
    leftButtonTitle: function() {
      return Ember.I18n.t("admin.title")
    }.property(),
    hasRightButton: false,

    actions: {
      leftButtonAction: function(controller) {
        controller.pop()
      },
    },

    sections: ["mineSection"],
    mineSection: Ember.Object.extend({
      title: function() {
        return Ember.I18n.t("admin.sectionheader.option")
      }.property(),

      rows: ["email", "name", "password"],
      email: Row.extend({
        type: "des-horizontal",
        title: function(){
          return Ember.I18n.t("admin.mine.email")
        }.property(), 
        description: Ember.computed.oneWay('currentUser.email'),
      }),

      name: Row.extend({
        type: "des-horizontal-select",
        title: function(){
          return Ember.I18n.t("admin.mine.name")
        }.property(),
        isEditing: false,
        bufferedName: Ember.computed.oneWay('currentUser.name'),
        cancelEditing: function() {
          this.set('bufferedName', this.get('currentUser.name'));
          this.set('isEditing', false);
        },
        doneEditing: function() {
          var user = this.get('currentUser');
          if (Ember.isEmpty(this.get('bufferedName').trim())) {
            this.set('bufferedName', this.get('currentUser.name'));
          } else {
            // name有变化才更新
            if (this.get('name') != this.get('bufferedName')) {
              user.set('name', this.get('bufferedName'));
              var userId = user.get("id"), data = {
                name: user.get("name"),
                updater: user.get("id"),
              }
              var onSuccess = function() {}
              Persistence.updateRecord(this.store, 'user', user, data, onSuccess)
            }
          }
          this.set('isEditing', false);
        },
        edit: function() {
          this.set('bufferedName', this.get('currentUser.name'));
          this.set('isEditing', true);
        },
      }),

      password: Row.extend({
        isExternalLogin: Ember.computed.notEmpty('currentUser.external_login'),
        type: function() {
          return this.get("isExternalLogin") ? "switch" : "select"
        }.property("isExternalLogin"),
        title: function(){
          return this.get("isExternalLogin") ? this.get('currentUser.externalLoginExplain') : Ember.I18n.t("admin.mine.password")
        }.property("isExternalLogin"),
        action: function(controller) {
          controller.push(AdminMinePasswordNavigatableView)
        }
      })
    })
  })
})

