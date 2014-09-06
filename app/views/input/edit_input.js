define(["ember"], function(Ember){
    var EditInputView = Ember.TextField.extend({
        // press Enter key
        insertNewline: function() {
            this.get('relativeController').doneEditing();
        },

        // lose focus
        focusOut: function() {
            this.get('relativeController').cancelEditing();
        },

        // press Esc key
        cancel: function() {
            this.get('relativeController').cancelEditing();
        },

        // after view generat
        didInsertElement: function() {
            this.$().focus();
        }
    })

    Ember.Handlebars.helper("edit-input", EditInputView)
})

