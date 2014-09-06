define(["ember", "app/views/common/navigatable", "app/views/common/row", "app/models/user", "app/helpers/alert", 
  "app/mixins/presence"], function(Ember, NavigatableView, Row, User, Alert, Presence){
  return NavigatableView.extend({
    title: function(){
      return Ember.I18n.t("admin.mine.password.title")
    }.property(),
    hasLeftButton: true,
    leftButtonTitle: function() {
      return Ember.I18n.t("admin.mine.title")
    }.property(),
    hasRightButton: false,

    actions: {
      leftButtonAction: function(controller) {
        controller.pop()
      },
    },

    sections: ["minePasswordSection"],
    minePasswordSection: Ember.Object.extend(Presence, {
      title: function() {
        return Ember.I18n.t("admin.mine.password.title")
      }.property(),

      oldPasswordValue: "",
      newPasswordValue: "",
      checkPasswordValue: "",

      isDisabled: function() {
        return this.blank("oldPasswordValue") || this.blank("newPasswordValue") || this.blank("checkPasswordValue") || 
          this.get("newPasswordValue").length < 6 || this.get("checkPasswordValue") != this.get("newPasswordValue");
      }.property("oldPasswordValue", "newPasswordValue", "checkPasswordValue"),

      rows: ["oldPassword", "newPassword", "confirmPassword", "button"],
      oldPassword: Row.extend({
        type: "input",
        placeholder: function() {
          return Ember.I18n.t("admin.mine.oldPassword")
        }.property(),
        valueBinding: "section.oldPasswordValue",
      }),

      newPassword: Row.extend({
        type: "input",
        placeholder: function() {
          return Ember.I18n.t("admin.mine.newPassword")
        }.property(),
        valueBinding: "section.newPasswordValue",
      }),

      confirmPassword: Row.extend({
        type: "input",
        placeholder: function() {
          return Ember.I18n.t("admin.mine.checkPassword")
        }.property(),
        valueBinding: "section.checkPasswordValue",
      }),

      button: Row.extend({
        type: "button",
        title: function() {
          return Ember.I18n.t("button.save")
        }.property(),
        submit: function(section) {
          if (section.get("isDisabled")) return;
          User.changePassword(this.get("currentUser.id"), section.get("oldPasswordValue"), 
            section.get("newPasswordValue")).then(function(result){
            if (result.errors) {
              Alert.error(Ember.I18n.t("admin.mine.checkPassword.error"), result.errors[0].errorMessage)
            } else {
              // changePassword Sucess
              Alert.check(result.message, "")
            }
          }, function(result){
            Alert.error(Ember.I18n.t("admin.mine.checkPassword.error"), Ember.I18n.t("ajax.error.request"))
          })
        }
      })

    })
  })
})

