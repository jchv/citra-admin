var angular = require('angular');

var app = angular.module('citraAdminAuth', [
  require('../components')
]);

app.config(function ($httpProvider) {
  $httpProvider.defaults.withCredentials = true;
  $httpProvider.defaults.xsrfCookieName = 'csrftoken';
  $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
});

app.controller("LoginFormController", function ($scope, $http) {
  $http.get(window.apiRoot + '/account/me/', {timeout: 30000})
    .success(function (data, status, headers, config) {
      window.location.href = "/";
    })
    .error(function () {
      $scope.showLogin = true;
    });
  $scope.login = function () {
    $http.post(window.apiRoot + '/account/login/', {
      username: $scope.username,
      password: $scope.password
    }).success(function (data, status, headers, config) {
      $scope.errors = {};
      window.location.href = "/";
    }).error(function (data, status, headers, config) {
      $scope.errors = data;
    });
  }
});
