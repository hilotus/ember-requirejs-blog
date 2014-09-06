define(["ember", "text!app/templates/common/navigatable.hbs", "i18n", 
  "app/views/input/edit_input", "app/views/input/create_input"], function(Ember, NavigatableHBS){
  return Ember.View.extend({
    classNames: ['navigatable'],
    title: "",

    hasLeftButton: false,
    leftButtonTitle: "",

    hasRightButton: false,
    rightButtonTitle: "",

    actions: {
      leftButtonAction: function(){},
      rightButtonAction: function(){},
    },

    sections: [],
    content: [],
    template: Ember.Handlebars.compile(NavigatableHBS),

    generate: function(){
      var _this = this, user = this.get("currentUser"), store = this.get("store");

      _this.set("sectionsView", [])
      this.get("sections").forEach(function(section) {
        section = _this.get(section).create({owner: _this})
        section.set("rowsView", [])
        // 一般的row
        section.get("rows").forEach(function(row) {
          row = section.get(row).create({owner: _this, section: section, currentUser: user, store: store})
          section.get("rowsView").pushObject(row)
        })
        // row的集合
        section.get("rowCollection") && section.get("rowCollection").forEach(function(row) {
          row = row.create({owner: _this, section: section, currentUser: user, store: store})
          section.get("rowsView").pushObject(row)
        })
        _this.get("sectionsView").pushObject(section)
      })
    }.on("willInsertElement")
  })
})

