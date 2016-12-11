;(function () {
  // Re-open and add dependencies to an already bootstrapped application
  app.requires.push('blueimp.fileupload');
  
  app.controller('DemoFileUploadController', [
            '$scope', '$http', '$filter', '$window',
            function ($scope, $http) {
                $scope.options = {
                    url: 'http://www.baidu.com'
                };
                // if (!isOnGitHub) {
                //     $scope.loadingFiles = true;
                //     $http.get(url)
                //         .then(
                //             function (response) {
                //                 $scope.loadingFiles = false;
                //                 $scope.queue = response.data.files || [];
                //             },
                //             function () {
                //                 $scope.loadingFiles = false;
                //             }
                //         );
                // }
            }
        ]);

console.log(app)
 

  
  
}());
