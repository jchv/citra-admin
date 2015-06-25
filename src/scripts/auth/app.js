var angular = require('angular');

var app = angular.module('citraAdminAuth', []);

app.config(function($httpProvider) {
    $httpProvider.defaults.withCredentials = true;
});

app.controller("LoginFormController", function($scope, $http) {
    $http.get(window.apiRoot + '/account/me/', {timeout: 30000})
        .success(function(data, status, headers, config) {
            window.location.href = "/";
        })
        .error(function() {
            $scope.showLogin = true;
        });
    $scope.login = function() {
        $http.post(window.apiRoot + '/account/login/', {
            username: $scope.username,
            password: $scope.password
        }).success(function(data, status, headers, config) {
            $scope.errors = {};
            window.location.href = "/";
        }).error(function(data, status, headers, config) {
            $scope.errors = data;
        });
    }
});

app.directive("formError", function() {
    return {
        restrict: 'E',
        scope: {
            errors: '=field'
        },
        template:
            '<div class="form-errors" ng-show="errors">' +
            '  <ul>' +
            '    <li ng-repeat="error in errors">{{ error }}</li>' +
            '  </ul>' +
            '</div>'
    }
});
