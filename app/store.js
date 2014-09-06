define(["ember", "ember-data", "app/helpers/utilities"], function(Ember, DS, Utilities){
  return DS.Store.extend({
    adapter: DS.RESTAdapter.extend({
      // 这两个参数决定了Model操作时请求的url
      // 如: this.store.find("post"), 请求链接为: http://fb.luoguanzhong.name/blog/posts
      namespace: 'blog',
      host: Utilities.get("baseServerUrl"),
    })
  })
})

