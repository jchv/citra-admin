module = require("./module");

module.directive("formError", function () {
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
