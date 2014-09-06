define(["ember-data"], function(DS){
  return DS.Transform.extend({
    serialize: function(serialized) {
      return serialized
    },

    deserialize: function(deserialized) {
      return deserialized
    }
  })
})

