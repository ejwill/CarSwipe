angular.module('starter.controllers', [])

.controller('LoginCtrl', function($scope, $state, $cordovaFacebook) {
 
  $scope.data = {};
 
  $scope.signupEmail = function(){  
 
    var ref = new Firebase("https://carswipe.firebaseio.com");
   
    ref.createUser({
      email    : $scope.data.email,
      password : $scope.data.password
    }, function(error, userData) {
      if (error) {
        console.log("Error creating user:", error);
      } else {
        console.log("Successfully created user account with uid:", userData.uid);
      }
    });
 
  };
 
  $scope.loginEmail = function(){
 
    var ref = new Firebase("https://carswipe.firebaseio.com");
   
    ref.authWithPassword({
      email    : $scope.data.email,
      password : $scope.data.password
    }, function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
      } else {
        console.log("Authenticated successfully with payload:", authData);
      }
    });
 
  };
  



});
