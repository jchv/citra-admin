var angular = require('angular');
require('angular-ui-router');

var app = angular.module('citraAdmin', [
  'ui.router'
]);

app.config(function($httpProvider) {
    $httpProvider.defaults.withCredentials = true;
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
