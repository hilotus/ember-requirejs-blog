define(['ember'], function(Ember){
    Ember.Handlebars.registerHelper('eql', function(param1, param2, options) {
        if (!param1 || Handlebars.Utils.isEmpty(param1) || !param2 || Handlebars.Utils.isEmpty(param2)) {
            return options.inverse(this);
        // "this" 是模版中绑定的对象
        } else if (this.get(param1) == this.get(param2) || this.get(param1) == param2 || 
            param1 == this.get(param2) || param1 == param2) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    });
})

