define(["ember", "app/views/common/checkbox"], function(Ember){
  // 多选
  var PickerMultipDropListItemView = Ember.View.extend({
    tagName: 'li',
    classNameBindings: [':result'],

    attributeBindings: ['style'],
    style: "margin: 5px 6px;padding: 0;",

    isFocus: false,

    // 集合中每个item对象
    content: null,

    mouseEnter: function(event) {
      this.set('isFocus', true)
      return true
    },

    mouseLeave: function(event) {
      this.set('isFocus', false)
      return true
    },

    /*
      复选框是否选中
      k: value
      v: undefined, true, false
    */
    value: function(k, v) {
      if (v == undefined) {
        return false
      } else {
        var selection = this.get('parentView.selection'), content = this.get('content');
        if (selection && content) {
          if (v) {
            if (!selection.contains(content))
              this.get('parentView.selection').pushObject(content);
          } else {
            if (selection.contains(content))
              this.get('parentView.selection').removeObject(content);
          }
        }
        return v
      }
    }.property(),

    template: Ember.Handlebars.compile('{{checkbox text=view.content.name value=view.value isFocus=view.isFocus}}'),

    didInsertElement: function() {
      var self = this;
      /*
        TODO: 初始化已选中标签，目前使用延迟500毫秒处理
      */
      Ember.run.later(function(){
        var selection = self.get("parentView.selection"), content = self.get("content");
        if (selection && content) {
            self.set("value", selection.contains(content))
        }
      }, 500)
    }
  })

  Ember.Handlebars.helper('select-picker-multip-list-item', PickerMultipDropListItemView)
})

