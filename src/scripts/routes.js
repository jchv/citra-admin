var app = require('./app');

app.config(function($urlRouterProvider, $stateProvider) {
  $urlRouterProvider
    .otherwise('/');
  $stateProvider
    .state('dashboard', {
      url: '/',
      template: 'Dashboard'
    })
    .state('blog', {
      abstract: true,
      template: '<ui-view>'
    })
    .state('blog.posts', {
      url: '/blog/posts',
      template: 'Posts'
    })
    .state('media', {
      abstract: true,
      template: '<ui-view>'
    })
    .state('media.screenshots', {
      url: '/media/screenshots',
      template: 'Screenshots'
    })
    .state('media.videos', {
      url: '/media/videos',
      template: 'Videos'
    })
});
