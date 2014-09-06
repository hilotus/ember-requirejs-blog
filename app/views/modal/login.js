define(["ember", "app/views/modal/modal_body", "text!app/templates/modal/login.hbs"], function(Ember, ModalBodyView, LoginView){
    return ModalBodyView.extend({
        title: function() {
            return Ember.I18n.t('login.title')
        }.property(),

        classNames: ["login-modal"],
        template: Ember.Handlebars.compile(LoginView),

        didInsertElement: function() {
            this._super();

            var self = this, loginController = this.get('controller');
            Ember.run.schedule('afterRender', function() {
                self.$('input').keydown(function(e) {
                    if (e.keyCode === 13) {
                        if (!loginController.get('loginDisabled')) {
                            loginController.send('login');
                        }
                    }
                });
            });
        }
    })
})

