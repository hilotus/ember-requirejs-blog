define(["ember", "app/views/modal/modal_body", 
    "text!app/templates/modal/create_account.hbs"], function(Ember, ModalBodyView, CreateAccountView){
    return ModalBodyView.extend({
        title: function() {
            return Ember.I18n.t('create.account.title')
        }.property(),

        classNames: ["create-account-modal"],
        template: Ember.Handlebars.compile(CreateAccountView),

        didInsertElement: function() {
            this._super();

            // allows the submission the form when pressing 'ENTER' on *any* text input field
            // but only when the submit button is enabled
            var createAccountController = this.get('controller');
            Ember.run.schedule('afterRender', function() {
                $("input[type='text'], input[type='password']").keydown(function(e) {
                    if (createAccountController.get('submitDisabled') === false && e.keyCode === 13) {
                        createAccountController.send('createAccount');
                    }
                });
            });
        }
    })
})

