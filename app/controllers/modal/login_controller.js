define(["ember", "app/mixins/modal_functionality", "app/mixins/presence", "app/helpers/utilities",
        "app/controllers/modal/modal_controller", "app/controllers/modal/create_account_controller", 
        "app/controllers/modal/forgot_controller", "i18n"
    ], function(Ember, ModalFunctionality, Presence, Utilities){
    return Ember.Controller.extend(ModalFunctionality, Presence, {
        needs: ['modal', 'createAccount', 'forgot'],
        authenticate: null,
        loggingIn: false,

        resetForm: function() {
            this.set('authenticate', null);
            this.set('loggingIn', false);
        },

        loginButtonText: function() {
            return this.get('loggingIn') ? Ember.I18n.t('login.logging') : Ember.I18n.t('login.title');
        }.property('loggingIn'),

        loginDisabled: function() {
            return this.get('loggingIn') || this.blank('email') || !Utilities.emailValid(this.get('email')) || this.blank('loginPassword');
        }.property('email', 'loginPassword', 'loggingIn'),

        showSpinner: function() {
            return this.get('loggingIn') || this.get('authenticate');
        }.property('loggingIn', 'authenticate'),

        actions: {
            // 普通登录
            login: function() {
                this.set('loggingIn', true);

                var loginController = this;
                Utilities.ajax({
                    url: "account/login",
                    data: {email: this.get('email'), password: this.get('loginPassword')},
                    type: "POST"
                }).then(function(result){
                    loginController.set('loggingIn', false);

                    if (result.errors) {
                        loginController.flash(result.errors[0].errorMessage, 'error');
                    } else {
                        window.location.reload()
                    }
                }, function(result){
                    loginController.set('loggingIn', false);
                    loginController.flash(result.statusText, 'error');
                })
            },
            // 插件登录
            externalLogin: function(loginMethod) {
                this.set('authenticate', loginMethod);
                var w = window.open("%@/account/auth/%@".fmt(Utilities.get("baseServerUrl"), loginMethod), "_blank",
                    "menubar=no,status=no,height=400,width=800,left=100,top=50");
                var self = this;
                var timer = setInterval(function() {
                    if(w.closed) {
                        clearInterval(timer);
                        self.set('authenticate', null);
                    }
                }, 1000);
            },
            // 创建账户
            createAccount: function() {
                var createAccountController = this.get('controllers.createAccount');
                createAccountController.resetForm();
                this.send('showCreateAccount');
            },
            // 忘记密码
            forgotPassword: function() {
                var forgotController = this.get('controllers.forgot');
                forgotController.resetForm();
                this.send('showForgot');
            }
        }
    })
})

