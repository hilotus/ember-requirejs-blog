define(["ember", "app/helpers/alert", "app/helpers/utilities"], function(Ember, Alert, Utilities) {
  return Ember.Object.create({
    /*
      创建记录
      modelType: model类型, 如post
    */
    createRecord: function(store, modelType, data, onSuccess, onError) {
      var _this = this;
      var success = function(result) {
        var __result = _this.applyChangesetHash(result, store), newRecord;
        if (!!__result) {
          var newRecord = (__result.inserts[modelType] && __result.inserts[modelType][0]) || store.recordForId(modelType, data.id);
          if (typeof(onSuccess) == "function") onSuccess(newRecord);
        }
      }
      var error = function(result) {
        Alert.warn(Ember.I18n.t("ajax.error.operate"), Ember.I18n.t("ajax.error.request"))
        if (typeof(onError) == "function") onError()
      }
      var obj = {}
      data.id = Utilities.UUID();
      eval("obj.%@=data".fmt(modelType))
      return Utilities.ajax({
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
      var _this = this;
      var success = function(result) {
        var isSuccess = _this.applyChangesetHash(result, store);
        if (isSuccess) {
          if (typeof(onSuccess) == "function") onSuccess();
        } else {
          record.rollback();
        }
      }
      var error = function(result) {
        record.rollback()
        Alert.warn(Ember.I18n.t("ajax.error.operate"), Ember.I18n.t("ajax.error.request"))
        if (typeof(onError) == "function") onError()
      }
      var obj = {}
      eval("obj.%@=data".fmt(modelType))
      return Utilities.ajax({
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
      var _this = this;
      var success = function(result) {
        var isSuccess = _this.applyChangesetHash(result, store);
        if (isSuccess) {
          if (typeof(onSuccess) == "function") onSuccess()
        }
      }
      var error = function(result) {
        Alert.warn(Ember.I18n.t("ajax.error.operate"), Ember.I18n.t("ajax.error.request"))
        if (typeof(onError) == "function") onError()
      }
      return Utilities.ajax({
        url: "%@/%@".fmt(modelType, record.get("id")),
        type: "DELETE"
      }).then(success, error)
    },

    // ChangeSet相关的model
    modelMaps: {
      users: "user",
      posts: "post",
      comments: "comment",
      terms: "term"
    },

    loadRecords: function(store, recordKey, records, type) {
      var batch_count = 1000;
      if (records.length > batch_count) {
        var recordsSpliced = records;
        records = records.splice(0, 1000);
        var s = this;
        window.setTimeout(function() {
          Ember.run(function(){
            // 对于超出超度的部分，重新调用自己
            s.loadRecordHashes(store, recordKey, recordsSpliced, type)
          });
        }, 10)
      }

      var __result = {inserts: {}}, modelMaps = this.get("modelMaps");
      eval("__result.inserts.%@=[]".fmt(modelMaps[recordKey]));
      for (var i = 0; i < records.length; i++) {
        var r = records[i];

        if (type == "insert") {
          var newRecord = store.push(modelMaps[recordKey], r);
          __result.inserts[modelMaps[recordKey]].push(newRecord);

          Ember.debug("insert %@, id %@".fmt(modelMaps[recordKey], r.id));
        } else if (type == "update") {
          eval("var obj={};obj.%@=[r]".fmt(recordKey));
          // 这里的obj必须是对应的 modelType 的数据的数组，如 modelType = "post", obj = {posts: [post]}
          store.pushPayload(modelMaps[recordKey], obj);
          Ember.debug("update %@, id %@".fmt(modelMaps[recordKey], r.id));
        }
      };

      return __result;
    },

    loadData: function (result, isStartup, store, type) {
      var __result, modelMaps = this.get("modelMaps");
      for (key in modelMaps) {
        var records = result[key];

        // 加载 Records
        Ember.isArray(records) && (__result = this.loadRecords(store, key, records, type));
      }

      return __result;
    },

    /*
      处理增删改返回的记录
    */
    applyChangesetHash: function(result, store) {
      var changeset = result.changeSet;

      var inserts = changeset.inserts, 
        updates = changeset.updates, 
        deletes = changeset.deletes,
        errors = result.errors,
        modelMaps = this.get("modelMaps"), __result = false;

      if (Ember.isBlank(inserts) && Ember.isBlank(updates) && Ember.isBlank(deletes) && Ember.isBlank(error)) {
        Ember.debug("Skipping applyChangesetHash logic. Received empty changeset response.");
        return false;
      }

      if (errors) {
        var status = errors[0].errorCode, message = errors[0].errorMessage;
        SC.debug("The server could not provide us with a changeset: status=%@, message=“%@”.".fmt(status, message));
        Alert.warn(Ember.I18n.t("ajax.error.operate"), message)
        return false;
      }

      if (deletes) {
        for (key in modelMaps) {
          var records = deletes[key] || [];
          for (var i = 0; i < records.length; ++i) {
            var recordId = records[i].id || records[i]._id;
            var record = store.recordForId(modelMaps[key], recordId);
            store.unloadRecord(record);

            Ember.debug("delete %@, id %@".fmt(modelMaps[key], recordId));
          }
        }
        __result = true;
      }

      if (updates) {
        this.loadData(updates, false, store, "update");
        __result = true;
      }

      if (inserts) {
        __result = this.loadData(inserts, false, store, "insert");
      }

      Ember.run.begin(), Ember.run.end();
      return __result;
    }

  })
})

