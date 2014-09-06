define(["ember", "app/mixins/modal_functionality", "app/mixins/presence", "app/helpers/utilities",
        "app/controllers/modal/modal_controller", "i18n"
    ], function(Ember, ModalFunctionality, Presence, Utilities){
    return Ember.Controller.extend(ModalFunctionality, Presence, {
        email: '',
        sending: false,
        complete: false,

        resetForm: function() {
            this.set('email', '');
            this.set('sending', false);
            this.set('complete', false);
        },

        forgotButtonText: function() {
            return this.get('sending') ? Ember.I18n.t('forgot.sending') : Ember.I18n.t('forgot.send');
        }.property('sending'),

        forgotDisabled: function() {
            return this.get('sending') || this.blank('email') || !Utilities.emailValid(this.get('email'));
        }.property('email', 'sending'),

        showSpinner: function() {
            return this.get('sending');
        }.property('sending'),

        actions: {
            forgot: function() {
                this.set('sending', true)

                var forgotController = this;
                Utilities.ajax({
                    url: "account/forgotpassword",
                    data: {email: this.get('email')},
                    type: "POST"
                }).then(function(result){
                    forgotController.set('sending', false);

                    if (result.errors) {
                        forgotController.flash(result.errors[0].errorMessage, 'error');
                    } else {
                        forgotController.flash(result.message);
                        forgotController.set('complete', true);
                    }
                }, function(result){
                    forgotController.set('sending', false);
                    forgotController.flash(result.statusText, 'error');
                })
            }
        }
    })
})

