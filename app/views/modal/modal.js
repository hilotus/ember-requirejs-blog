define(["ember", "text!app/templates/modal/modal.hbs"], function(Ember, ModalHbs){
    return Ember.View.extend({
        elementId: "blog-modal",
        classNames: ["modal"],
        template: Ember.Handlebars.compile(ModalHbs),
    })
})

