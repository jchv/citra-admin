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
          templateUrl: 'partial/blog/post_list.html',
          controller: 'BlogPostListController'
        },
        'title@': { template: 'Blog &raquo; Posts' }
      }
    })
    .state('blog.create_post', {
      url: '/blog/create_post',
      views: {
        '': {
          templateUrl: 'partial/blog/post_detail.html',
          controller: 'BlogPostCreateController'
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
