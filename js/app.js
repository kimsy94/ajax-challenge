"use strict";
/*
    app.js, main Angular application script
    define your module and controllers here
*/
var commentsUrl = 'https://api.parse.com/1/classes/comments';

angular.module('CommentApp', ['ui.bootstrap'])
    .config(function($httpProvider) {
        $httpProvider.defaults.headers.common['X-Parse-Application-Id'] = '2MBT8XUgqeZAXTjhXWFKDsqTFLHNb1pwyffe6iXy';
        $httpProvider.defaults.headers.common['X-Parse-REST-API-Key'] = 'pe9QIaMBAKtubRBUOeUZCNU1xciiNdLcygWmxIEF';
    })
    .controller('CommentsController', function($scope, $http) {
        $scope.refreshComments = function () {
            $http.get(commentsUrl + "?order=-score")
                .success(function(data) {
                    $scope.comments = data.results;
                });
        };
        $scope.refreshComments();

        $scope.newComment = {score: 0};

        $scope.addComment = function() {
            $scope.inserting = true;
            $http.post(commentsUrl, $scope.newComment)
                .success(function(responseData) {
                    $scope.newComment.objectId = responseData.objectId;
                    $scope.comments.push($scope.newComment);
                    $scope.newComment = {score: 0};
                })
                .finally(function() {
                    $scope.inserting = false;
                });
        };

        $scope.updateComment = function(comment) {
            $http.put(commentsUrl + '/' + comment.objectId, comment)
                .success(function() {
                    //we could give some feedback to the user
                });
        };

        $scope.removeComment = function(comment) {
            if (window.confirm("Delete")) {
                $scope.loading = true;
                $http.delete(commentsUrl + '/' + comment.objectId)
                    .finally(function () {
                        $scope.refreshComments();
                        $scope.loading = false;
                    })
            }
        };

       $scope.incrementScore = function(comment, amount) {
           if (comment.score <= 0 && amount < 0) {
               return;
           }
           var postData = {
               score: {
                   __op: "Increment",
                   amount: amount
               }
           };

           $scope.updating = true;
           $http.put(commentsUrl + '/' + comment.objectId, postData)
               .success(function(respData) {
                    comment.score = respData.score;
               })
               .error(function(err) {
                    console.log(err);
               })
               .finally(function() {
                    $scope.updating = false;
               });
       };
    });