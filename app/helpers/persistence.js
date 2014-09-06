define(["ember", "app/helpers/alert", "app/helpers/utilities"], function(Ember, Alert, Utilities) {
    return Ember.Object.create({
        /*
            创建记录
            modelType: model类型, 如post
        */
        createRecord: function(store, modelType, data, onSuccess, onError) {
            var success = function(result) {
                if (result.errors) {
                    Alert.warn(Ember.I18n.t("ajax.error.operate"), result.errors[0].errorMessage)
                } else {
                    eval("var obj=result.%@".fmt(modelType))
                    var newRecord = store.push(modelType, obj);
                    if (typeof(onSuccess) == "function") onSuccess(newRecord)
                }
            }
            var error = function(result) {
                Alert.warn(Ember.I18n.t("ajax.error.operate"), Ember.I18n.t("ajax.error.request"))
                if (typeof(onError) == "function") onError()
            }
            var obj = {}
            data.id = Utilities.UUID();
            eval("obj.%@=data".fmt(modelType))
            Utilities.ajax({
                url: "%@".fmt(modelType),
                type: "POST",
                data: obj
            }).then(success, error)
        },

        /*
            修改记录
            modelType: model类型, 如post
        */
        updateRecord: function(store, modelType, record, data, onSuccess, onError) {
            var success = function(result) {
                if (result.errors) {
                    record.rollback()
                    Alert.warn(Ember.I18n.t("ajax.error.operate"), result.errors[0].errorMessage)
                } else {
                    var obj = {}
                    eval("obj.%@s=[result.%@]".fmt(modelType, modelType))
                    // 这里的obj必须是对应的 modelType 的数据的数组，如 modelType = "post", obj = {posts: [post]}
                    store.pushPayload(modelType, obj)
                    if (typeof(onSuccess) == "function") onSuccess()
                }
            }
            var error = function(result) {
                record.rollback()
                Alert.warn(Ember.I18n.t("ajax.error.operate"), Ember.I18n.t("ajax.error.request"))
                if (typeof(onError) == "function") onError()
            }
            var obj = {}
            eval("obj.%@=data".fmt(modelType))
            Utilities.ajax({
                url: "%@/%@".fmt(modelType, record.get("id")),
                type: "PUT",
                data: obj
            }).then(success, error)
        },

        /*
            删除记录
            modelType: model类型, 如post
        */
        deleteRecord: function(store, modelType, record, onSuccess, onError) {
            var success = function(result) {
                if (result.errors) {
                    Alert.warn(Ember.I18n.t("ajax.error.operate"), result.errors[0].errorMessage)
                } else {
                    // 手动将record从store中删除
                    store.unloadRecord(record);
                    if (typeof(onSuccess) == "function") onSuccess()
                }
            }
            var error = function(result) {
                Alert.warn(Ember.I18n.t("ajax.error.operate"), Ember.I18n.t("ajax.error.request"))
                if (typeof(onError) == "function") onError()
            }
            Utilities.ajax({
                url: "%@/%@".fmt(modelType, record.get("id")),
                type: "DELETE"
            }).then(success, error)
        }
    })
})

