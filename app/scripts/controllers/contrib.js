'use strict';

angular.module('workhorseApp')
  .controller('ContribCtrl', [
    '$scope',
    '$log',
    '$location',
    '$routeParams',
    'contribList',
    function ($scope, $log, $location, $routeParams, contribList) {

		$scope.thisRepo = {
			owner: $routeParams.owner,
			repo: $routeParams.repo
		};
    
        // Keep the original list pristine in case we need to reset the scope
        $scope.contributors = angular.copy(contribList);

        // setup some interactions for the user
}]);