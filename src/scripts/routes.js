var app = require('./app');

app.config(function($urlRouterProvider, $stateProvider) {
  $urlRouterProvider
    .otherwise('/');
  $stateProvider
    .state('dashboard', {
      url: '/',
      views: {
        '': {
          template: 'Dashboard'
        },
        'title@': { template: 'Dashboard' }
      }
    })
    .state('blog', {
      abstract: true,
      template: '<ui-view>'
    })
    .state('blog.posts', {
      url: '/blog/posts',
      views: {
        '': {
          template: 'Posts'
        },
        'title@': { template: 'Blog &raquo; Posts' }
      }
    })
    .state('media', {
      abstract: true,
      template: '<ui-view>'
    })
    .state('media.screenshots', {
      url: '/media/screenshots',
      views: {
        '': {
          template: 'Screenshots'
        },
        'title@': { template: 'Media &raquo; Screenshots' }
      }
    })
    .state('media.videos', {
      url: '/media/videos',
      views: {
        '': {
          template: 'Videos'
        },
        'title@': { template: 'Media &raquo; Videos' }
      }
    })
});
