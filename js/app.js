'use strict';

angular.module('WildAnnie', ['ui.router', 'ui.bootstrap'])

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

.controller('HomeCtrl', ['$scope', '$timeout', function($scope, $timeout) {

    // $scope.getFeed = function() {
    //     console.log('called');
    //     /* make the API call */
    //     FB.api(
    //         "/147513818956534/feed?access_token=CAAJMocfJwj8BAB0pzaDOd5njDyZBHEZBZAEHLn1pc7LvQNmS5Op1q6GTfnQh21PIoNURmWaT1QLUVpUh4jpt2HZCfhsBJwZAxDT9AdYX70kW4qyLKFiYxEuTuOSU9FrBBW0cya38G4LnpPMTV5MIBZBwZBEMI9lDJgYRfp4eIh5CfUxe1M7vhsLldAZBfoSLn2UZD",
    //         function (response) {
    //             if (response) {
    //                 /* handle the result */
    //                 console.log(response);
    //             }
    //         }
    //     );
    // }

    // $scope.init = function() {
    //     FB.XFBML.parse();
    // }

    $scope.rendered = false;

    var render = function() {
        var timer = $timeout(function() {
            FB.XFBML.parse();
            console.log('looped');
            render();
        }, 1000);

        FB.Event.subscribe('xfbml.render', function(response) {
            $timeout.cancel(timer);
            console.log('rendered.... finally!');
            $scope.rendered = true;
            $scope.$apply();
        });
    }

    render();

    $scope.$on('$locationChangeSuccess', function() {
        FB.XFBML.parse();
    });

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