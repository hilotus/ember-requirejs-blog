define(["ember", "app/views/common/navigatable", "app/views/common/row", "app/views/admin/navigatable/mine", 
  "app/views/admin/navigatable/terms"], function(Ember, NavigatableView, Row, AdminMineNavigatableView, AdminTermsNavigatableView){
  return NavigatableView.extend({
    title: function(){
      return Ember.I18n.t("admin.title")
    }.property(),
    hasLeftButton: false,
    hasRightButton: false,

    sections: ["menuSection"],
    menuSection: Ember.Object.extend({
      title: function() {
        return Ember.I18n.t("admin.sectionheader.option")
      }.property(),

      rows: ["mine","tag", "category"],
      mine: Row.extend({
        type: "select",
        title: function() {
          return Ember.I18n.t("admin.mine.title")
        }.property(),
        action: function(controller) {
          controller.push(AdminMineNavigatableView)
        }
      }),

      tag: Row.extend({
        type: "select",
        title: function() {
          return Ember.I18n.t("admin.tag.title")
        }.property(),
        action: function(controller) {
          var tags = controller.container.lookup("term:tag")
          controller.push(AdminTermsNavigatableView.extend({
            type: "tag",
            content: tags,
          }))
        }
      }),

      category: Row.extend({
        type: "select",
        title: function() {
          return Ember.I18n.t("admin.category.title")
        }.property(),
        action: function(controller) {
          var categories = controller.container.lookup("term:category")
          controller.push(AdminTermsNavigatableView.extend({
            type: "category",
            content: categories,
          }))
        }
      })
    })
  })
})

