'use strict';

var render = undefined;

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

    $scope.feed = undefined;

    $scope.getFeed = function() {
        var pageID = '147513818956534';

        var timeout = 5000,
            load_error;

        load_error = function (jqXHR, textStatus, errorThrown) {
            if (errorThrown === "timeout") {
                alert('Server bussy');
            } else {
                alert('error: 404', textStatus + ": " + errorThrown);
            }
        };

        $http({
            method: 'POST',
            url: 'proxy.php',
            data: {$graphUrl: 'https://graph.facebook.com/' + pageID + '/feed'},
            timeout:  timeout,
            error: load_error,
        }).then(function successCallback(response) {
            console.log(response.data);
            $scope.feed = response.data;
          }, function errorCallback(response) {

          });
    }

    $scope.getFeed();

    // $scope.rendered = false;

    // render = function() {
    //     var timer = $timeout(function() {
    //         FB.XFBML.parse();
    //         console.log('looped');
    //         render();
    //     }, 1000);

    //     FB.Event.subscribe('xfbml.render', function(response) {
    //         $timeout.cancel(timer);
    //         console.log('rendered.... finally!');
    //         $scope.rendered = true;
    //         $scope.$apply();
    //     });
    // }

    // $scope.$on('$locationChangeSuccess', function() {
    //     FB.XFBML.parse();
    // });

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