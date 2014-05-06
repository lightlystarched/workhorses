angular.module('workhorseApp').factory('gitRepo', [
    '$resource', '$log', function($resource, $log) {
        var Activity, gitRepo;
        Activity = $resource('https://api.github.com/:source/:owner/:repo/:data');

        // Retrieve the list of github repos
        gitRepo = {
            /*
             * Gets all of the repos available
             */
            getAll: function(success, failure) {
                var repos;

                // using the query method since we're expecting an array to be returned
                return Activity.query({
                    source: 'repositories'
                }, function (repos, getResponseHeaders) {
                    // success callback
                    if (angular.isFunction(success)) {
                        return success(repos);
                    } else {
                        /*
                         * Do something if there is no callback
                        */
                    }
                }, function(data, getResponseHeaders) {
                    // failure callback
                    if (angular.isFunction(failure)) {
                        return failure(data);
                    } else {
                        /*
                         * Do something if there is no callback
                        */
                    }
                });
            },
            /*
             * Gathers the contributors for a specific repo
             * gitRepo.contributors(repo.owner.login, repo.name, success, failture);
             */
            contributors: function (owner, repo, success, failure) {
                var repos;

                // using the query method since we're expecting an array to be returned
                return Activity.query({
                    source: 'repos',
                    owner: owner,
                    repo: repo,
                    data: 'contributors'
                }, function (repos, getResponseHeaders) {
                    // success callback
                    if (angular.isFunction(success)) {
                        return success(repos);
                    } else {
                        /*
                         * Do something if there is no callback
                        */
                    }
                }, function(data, getResponseHeaders) {
                    // failure callback
                    if (angular.isFunction(failure)) {
                        return failure(data);
                    } else {
                        /*
                         * Do something if there is no callback
                        */
                    }
                });
            }
        };

        return gitRepo;
    }

]);