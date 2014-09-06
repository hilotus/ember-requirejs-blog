define(["ember", "app/mixins/modal_functionality", "app/mixins/presence", "app/helpers/utilities",
        "app/controllers/modal/modal_controller", "i18n"
    ], function(Ember, ModalFunctionality, Presence, Utilities){
    return Ember.Controller.extend(ModalFunctionality, Presence, {
        email: '',
        password: '',
        passwordConfirm: '',
        resetting: false,
        complete: false,

        resetForm: function(email) {
            this.set('email', email);
            this.set('password', '');
            this.set('passwordConfirm', '');
            this.set('resetting', false);
            this.set('complete', false);
        },

        resetButtonText: function() {
            return this.get('resetting') ? Ember.I18n.t('reset.resetting') : Ember.I18n.t('reset.reset');
        }.property('resetting'),

        resetDisabled: function() {
            return this.get('resetting') || this.blank('password') || this.blank('passwordConfirm') || this.get('password') != this.get('passwordConfirm');
        }.property('password', 'passwordConfirm', 'resetting'),

        showSpinner: function() {
            return this.get('resetting');
        }.property('resetting'),

        actions: {
            reset: function() {
                if (this.get('password').length < 6) {
                    this.flash(Ember.I18n.t('reset.password.too_short'), 'error');
                    return
                }

                var email = this.get('email');
                if (!email) {
                    this.flash(Ember.I18n.t('reset.email.empty'), 'error');
                    return
                }

                this.set('resetting', true)

                var resetController = this;
                Utilities.ajax({
                    url: "account/resetpassword",
                    data: {email: email, password: resetController.get("password")},
                    type: "POST"
                }).then(function(result){
                    resetController.set('resetting', false);

                    if (result.errors) {
                        resetController.flash(result.errors[0].errorMessage, 'error');
                    } else {
                        resetController.flash(result.message);
                        resetController.set('complete', true);
                    }
                }, function(result){
                    resetController.set('resetting', false);
                    resetController.flash(result.statusText, 'error');
                })
            }
        }
    })
})

