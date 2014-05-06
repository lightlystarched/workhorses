'use strict';

angular
  .module('workhorseApp', [
    'ngResource',
    'ngSanitize',
    'ngRoute'
  ])
  .config([
    '$httpProvider',
    '$routeProvider',
    '$logProvider',
    '$locationProvider',
    function ($httpProvider, $routeProvider,$logProvider, $locationProvider) {
    var resolves;

    /*
     * Set the debugger to true for local environment, false for production
     */
    if (location.host === 'http://127.0.0.1:9000/')  {
      $logProvider.debugEnabled(true);
    } else {
      $logProvider.debugEnabled(false);
    }

// For readability I tend to pull out the resolve functions into their own object
    resolves = {
      repoContrib: ['$log', '$q', '$route', 'gitRepo', function($log, $q, $route, gitRepo) {
          var deferred = $q.defer(),
            owner = $route.current.params.owner,
            repoName = $route.current.params.repo;

         gitRepo.contributors(owner, repoName, function(repos) {
              deferred.resolve(repos);
          }, function (error) {
            // just logging for now due to time constraints
              console.log(error);
          });

          return deferred.promise;
      }],
      repoList: ['$log', '$q', 'gitRepo', function($log, $q, gitRepo) {
          var deferred = $q.defer();

         gitRepo.getAll(function(repos) {
              $log.debug('app.js resolves.repoList: ', repos);
              deferred.resolve(repos);
          }, function (error) {
            // just logging for now due to time constraints
              console.log(error);
          });

          return deferred.promise;
      }]
    };

// Create the various routes here
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        resolve: {
          repoList: resolves.repoList
        }
      })
      .when('/:owner/:repo', {
        templateUrl: '/views/contributors.html',
        controller: 'ContribCtrl',
        resolve: {
          contribList: resolves.repoContrib
        }
      })
      .otherwise({
        redirectTo: '/'
      });
}]);
