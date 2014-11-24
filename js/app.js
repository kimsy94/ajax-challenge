"use strict";
/*
    app.js, main Angular application script
    define your module and controllers here
*/

angular.module('CommentApp', ['ui.bootstrap'])
    .config(function($httpProvider) {
        $httpProvider.defaults.headers.common['X-Parse-Application-Id'] = '2MBT8XUgqeZAXTjhXWFKDsqTFLHNb1pwyffe6iXy';
        $httpProvider.defaults.headers.common['X-Parse-REST-API-Key'] = 'pe9QIaMBAKtubRBUOeUZCNU1xciiNdLcygWmxIEF';
    })
    .controller('CommentsController', function($scope, $http) {

    })