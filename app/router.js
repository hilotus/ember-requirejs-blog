define(["ember"], function(Ember) {
  var Router = Ember.Router.extend();
  Router.map(function() {
    this.resource('posts', { path: '/posts' }, function(){
      this.route('new'),
      this.route('edit', { path: '/edit/:post_id' })
    })
    this.resource('post', { path: '/post/:post_id' })
    this.resource('admin', { path: '/admin' })
    this.resource('resetpassword', { path: '/resetpassword' })

    this.resource('errors', { path: '/errors' }, function(){
      this.route('unfound', { path: '/unfound' })
    })

    this.resource('chat')
  })
  return Router;
})

