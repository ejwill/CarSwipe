angular.module('starter.controllers', ['ionic', 'ionic.contrib.ui.cards'])

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
 
}

})
.controller('CardsCtrl', function($scope, $http, $ionicSwipeCardDelegate) {
  $scope.cards = [];
 
  $scope.addCard = function(img, name) {
      var newCard = {image: img, title: name};
      newCard.id = Math.random();
      $scope.cards.unshift(angular.extend({}, newCard));
  };
 
  $scope.addCards = function(count) {
    $http.get('http://api.randomuser.me/?results=' + count).then(function(value) {
      angular.forEach(value.data.results, function (v) {
        $scope.addCard(v.user.picture.medium, v.user.email);
      });
      $scope.showCards = true;
    });
  };
 
  $scope.addCards(1);
 
  $scope.cardSwiped = function(index) {
    $scope.addCards(1);
  };
 
  $scope.cardDestroyed = function(index) {
    $scope.cards.splice(index, 1);
  };
 
})
.controller('CardCtrl', function($scope, $ionicSwipeCardDelegate) {
  $scope.doAnything = function() {
    var card = $ionicSwipeCardDelegate.getSwipeableCard($scope);
    card.swipe();
  };
})