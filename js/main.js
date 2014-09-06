require(["config"], function(config){
  requirejs.config(config);

  require(["App", "jquery", "ember", "jquery.nicescroll"], function(App, $, Ember){
    $("html").niceScroll({cursorwidth: "6px"});
    var $notif = $('body .notif')
    $('body .notif .notif-close').on('click', function(){
      var $notif = $(this).parents('.notif');
      $notif.css({top: "-10px", visibility: "hidden", opacity: 0})
    })

    var app_name = config.app_name || "App";
    $.extend({LOG_TRANSITIONS: true}, App)

    require(["app/helpers/utilities", "app/helpers/alert", "app/locale/zh-cn", "app/locale/en-us"], function(Utilities, Alert, zh_CN, en_US) {
      var Application = Ember.Application.create(App)

      Ember.Application.initializer({
        name: 'authentication',
        after: 'store',

        initialize: function(container, application) {
          // don't boot until the user promise resolves.
          Application.deferReadiness();
          // 默认为中文
          Ember.I18n.translations = zh_CN;

          var success = function(result) {
            if (result.errors) {
              Alert.error(Ember.I18n.t("ajax.error.validate"), result.errors[0].errorMessage)
            } else {
              // cookies中存在用户
              if (result.user && result.user.length > 0) {
                var store = container.lookup('store:main')
                var user = store.push('user', result.user[0])

                if (user.get("locale") == "zh-cn") {
                  Ember.I18n.translations = zh_CN;
                } else {
                  Ember.I18n.translations = en_US;
                }

                // 定义currentUser
                application.register('user:current', user, { instantiate: false, singleton: true });
                // route中注入currentUser变量
                application.inject('route', 'currentUser', 'user:current')
                // controller中注入currentUser变量
                application.inject('controller', 'currentUser', 'user:current')

                // 标签和分类
                var tags = Application.Term.createTags(store, result.tags)
                var categories = Application.Term.createCategories(store, result.categories)
                application.register('term:tag', tags, { instantiate: false, singleton: true });
                application.register('term:category', categories, { instantiate: false, singleton: true });

                application.inject('controller:postsNew', 'tags', 'term:tag')
                application.inject('controller:postsNew', 'categories', 'term:category')

                // push connection
                var notificationController = container.lookup("controller:notification")
                notificationController.setProperties({
                  "currentUser": user,
                  "store": store,
                  "lastSyncTime": result.lastSyncTime
                })
                notificationController.parkConnection();
              }

              $('.app-loader').css({"display": "none"})

              Application.advanceReadiness();

              // 向上滚动按钮
              $('body').append('<div class="to-up"><i class="fa fa-angle-double-up"></i></div>');
              $('.to-up').click(function() {
                $('html,body').animate({ scrollTop: 0 }, 300);
              })
            }
          }
          var error = function(result) {
            Alert.error(Ember.I18n.t("ajax.error.validate"), Ember.I18n.t("ajax.error.request"))
          }

          Utilities.ajax({
            url: "account/validate",
            type: "POST"
          }).then(success, error)
        } /*end initialize*/
      }) /*end initializer application*/
    }) /*end create application*/
  }) /*end load jquery ember*/
});

