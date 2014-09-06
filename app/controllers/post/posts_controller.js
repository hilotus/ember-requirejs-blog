define(["ember", "app/helpers/alert", "app/helpers/persistence"], function(Ember, Alert, Persistence){
    return Ember.ArrayController.extend({
        // model的值为查询结果，则可以使用该为model排序。
        // 目前在后台查询时，按照创建时间倒序排列
        // sortProperties: ['created'],
        // sortAscending: false,

        model: [],

        // 每页记录数
        per_page: 10,
        // 当前加载到第几页
        page: 1,
        // 总页数
        pages: 0,
        hasDisplayAll: false,
        keywords: "",

        isSearch: function() {
            return !!this.get("keywords")
        }.property("keywords"),

        filteredPosts: function() {
            var keywords = this.get('keywords').toLocaleLowerCase();
            var posts = this.get('model');

            // reverseSortBy 在ember.js 的14347行

            if (keywords) {
                return posts.filter(function(post){
                    var title = post.get('title'), cName = post.get('category.name'), 
                        crName = post.get('creator.name');
                    if (title && title.toLocaleLowerCase().indexOf(keywords) > -1) return true;
                    else if (cName && cName.toLocaleLowerCase().indexOf(keywords) > -1) return true;
                    else if (crName && crName.toLocaleLowerCase().indexOf(keywords) > -1) return true;
                    return false;
                }).reverseSortBy("created")
            } else {
                return posts.reverseSortBy("created")
            }
        }.property('keywords'),

        paginate: function() {
            // 搜索画面中，不允许翻页
            if (this.get("isSearch")) return;

            var page = this.get('page'), pages = this.get('pages'), 
                per_page = this.get('per_page'), _this = this;

            // 最后一页
            if (pages == page) {
                if (!this.get('hasDisplayAll')) {
                    Alert.loading(Ember.I18n.t("posts.loadedall"));
                    var runLater = Ember.run.later(this, function() {
                        Alert.removeLoading();
                        Ember.run.cancel(runLater);
                    }, 1000);
                    this.set('hasDisplayAll', true)
                }
                return;
            }

            // 加载中
            Alert.loading(Ember.I18n.t("posts.loading"));

            this.store.find('post', {per_page: per_page, page: page + 1}).then(function(posts){
                var length = posts.get('length');
                if (length > 0) {
                    _this.set('page', page + 1)
                    // 不能直接push, posts
                    // posts-->DS.AdapterPopulatedRecordArray
                    // posts.get('content')-->Array
                    _this.get('model').pushObjects(posts.get('content'))

                    // 加载完成
                    Alert.removeLoading();
                }

                if (pages == 0) {
                    _this.set('pages', page);
                    Alert.removeLoading();
                }
            }, function(){
                // 加载完成
                Alert.removeLoading();
            })
        },

        actions: {
            edit: function(post) {
                PreloadStore.store('selectedPost', post);
                this.transitionToRoute("posts.edit", post)
            },
            delete: function(post) {
                var controller = this;

                Alert.warn(Ember.I18n.t("posts.destroy.prompt"), Ember.I18n.t("posts.destroy.body"), 
                    [Ember.I18n.t("button.cancel"), Ember.I18n.t("button.ok")], function(i){
                    if (i == 2) { // ok
                        var onSuccess = function() {
                            controller.get('model').removeObject(post)
                        }
                        Persistence.deleteRecord(controller.store, 'post', post, onSuccess)
                    }
                })
            }
        }
    })
})

