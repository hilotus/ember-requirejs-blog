define({
    app_name: "Blog",
    // Extra query string arguments appended to URLs that RequireJS uses to fetch resources.
    urlArgs: "v=" +  (new Date()).getTime(),
    // The default is 7 seconds.
    waitSeconds: 60,

    baseUrl: "js/lib",

    paths: {
        "app": "../../app",
        "App": "../../app/core",

        "jquery": "jquery-1.10.2.min",
        "jquery.nicescroll": "jquery.nicescroll-3.5.4.min",

        "showdown": "showdown",
        "md5": "md5.min",
        "moment": "moment-with-langs.min",
        "preload-store": "preload_store",

        // "handlebars": "handlebars-1.0.0",
        "handlebars": "handlebars-v1.3.0",
        // "ember": "ember-1.3.0",
        "ember": "ember-1.5.1",
        // "ember-data": "ember-data-1.0.0-beta.5",
        "ember-data": "ember-data-1.0.0-beta.8",

        "i18n": "i18n/i18n",
        "cldr": "i18n/cldr",

        "sceditor": "sceditor/minified/jquery.sceditor.min",

        "text": "../requirejs/text"
    },

    shim: {
        "jquery.nicescroll": ["jquery"],

        "ember": {
            deps: ["jquery", "handlebars"],
            exports: "Ember"
        },

        "ember-data": {
            deps: ["jquery", "ember"],
            exports: "DS"
        },

        "i18n": {
            deps: ["ember", "cldr"],
            exports: "I18n"
        },
    }
})

