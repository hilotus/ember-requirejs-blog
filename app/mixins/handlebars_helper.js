define(['ember'], function(Ember){
  Ember.Handlebars.registerHelper('eql', function(param1, param2, options) {
    return Ember.Handlebars.bind.call(options.contexts[0], param1, options, true, function(result) {
      return result == param2;
    });
  });

  Ember.Handlebars.registerHelper('gt', function(param1, param2, options) {
    return Ember.Handlebars.bind.call(options.contexts[0], param1, options, true, function(result) {
      return result > param2;
    });
  });
})

