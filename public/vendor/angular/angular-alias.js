;(function () {
  angular.module('alias', []).config([
    '$interpolateProvider', 
    function ($interpolateProvider) {
      $interpolateProvider.startSymbol('$');
      $interpolateProvider.endSymbol('$');
    }
  ]);
}());