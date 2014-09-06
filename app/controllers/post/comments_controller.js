define(["ember", "app/helpers/persistence", "app/helpers/alert"], function(Ember, Persistence, Alert){
  return Ember.ArrayController.extend({
    needs: ["post"],
  })
})

