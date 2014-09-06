define(["ember"], function(Ember){
  return Ember.Controller.extend({
    // Navigatable的总页数
    level: 1,
    // 页面滑动时间(秒)
    wait: 0.4,

    isMove: false,
    push: function(navigatableViewClass) {
      if (this.get("isMove")) return;
      this.set("isMove", true);

      var user = this.get("currentUser"), store = this.get("store");
      this.get("contentView").pushObject(navigatableViewClass.create({
        currentUser: user,
        store: store,
      }))
      this.move(1)
      var wait = this.get("wait")
      var runLater = Ember.run.later(this, function(){
        this.set("isMove", false);
        Ember.run.cancel(runLater)
      }, wait * 1000)
    },

    pop: function() {
      if (this.get("isMove")) return;
      this.set("isMove", true);

      this.move(0)
      var wait = this.get("wait")
      var runLater = Ember.run.later(this, function(){
        this.get("contentView").popObject()
        this.set("isMove", false);
        Ember.run.cancel(runLater)
      }, wait * 1000)
    },

    // v: 0 back, 1 previous
    move: function(v) {
      var view = this.get("contentView").$().parents(".navigatable-channel").last(), 
        currentLevel = this.get("contentView.childViews.length"), 
        width = view.width() / this.get("level");
      view.animate(
        {marginLeft: (-width * (currentLevel - (v == 0 ? 2 : 1))) + "px"}, 
        {speed: this.get("wait") * 1000}
      );
      // view.css({"margin-left": "%@px".fmt(-width * (currentLevel - (v == 1 ? 1 : 2)))})
    }
  })
})

