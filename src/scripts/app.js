var angular = require('angular');

var app = angular.module('citraAdmin', [
  require('angular-ui-router'),
  require('angular-cookies'),
  require('angular-resource'),
  require('./components')
]);

app.config(function($httpProvider, $resourceProvider) {
  $httpProvider.defaults.withCredentials = true;
  $httpProvider.defaults.xsrfCookieName = 'csrftoken';
  $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
  $httpProvider.interceptors.push(function($cookies) {
    return {
      'request': function(config) {
        config.headers['X-CSRFToken'] = $cookies.get('csrftoken');
        return config;
      }
    };
  });
  $resourceProvider.defaults.stripTrailingSlashes = false;
});

app.run(function($rootScope, $http) {
  $http.get(window.apiRoot + '/account/me/', {timeout: 30000})
    .success(function(data, status, headers, config) {
      $rootScope.user = data;
    })
    .error(function() {
      window.location.href = "/login.html";
    });
});

module.exports = app;
