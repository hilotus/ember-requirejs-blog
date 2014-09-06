define(["ember"], function(Ember){
  // 单选
  var PickerSingleDropListItemView = Ember.View.extend({
    tagName: 'li',
    classNameBindings: [':result', ':not-multiple', 'isMouseEnter:highlighted', 'isSelected:selected'],
    isMouseEnter: false,

    // 集合中每个item对象
    content: null,

    mouseEnter: function(event) {
      this.set('isMouseEnter', true)
      return true
    },

    mouseLeave: function(event) {
      this.set('isMouseEnter', false)
      return true
    },

    // 单选时，是否选中
    isSelected: function() {
      return this.get('content') && this.get('content.id') == this.get('parentView.selection.id');
    }.property('parentView.selection.id'),

    click: function(event) {
      var content = this.get('content');
      this.set('parentView.isActive', false)
      this.set('parentView.selection', this.get('isSelected') ? null : content)
      return true
    },

    // <div class="count">× 12</div>, badge
    template: Ember.Handlebars.compile('<div class="badge">{{view.content.name}}</div>')
  })

  Ember.Handlebars.helper('select-picker-single-list-item', PickerSingleDropListItemView)
})

