'use strict';

angular.module('workhorseApp')
  .controller('ContribCtrl', [
    '$scope',
    '$log',
    '$location',
    'contribList',
    function ($scope, $log, $location, contribList) {
    
        // Keep the original list pristine in case we need to reset the scope
        $scope.contributors = angular.copy(contribList);

        // setup some interactions for the user
}]);