define(["ember", "ember-data"], function(Ember, DS){
    var Term = DS.Model.extend({
        name: DS.attr('string'),
        type: DS.attr('string'),
        created: DS.attr('date'),
        updated: DS.attr('date'),
        creator: DS.attr('string'),
        updater: DS.attr('string'),
    })

    Term.reopenClass({
        // 初始化当前登录用户的标签
        createTags: function(store, tagsJson) {
            var tags = [];
            for(var i = 0; i < tagsJson.length; i++) {
                var tag = store.push('term', tagsJson[i])
                tags.pushObject(tag)
            }
            return tags
        },

        // 初始化当前登录用户的分类
        createCategories: function(store, categoriesJson) {
            var categories = [];
            for(var i = 0; i < categoriesJson.length; i++) {
                var category = store.push('term', categoriesJson[i])
                categories.pushObject(category)
            }
            return categories
        }
    })

    return Term
})

