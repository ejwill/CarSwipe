angular.module('starter.controllers', [])

.controller('LoginCtrl', function($scope, $state, $cordovaFacebook, $ionicHistory) {
 
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
        $state.go('app.login');
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
         $ionicHistory.nextViewOptions({
        historyRoot: true
          });
        $state.go('app.home');
      }
    });
 
  };
  
  $scope.loginFacebook = function(){
 
  var ref = new Firebase("https://carswipe.firebaseio.com");
 
 
  if(ionic.Platform.isWebView()){
 
    $cordovaFacebook.login(["public_profile", "email"]).then(function(success){
 
      console.log(success);
 
      ref.authWithOAuthToken("facebook", success.authResponse.accessToken, function(error, authData) {
        if (error) {
          console.log('Firebase login failed!', error);
        } else {
          console.log('Authenticated successfully with payload:', authData);
        }
      });
 
    }, function(error){
      console.log(error);
    });        
 
  }
  else {
 
    ref.authWithOAuthPopup("facebook", function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
      } else {
        console.log("Authenticated successfully with payload:", authData);
        $ionicHistory.nextViewOptions({
              disableBack: true
            });
        $state.go('app.home');
      }
    });
 
  }
 
};



});
