define(["ember", "app/views/modal/modal_body", "text!app/templates/modal/forgot.hbs"], function(Ember, ModalBodyView, ForgotView){
    return ModalBodyView.extend({
        title: function() {
            return Ember.I18n.t('forgot.title')
        }.property(),

        classNames: ["forgot-modal"],
        template: Ember.Handlebars.compile(ForgotView),

        didInsertElement: function() {
            this._super();

            var self = this, forgotController = this.get('controller');
            Ember.run.schedule('afterRender', function() {
                self.$('input').keydown(function(e) {
                    if (e.keyCode === 13) {
                        if (!forgotController.get('forgotDisabled')) {
                            forgotController.send('forgot');
                        }
                    }
                });
            });
        }
    })
})

