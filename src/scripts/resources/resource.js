var app = require("../app");

var getParamDefaults = function () {
  return {
    id: '@id'
  };
};

var getActions = function () {
  return {
    'create': {method: 'POST'},
    'update': {method: 'PUT'},
    'all': {method: 'GET', isArray: true}
  };
};

var createResource = function ($resource, url) {
  var resource = $resource(url, getParamDefaults(), getActions());
  resource.prototype.$save = function () {
    if (this.id) {
      return this.$update();
    } else {
      return this.$create();
    }
  };
  return resource;
};

app.factory('resource', function ($resource) {
  var resource = {};
  resource.create = function (url) {
    return createResource($resource, url)
  };
  return resource;
});
