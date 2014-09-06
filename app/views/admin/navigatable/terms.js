define(["ember", "app/views/common/navigatable", "app/views/common/row", "app/helpers/utilities", 
  "app/helpers/alert", "app/helpers/persistence"], function(Ember, NavigatableView, Row, Utilities, Alert, Persistence){
  return NavigatableView.extend({
    // term, tag or category
    type: "tag",

    title: function() {
      return Ember.I18n.t("admin.%@.create".fmt(this.get("type")))
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

    sections: ["termsSection"],
    termsSection: Ember.Object.extend({
      title: function() {
        return Ember.I18n.t("admin.%@.list".fmt(this.get('owner.type')))
      }.property('owner.type'),

      rows: ["createInput"],
      createInput: Row.extend({
        type: "create-input",
        placeholder: function() {
          return Ember.I18n.t("admin.%@.create".fmt(this.get("owner.type")))
        }.property(),
        createRecord: function(name) {
          if (!name) {
            var type = this.get("owner.type"), termName = Ember.I18n.t("blog." + type);
            Alert.warn(
              Ember.I18n.t("admin.term.create.error").fmt(termName), 
              Ember.I18n.t("admin.term.create.error.name.empty.title").fmt(termName)
            );
            return;
          }

          var self = this, data;
          var onSuccess = function(newRecord) {
            self.get("owner.content").pushObject(newRecord);
            self.get("owner").rerender()
          }
          data = {
              name: name,
              type: this.get('owner.type'),
              owner: this.get("currentUser.id"),
              color: Utilities.color()
          }
          Persistence.createRecord(this.store, 'term', data, onSuccess)
        }
      }),

      rowCollection: function() {
        var rows = []
        this.get("owner.content").forEach(function(term){
          rows.pushObject(Row.extend({
            type: "des-horizontal-select",
            term: term,

            canDelete: true,
            isEditing: false,
            bufferedName: Ember.computed.oneWay('term.name'),
            cancelEditing: function() {
              this.set('bufferedName', this.get('term.name'));
              this.set('isEditing', false);
            },
            doneEditing: function() {
              var term = this.get('term');
              if (Ember.isEmpty(this.get('bufferedName').trim())) {
                this.set('bufferedName', this.get('term.name'));
              } else {
                // name有变化才更新
                if (this.get('term.name') != this.get('bufferedName')) {
                  term.setProperties({ 'name': this.get('bufferedName') });
                  var temrId = term.get("id"), data = {
                      name: term.get("name"),
                      type: term.get("type")
                  };
                  var onSuccess = function() {}
                  Persistence.updateRecord(this.store, 'term', term, data, onSuccess)
                }
              }
              this.set('isEditing', false);
            },
            edit: function() {
              this.set('bufferedName', this.get('term.name'));
              this.set('isEditing', true);
            },
            remove: function() {
              var term = this.get('term'), self = this;
              var onSuccess = function() {
                self.get("owner.content").removeObject(term);
                self.get("owner").rerender()
              }
              Persistence.deleteRecord(this.store, 'term', term, onSuccess)
            }
          }))
        })
        return rows
      }.property("owner.content.length")
    })
  })
})

