define(["ember", "text!app/templates/common/select-picker.hbs", "app/extensions/array",
  "app/views/common/picker_single_list_item", "app/views/common/picker_multip_list_item"], function(Ember, SelectPickerHbs){
  var SelectPickerView = Ember.View.extend({
    template: Ember.Handlebars.compile(SelectPickerHbs),
    classNameBindings: [":picker", ":pure-u-1", "isActive:picker-active"],
    isActive: false,
    // 标题
    prompt: "",
    // 待选择的项
    content: null,
    isMultiple: false,

    keywords: "",
    searchContent: null,
    selection: [],

    title: function() {
      if (this.get('isMultiple')) {
        var selection = this.get('selection');
        if (!selection || selection.get('length') == 0) {
            return this.get('prompt')
        } else if (selection instanceof DS.PromiseArray) {
            return selection.get('content').toArray().joinObj(",", "name")
        } else {  // Array
            return selection.joinObj(",", "name")
        }
      } else {
        var name = this.get('selection.name')
        return name ?  name : this.get('prompt')
      }
    }.property('selection.length', 'selection.id'),

    isActiveChanged: function() {
      var isActive = this.get('isActive'), drop = this.$('div.picker-drop');
      if (!isActive) {
        drop.css({top: "20px", visibility: "hidden", opacity: 0})
      } else {
        drop.css({top: "30px", visibility: "visible", opacity: 1})
      }
    }.observes('isActive'),

    keywordsChanged: function() {
      var coll = this.get('content'), keywords = this.get('keywords');
      if (keywords) {
        this.set('searchContent', coll.filter(function(item){if (item.get('name').indexOf(keywords) > -1) return true;}));
      } else {
        this.set('searchContent', coll);
      }
    }.observes('keywords'),

    init: function() {
      this._super();
      this.set('searchContent', this.get('content'));
    },

    didInsertElement: function() {
      Ember.run.schedule('afterRender', this, function() {
        var self = this, $elem = this.$();
        this.$("a.picker-single").click(function(){
          var isActive = self.get("isActive")
          self.set("isActive", !isActive)
        })
        this.$("ul").niceScroll();

        // 点击其他地方，关闭picker
        var callback = function(evt) {
          var parent = $(evt.target).parents('div.picker');
          // 判断点击的是否为picker控件内部元素
          if (parent.attr('id') != $elem.attr('id')) {
            // 隐藏picker
            if (self.get('isActive')) self.set('isActive', false);
          }
          return true;
        }
        $(document).bind({'click': callback}, {'touchstart': callback});
      })
    }
  })

  Ember.Handlebars.helper('select-picker', SelectPickerView)
})

