/**
    This mixin provides functionality to modal controllers

    @class Blog.ModalFunctionality
    @extends Ember.Mixin
    @namespace Blog
    @module Blog
**/
define(["ember"], function(Ember){
    return Ember.Mixin.create({
        needs: ['modal'],

        /**
            Flash a message at the top of the modal

            @method blank
            @param {String} name the name of the property we want to check
            @return {Boolean}
        **/
        flash: function(message, messageClass) {
            this.set('flashMessage', Ember.Object.create({
                message: message,
                messageClass: messageClass
            }));
        }
    })
})

