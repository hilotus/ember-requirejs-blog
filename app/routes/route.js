define(["ember", "app/models/user"], function(Ember, User) {
    var Route = Ember.Route.extend({
        // 通常方法执行顺序
        // beforeModel, serialize, model, afterModel, activate, setupController, renderTemplate

        actions: {
            showLogin: function() {
                Route.showModal(this, 'login');
                this.controllerFor('login').resetForm();
            },

            showCreateAccount: function() {
                Route.showModal(this, 'createAccount');
            },

            showForgot: function() {
                Route.showModal(this, 'forgot');
            },

            closeModal: function() {
                this.disconnectOutlet({
                    outlet: 'fbModalBody',
                    parentView: 'modal'
                });
                this.disconnectOutlet({
                    outlet: 'fbModal',
                    parentView: 'application'
                });
            },

            logout: function() {
                User.logout();
            },

            // then this hook will be fired with the error and most importantly a Transition
            // object which you can use to retry the transition after you handled the error
            error: function(error, transition) {
                // handle the error
                // console.log(error.message);
                // retry the transition
                // transition.retry();
                if (error.status == 404) {
                    this.transitionTo("errors.unfound")
                }                
            }
        }
    })

    Route.reopenClass({
        /**
            Shows a modal
            @method showModal
        **/
        showModal: function(router, name) {
            router.render('modal', {into: 'application', outlet: 'fbModal'});
            router.render(name, {into: "modal", outlet: 'fbModalBody', controller: name})
        },
    })

    return Route
})

