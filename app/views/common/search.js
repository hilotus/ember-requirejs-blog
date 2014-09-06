define(["ember"], function(Ember){
    var SearchView = Ember.View.extend({
        classNames: ['search'],
        keywords: "",

        keyDown: function(evt) {
            var keywords = this.get('keywords');
            if (evt.keyCode == 13) {
                this.set('controller.keywords', keywords);
            }
        },

        keyUp: function(evt) {
            // 当keywords为空时，自动搜索出全部
            if (evt.keyCode == 8 || evt.keyCode == 46) {  // 退格键，Delete键
                var keywords = this.get('keywords');
                if (!keywords) {
                    this.set('controller.keywords', keywords);
                }
            }
        },

        template: Ember.Handlebars.compile('{{input type="text" value=view.keywords placeholderTranslation="posts.search"}}<div class="search-icon"></div>'),
    })

    Ember.Handlebars.helper('search', SearchView)
})

