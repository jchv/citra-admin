app = require('../app');
CodeMirror = require('codemirror/lib/codemirror.js');

require('codemirror/lib/codemirror.css');
require('codemirror/mode/gfm/gfm');

app.controller("BlogPostCreateController", function($scope, $http) {
  $scope.save = function() {
    var post = {
      "tags": [],
      "title": $scope.title,
      "content": $scope.editor.getValue()
    };
    $http.post(window.apiRoot + '/blog/posts/', post);
  }
});

app.directive("markdownControl", function() {
  return {
    restrict: 'E',
    scope: {
      editor: "=editorObject"
    },
    link: function(scope, element, attrs) {
      scope.editor = CodeMirror(element[0], { mode: 'gfm' });
      scope.editor.setSize("800", "400");
    }
  }
});
