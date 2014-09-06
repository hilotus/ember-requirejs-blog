define(["ember", "ember-data", "app/helpers/utilities", "app/helpers/alert", "md5", "i18n"], function(Ember, DS, Utilities, Alert, md5) {
    var User = DS.Model.extend({
        name: DS.attr('string'),
        email: DS.attr('string'),
        locale: DS.attr('string'),
        status: DS.attr('number'),
        external_login: DS.attr('string'),
        creator: DS.attr('string'),
        created: DS.attr('date'),
        updater: DS.attr('string'),
        updated: DS.attr('date'),

        /*
            Gravatar头像管理
            官方文档：http://en.gravatar.com/site/implement/
            s=25, (返回头像的宽高)
            d=identicon，返回一个基于email_md5的生成的默认头像
            r=pg, (上传头像时，会让您选择一个限制级别，越向右限制级别越高: g -> pg -> r -> x)
        */
        gravatar: "http://www.gravatar.com/avatar/%@?s=%@&r=pg&d=identicon",

        // Post右边的作者头像
        avatarPhoto: function() {
            var email_md5 = md5(this.get("email"));
            return this.get("gravatar").fmt(email_md5, 48);
        }.property('email'),

        externalLoginExplain: function() {
            if (this.get("external_login")) return Ember.I18n.t("current.user.externalloginexplain").fmt(this.get("external_login"))
            else return ""
        }.property('external_login')
    })

    User.reopenClass({
        logout: function() {
            var userClass = this;
            // 这里return，在调用的地方便可以使用.then方法
            return Utilities.ajax({
                url: "account/logout",
                type: "POST",
            }).then(function(result){
                if (result.errors) {
                    Alert.warn(Ember.I18n.t("ajax.error.logout"), result.errors[0].errorMessage)
                } else {
                    window.location.reload()
                }
            }, function(result){
                Alert.warn(Ember.I18n.t("ajax.error.logout"), Ember.I18n.t("ajax.error.request"))
            })
        },

        // 注册时，检查邮箱是否重名
        checkEmail: function(email) {
            return Utilities.ajax({
                url: "account/check_email?email=%@".fmt(email),
                type: "GET"
            })
        },

        // 创建账户
        createAccount: function(name, email, password) {
            return Utilities.ajax({
                url: "account/register",
                data: {name: name, email: email, password: password},
                type: "POST",
            })
        },

        // 修改密码
        changePassword: function(userId, oldPassword, newPassword) {
            return Utilities.ajax({
                url: "user/changepassword/%@".fmt(userId),
                data: {oldPassword: oldPassword, newPassword: newPassword, updater: userId},
                type: "PUT",
            })
        }
    })

    return User
})

