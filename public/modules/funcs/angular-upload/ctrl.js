;(function () {
  'use strict';

  var url = '/upload';
  // include [blueimp.fileupload] jquery must be included before angular.js
  angular.module('demo', ['alias', 'blueimp.fileupload'])
    .config([
      '$httpProvider', 'fileUploadProvider',
      function ($httpProvider, fileUploadProvider) {
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
        fileUploadProvider.defaults.redirect = window.location.href.replace(
          /\/[^\/]*$/,
          '/cors/result.html?%s'
        );
      }
    ])
    .controller('DemoFileUploadController', [
      '$scope', '$http', '$filter', '$window',
      function ($scope, $http) {
        $scope.options = {
          url: url,
          maxFileSize: 5000000,
          type: "POST",
          acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i
        };

        $scope.loadingFiles = true;
        $http.get(url)
          .then(
            function (res) {
              $scope.loadingFiles = false;
              $scope.queue = res.data.files || [];
            },
            function () {
              $scope.loadingFiles = false;
            }
          );
      }
    ])
    .controller('FileDestroyController', [
      '$scope', '$http',
      function ($scope, $http) {
      var file = $scope.file,
          state;

      if (file.url) {
        file.$state = function () {
          return state;
        };
        file.$destroy = function () {
          state = 'pending';
          return $http({
            url: file.deleteUrl,
            method: file.deleteType
          }).then(
            function () {
             state = 'resolved';
             $scope.clear(file);
            },
            function () {
              state = 'rejected';
            }
          );
        };
      } else if (!file.$cancel && !file._index) {
        file.$cancel = function () {
          $scope.clear(file);
        };
      }
    }
  ]);
}());
