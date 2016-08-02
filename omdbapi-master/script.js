/**
 * Created by yashbhalani on 7/21/16.
 */
(function(angular) {
    'use strict';
    angular.module('OMDbAPISearch', [])
        .controller('searchMovies', ['$scope', '$http',
            function($scope, $http) {
                $scope.method = 'GET';
                $scope.fetch = function() {
                    if ($scope.searchparam) {
                        $scope.url = 'https://www.omdbapi.com/?s=' + $scope.searchparam + '&type=movie&r=json';
                        $http({
                            method: $scope.method,
                            url: $scope.url
                        }).
                        then(function(response) {
                            if (response.data.Response) {
                                $('.results').css('display', 'block');
                                $('.noResults').css('display', 'none');
                                var theSrchResults = response.data["Search"];
                                angular.forEach(theSrchResults, function(obj) {
                                    $http({
                                        method: $scope.method,
                                        url: 'https://www.omdbapi.com/?i=' + obj.imdbID + '&plot=full&r=json&tomatoes=true'
                                    }).
                                    then(function(response) {
                                        obj.details = response.data;
                                    });
                                });
                                $scope.movieResults = theSrchResults;
                            } else {
                                console.log("not found");
                                $('.results').css('display', 'none');
                                $('.noResults').css('display', 'block');
                                $('.noResults').html("<strong>No results found.</strong>");
                            }
                        }, function(response) {
                            console.log("failure");
                            $('.results').css('display', 'none');
                            $('.noResults').css('display', 'block');
                            $('.noResults').html("<strong>Network or data error, please try again.</strong>");
                        });
                    } else {
                        $('.results').css('display', 'none');
                        $('.noResults').css('display', 'none');
                        $('#theSearch').fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
                    }
                };
            }
        ])
        .directive('movieSrchResults', function() {
            return {
                templateUrl: 'movieResults.html'
            };
        });
})(window.angular);