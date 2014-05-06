'use strict';

angular.module('workhorseApp')
  .controller('MainCtrl', [
    '$scope',
    '$log',
    '$location',
    'repoList',
    'gitRepo',
    function ($scope, $log, $location, repoList, gitRepo) {
    
        // Keep the original list pristine in case we need to reset the scope
        $scope.repos = angular.copy(repoList);

        // Set the data view for this repo
        $scope.toggle = {
            sortByCommits: function () {
                var repos = angular.copy(repoList);

                // This could get ugly.  This would be better to setup a service on the server to handle this
                angular.forEach(repos, function (repo) {
                    var commits = 0;
                    gitRepo.contributors(repo.owner.login, repo.name, function (contributors) {
                        angular.forEach(contributors, function (contributor) {
                            commits += Number(contributor.contributions);
                        });
                    });

                    repo.commitCount = commits;
                });
            }
        };
}]);