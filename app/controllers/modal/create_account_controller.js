define(["ember", "app/mixins/modal_functionality", "app/mixins/presence", "app/helpers/utilities",
        "app/models/user", "app/helpers/alert", "app/controllers/modal/modal_controller", "i18n"
    ], function(Ember, ModalFunctionality, Presence, Utilities, User, Alert){
    return Ember.Controller.extend(ModalFunctionality, Presence, {
        uniqueEmailValidation: null,
        complete: false,
        formSubmitted: false,

        resetForm: function() {
            this.setProperties({
                accountName: '',
                accountEmail: '',
                accountPassword: '',
                complete: false,
                formSubmitted: false,
            });
        },

        createAccountText: function() {
            return Ember.I18n.t("create.account.title")
        }.property(),

        submitDisabled: function() {
            if (this.get('nameValidation.failed')) return true;
            if (this.get('emailValidation.failed')) return true;
            if (this.get('passwordValidation.failed')) return true;
            return false;
        }.property('nameValidation.failed', 'emailValidation.failed', 'passwordValidation.failed'),

        // Validate the name
        nameValidation: function() {
            // If blank, fail without a reason
            if (this.blank('accountName')) return Ember.Object.create({ failed: true });

            // If too short
            if (this.get('accountName').length < 2) {
                return Ember.Object.create({
                    failed: true,
                    reason: Ember.I18n.t('create.account.name.too_short')
                });
            }

            // Looks good!
            return Ember.Object.create({
                ok: true,
                reason: Ember.I18n.t('create.account.name.ok')
            });
        }.property('accountName'),

        // Validate the password
        passwordValidation: function() {
            // If blank, fail without a reason
            if (this.blank('accountPassword')) return Ember.Object.create({ failed: true });

            // If too short
            if (this.get('accountPassword').length < 6) {
                return Ember.Object.create({
                    failed: true,
                    reason: Ember.I18n.t('create.account.password.too_short')
                });
            }

            // Looks good!
            return Ember.Object.create({
                ok: true,
                reason: Ember.I18n.t('create.account.password.ok')
            });
        }.property('accountPassword'),

        // Validate the email
        emailValidation: function() {
            var basic, unique;
            basic = this.get('basicEmailValidation');
            unique = this.get('uniqueEmailValidation');
            if (unique) {
              return unique;
            }
            return basic;
        }.property('basicEmailValidation', 'uniqueEmailValidation'),

        basicEmailValidation: function() {
            this.set('uniqueEmailValidation', null);

            if (this.blank('accountEmail')) return Ember.Object.create({ failed: true });

            if (!Utilities.emailValid(this.get('accountEmail'))) {
                return Ember.Object.create({
                    failed: true,
                    reason: Ember.I18n.t('create.account.email.invalid.format')
                });
            }

            this.checkEmailAvailability();
            // Let's check it out asynchronously
            return Ember.Object.create({
                failed: true,
                reason: Ember.I18n.t('create.account.email.validating')
            });
        }.property('accountEmail'),

        checkEmailAvailability: Utilities.debounce(function(){
            var _this = this;
            User.checkEmail(this.get('accountEmail')).then(function(result){
                if (result.errors) {
                    Alert.error(Ember.I18n.t("create.account.error.check.email.error"), result.errors[0].errorMessage)
                } else {
                    // 为true，说明邮箱已存在
                    if (result.failed) {
                        return _this.set("uniqueEmailValidation", Ember.Object.create({
                            failed: true,
                            reason: Ember.I18n.t("create.account.email.repeat")
                        }))
                    } else {
                        return _this.set("uniqueEmailValidation", Ember.Object.create({
                            ok: true,
                            reason: Ember.I18n.t('create.account.email.ok')
                        }))
                    }
                }
            })
        }, 500),


        actions: {
            createAccount: function() {
                var createAccountController = this;
                this.set('formSubmitted', true);
                // 默认语言为zh-cn
                User.createAccount(this.get("accountName"), this.get("accountEmail"), this.get("accountPassword"), "zh-cn").then(function(result) {
                    createAccountController.set('formSubmitted', false);

                    if (result.success) {
                        createAccountController.flash(result.message);
                        createAccountController.set('complete', true);
                    } else {
                        createAccountController.flash(result.errors[0].errorMessage, 'error');
                    }
                }, function(result) {
                    createAccountController.set('formSubmitted', false);
                    createAccountController.flash(Ember.I18n.t("ajax.error.request"), 'error');
                })
            },

            cancel: function() {
                this.send("showLogin");
            }
        }
    })
})

