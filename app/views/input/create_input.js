define(["ember"], function(Ember){
    var CreateInputView = Ember.TextField.extend({
        // press Enter key
        insertNewline: function() {
            this.get('relativeController').createRecord(this.get("value"));
            this.set("value", "")
        },

        becomeFocus: function() {
            // Ember.run.scheduleOnce("afterRender", this, function(){
                // this.$().focus();
            // })
        }.on('didInsertElement'),
    })

    Ember.Handlebars.helper("create-input", CreateInputView)
})

