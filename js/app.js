'use strict';

angular.module('WildAnnie', ['ui.router', 'ui.bootstrap', 'angulartics', 'angulartics.piwik'])

.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'partials/home.html',
            controller: 'HomeCtrl'
        })
        .state('menu', {
            url: '/menu',
            templateUrl: 'partials/menu.html',
            controller: 'MenuCtrl'
        })
        .state('map', {
            url: '/map',
            templateUrl: 'partials/map.html',
            controller: 'MapCtrl'
        })
        .state('about', {
            url: '/about',
            templateUrl: 'partials/about.html',
            controller: 'AboutCtrl'
        });

    // $locationProvider.html5Mode(true);

    $urlRouterProvider.otherwise('/#');
}])

// parent controller that houses all the ui-views
// put all global functions and variables here to access them from
// the other ui-views
.controller('WildAnnieCtrl', ['$scope', function($scope) {



}])

.controller('HomeCtrl', ['$scope', '$timeout', '$http', function($scope, $timeout, $http) {

    $scope.feed = [];

    $scope.getFeed = function() {
     
        var pageid = '147513818956534';
        var authToken = 'access_token=CAAJMocfJwj8BAIZCdERPi0vAD23BZCv8soKBZASh9BAZAUijTFsgdj0oOedaE9rPwjARhAaAaj03ZAIQwCEXffMjQCs0LxgQCvmXZA0p8Pa1o9wjZBLgj3TevIZCKzZCIgnITPSjo4s4hdnjk2tiQaTe95zxLJ8Yezg9i8ZCedNsR9aVuDmMGaroyZA';
        var fields = [
            'name',
            'description',
            'cover'
        ];
        var edges = [
            'picture',
            'posts'
        ];
        var graph = 'https://graph.facebook.com/' + pageid;

        // $http.get('fb-php/page-feed.php')
        for (var i = 0; i < fields.length; i++) {
            $http.get(graph + '?fields=' + fields[i] + '&' + authToken)
            .then(function successCallback(response) {
                console.log(response.data);
                $scope.feed[fields[i]] = response.data[fields[i]];
            }, function errorCallback(response) {
                console.log(response);
            });
        }

        $http.get(graph + '/' + edges[0] + '?' + authToken)
        .then(function successCallback(response) {
            console.log(response);
            $scope.feed[edges[0]] = response[edges[0]];
        }, function errorCallback(response) {
            console.log(response);
        });

        $http.get(graph + '/' + edges[1] + '?' + authToken)
        .then(function successCallback(response) {
            console.log(response.data);
            $scope.feed[edges[1]] = response.data[edges[1]];
        }, function errorCallback(response) {
            console.log(response);
        });
    }

    $scope.getFeed();

}])

.controller('MenuCtrl', ['$scope', function($scope) {



}])

.controller('MapCtrl', ['$scope', function($scope) {

 

}])

.controller('AboutCtrl', ['$scope', function($scope) {



}])

.directive('resize', function ($window) {
    return function (scope, element) {
        var w = angular.element($window);
        scope.getWindowDimensions = function () {
            return {
                'h': w.height(),
                'w': w.width()
            };
        };
        scope.$watch(scope.getWindowDimensions, function (newValue, oldValue) {
            scope.windowHeight = newValue.h;
            scope.windowWidth = newValue.w;

            scope.style = function () {
                return {
                    'height': (newValue.h - 100) + 'px',
                        'width': (newValue.w - 100) + 'px'
                };
            };

        }, true);

        w.bind('resize', function () {
            scope.$apply();
        });
    }
});