define(["ember", "app/views/modal/modal_body", "text!app/templates/modal/reset.hbs"], function(Ember, ModalBodyView, ResetView){
    return ModalBodyView.extend({
        title: function() {
            return Ember.I18n.t('reset.title')
        }.property(),

        classNames: ["reset-modal"],
        template: Ember.Handlebars.compile(ResetView),

        didInsertElement: function() {
            this._super();

            var self = this, resetController = this.get('controller');
            Ember.run.schedule('afterRender', function() {
                self.$('input').keydown(function(e) {
                    if (e.keyCode === 13) {
                        if (!resetController.get('resetDisabled')) {
                            resetController.send('reset');
                        }
                    }
                });
            });
        }
    })
})

