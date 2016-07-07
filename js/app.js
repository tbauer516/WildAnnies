'use strict';

angular.module('WildAnnie', ['ui.router', 'ui.bootstrap', 'angulartics', 'angulartics.piwik', 'angulartics.google.analytics', 'duScroll'])

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

    $scope.setSize = function() {
        var main = document.querySelector('.ui-container');
        var footer = document.querySelector('footer');

        var footerHeight;
        var footerMarginTop;
        
        try {
            footerHeight = parseInt(window.getComputedStyle(footer, null).getPropertyValue('height'));
            footerMarginTop = parseInt(window.getComputedStyle(footer, null).getPropertyValue('margin-top'));
        } catch(e) {
            footerHeight = parseInt(footer.currentStyle.height);
            footerMarginTop = parseInt(footer.currentStyle.marginTop);
        } 

        var height = window.innerHeight;
        main.style.minHeight = (height - (footerHeight + footerMarginTop)) + 'px';
    }

    // $scope.$on('$stateChangeSuccess', function () {
    //     $scope.setSize();
    // });

    // $scope.$on('$routeChangeSuccess', function () {
    //     $scope.setSize();
    // });

    $scope.$on('$viewContentLoaded', function() {
        $scope.setSize();
    });

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in.
        } else {
            // No user is signed in.
        }
    });

}])

.controller('HomeCtrl', ['$scope', '$document', '$timeout', '$http', function($scope, $document, $timeout, $http) {

    $scope.feed = [];

    $scope.pageUrl = 'http://www.facebook.com/wild.annies.food.truck/';

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
        var linkUrl = $scope.pageUrl + '/posts/';

        // HTTP Name of Page Call
        $http.get(graph + '?fields=name&' + authToken)
        .then(function successCallback(response) {
            console.log(response.data);
            $scope.feed.name = response.data.name;
        }, function errorCallback(response) {
            console.log(response);
        });

        // HTTP Description Call
        $http.get(graph + '?fields=description&' + authToken)
        .then(function successCallback(response) {
            console.log(response.data);
            $scope.feed.description = response.data.description;
        }, function errorCallback(response) {
            console.log(response);
        });

        // HTTP Cover call
        $http.get(graph + '?fields=cover&' + authToken)
        .then(function successCallback(response) {
            console.log(response.data);
            $scope.feed.cover = response.data.cover.source;
        }, function errorCallback(response) {
            console.log(response);
        });

        // HTTP Profile Pic call
        $http.get(graph + '/picture?redirect=false')
        .then(function successCallback(response) {
            console.log(response);
            $scope.feed.picture = response.data.data.url;
        }, function errorCallback(response) {
            console.log(response);
        });

        // HTTP Feed Calls
        $http.get(graph + '/posts?' + authToken + "&limit=15")
        .then(function successCallback(response) {
            console.log(response.data);
            $scope.feed.posts = [];
            for (var k = 0; k < response.data.data.length; k++) {
                (function(index) {
                    var postid = response.data.data[index].id;
                    var postFragments = postid.split('_');
                    postid = postFragments[1];

                    if (response.data.data[index].message) {
                        $scope.feed.posts.push({
                            'type': 'message',
                            'message': response.data.data[index].message,
                            'time': parseInt(Date.parse(response.data.data[index].created_time))
                        });
                        $scope.feed.posts[$scope.feed.posts.length - 1].link = linkUrl + postid;
                    } else if (response.data.data[index].story) {
                        $http.get('https://graph.facebook.com/' + response.data.data[index].id + '/attachments?' + authToken)
                        .then(function successCallback(resp) {
                            console.log(resp);
                            $scope.feed.posts.push({
                                'type': resp.data.data[0].type,
                                'story': response.data.data[index].story,
                                'time': parseInt(Date.parse(response.data.data[index].created_time))
                            });
                            if (resp.data.data[0].type.indexOf('photo') !== -1) {
                                $scope.feed.posts[$scope.feed.posts.length - 1].photo = resp.data.data[0].media.image.src;
                            }
                            $scope.feed.posts[$scope.feed.posts.length - 1].link = linkUrl + postid;
                        }, function errorCallback(resp) {
                            console.log(resp);
                        });
                    }
                })(k);
            }
        }, function errorCallback(response) {
            console.log(response);
        });
    }

    $scope.getFeed();
    setTimeout(function() {
        console.log($scope.feed);
    }
    ,5000);

    $scope.scrollToTop = function() {
        $document.scrollTo(0, 0, 500);
    }

    $scope.shouldBeVisible = false;

    $document.on('scroll', function() {
        console.log('Document scrolled to ', $document.scrollLeft(), $document.scrollTop());
        if ($document.scrollTop() > 300) {
            $scope.shouldBeVisible = true;
            document.getElementById("toTop").setAttribute("animation-name", "toTop");
        } else {
            document.getElementById("toTop").setAttribute("animation-name", "toBot");
            $scope.shouldBeVisible = false;
        }
        $scope.$apply();
    });

}])

.controller('MenuCtrl', ['$scope', function($scope) {



}])

.controller('MapCtrl', ['$scope', function($scope) {

    $scope.setMapSize = function() {
        var main = document.querySelector('#map-frame');
        var footer = document.querySelector('footer');
        var nav = document.querySelector('nav');

        var footerHeight;
        var footerMarginTop;
        var navHeight;
        var navMarginBottom;
        
        try {
            footerHeight = parseInt(window.getComputedStyle(footer, null).getPropertyValue('height'));
            footerMarginTop = parseInt(window.getComputedStyle(footer, null).getPropertyValue('margin-top'));
            navHeight = parseInt(window.getComputedStyle(nav, null).getPropertyValue('height'));
            navMarginBottom = parseInt(window.getComputedStyle(nav, null).getPropertyValue('margin-bottom'));
        } catch(e) {
            footerHeight = parseInt(footer.currentStyle.height);
            footerMarginTop = parseInt(footer.currentStyle.marginTop);
        } 

        var height = window.innerHeight;
        var width = window.innerWidth;
        main.style.height = (height - (footerHeight + footerMarginTop + navHeight + navMarginBottom) - 10) + 'px';
        main.style.width = (width - 20) + 'px';
        main.style.maxHeight = "800px";
        main.style.maxWidth = "800px";
        // main.style.padding = "20px";
    }

    $scope.setMapSize();

}])

.controller('AboutCtrl', ['$scope', function($scope) {



}])

.directive('setMinHeight', function ($window) {
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

        w.bind('setMinHeight', function () {
            scope.$apply();
        });
    }
});