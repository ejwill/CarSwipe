angular.module('starter.controllers', ['ionic', 'ionTinderCards', 'firebase',])

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
.controller('AppController', function($scope, $timeout, TDCardDelegate, $http, $firebaseObject) {
        $scope.cards = [];
        $scope.list = [
            {vehicle_title:"2015 Land Rover Range Rover Supercharged",picture: "http://img2.carmax.com/image/12590162/216/162",
options:"Leather Seats, Navigation System, Tow Hitch, Front Seat Heaters, 4WD/AWD, Auxiliary Audio Input more...",location:"Buena Park, CA",price:"$106,998*",stock_num:"12590162",miles:"8K",drive:"4WD",trans:"Automatic",mpg:"14/19",exterior_color:"Black",interior_color:"Tan","index":1,"url":"http://www.carmax.com/search?ANa=285&D=90&zip=23114&Us=15&Q=9dd60990-1ab0-4925-9b0b-603eee53bc51&Ep=search:results:results%20page"},
{vehicle_title:"2015 Porsche 911 Carrera GTS",picture: "http://img2.carmax.com/image/12871013/216/162",
options:"Premium Package, Sport Package, Navigation System, Sunroof(s), Rear Spoiler, Front Seat Heaters more...",location:"Irvine, CA",price:"$98,998*",stock_num:"12871013",miles:"6K",drive:"2WD",trans:"Manual 6 Speed",mpg:"19/27",exterior_color:"White",interior_color:"Black","index":2,"url":"http://www.carmax.com/search?ANa=285&D=90&zip=23114&Us=15&Q=9dd60990-1ab0-4925-9b0b-603eee53bc51&Ep=search:results:results%20page"},
{vehicle_title:"2012 Porsche 911 Turbo S",picture: "http://img2.carmax.com/image/12413489/216/162",
options:"Navigation System, Sunroof(s), Rear Spoiler, Front Seat Heaters, Turbo Charged Engine, BOSE Sound System more...",location:"Dulles, VA",price:"$93,998*",stock_num:"12413489",miles:"23K",drive:"4WD",trans:"Automatic",mpg:"17/25",exterior_color:"Black",interior_color:"Black","index":3,"url":"http://www.carmax.com/search?ANa=285&D=90&zip=23114&Us=15&Q=9dd60990-1ab0-4925-9b0b-603eee53bc51&Ep=search:results:results%20page"},
{vehicle_title:"2015 Mercedes-Benz S550",picture: "http://img2.carmax.com/image/12782776/216/162",
options:"Sport Package, Premium Package, Adjustable Suspension, Navigation System, Leather Seats, Front Seat Heaters more...",location:"Miami, FL",price:"$92,998*",stock_num:"12782776",miles:"4K",drive:"2WD",trans:"Automatic",mpg:"17/26",exterior_color:"White",interior_color:"Tan","index":4,"url":"http://www.carmax.com/search?ANa=285&D=90&zip=23114&Us=15&Q=9dd60990-1ab0-4925-9b0b-603eee53bc51&Ep=search:results:results%20page"},
{vehicle_title:"2015 Mercedes-Benz S550",picture: "http://img2.carmax.com/image/12860441/216/162",
options:"Sport Package, Adjustable Suspension, Navigation System, Leather Seats, Front Seat Heaters, Satellite Radio Ready more...",location:"Los Angeles, CA",price:"$84,998*",stock_num:"12860441",miles:"6K",drive:"2WD",trans:"Automatic",mpg:"17/26",exterior_color:"White",interior_color:"Tan","index":5,"url":"http://www.carmax.com/search?ANa=285&D=90&zip=23114&Us=15&Q=9dd60990-1ab0-4925-9b0b-603eee53bc51&Ep=search:results:results%20page"},
{vehicle_title:"2012 Mercedes-Benz CL65 AMG",picture: "http://img2.carmax.com/image/12542802/216/162",
options:"Navigation System, Sunroof(s), Front Seat Heaters, Satellite Radio Ready, Memory Seat(s), Cruise Control more...",location:"Las Vegas, NV",price:"$83,998*",stock_num:"12542802",miles:"30K",drive:"2WD",trans:"Automatic",mpg:"Not Available",exterior_color:"Black",interior_color:"Black","index":6,"url":"http://www.carmax.com/search?ANa=285&D=90&zip=23114&Us=15&Q=9dd60990-1ab0-4925-9b0b-603eee53bc51&Ep=search:results:results%20page"},
{vehicle_title:"2014 Land Rover Range Rover Supercharged",picture: "http://img2.carmax.com/image/12814120/216/162",
options:"Leather Seats, Navigation System, Tow Hitch, Front Seat Heaters, 4WD/AWD, Auxiliary Audio Input more...",location:"Dulles, VA",price:"$82,998*",stock_num:"12814120",miles:"22K",drive:"4WD",trans:"Automatic",mpg:"13/19",exterior_color:"Green",interior_color:"Brown","index":7,"url":"http://www.carmax.com/search?ANa=285&D=90&zip=23114&Us=15&Q=9dd60990-1ab0-4925-9b0b-603eee53bc51&Ep=search:results:results%20page"},
{vehicle_title:"2015 Cadillac Escalade ESV Platinum",picture: "http://img2.carmax.com/image/12728971/216/162",
options:"Leather Seats, 3rd Rear Seat, Sunroof(s), Navigation System, DVD Video System, Tow Hitch more...",location:"Denver, CO",price:"$82,998*",stock_num:"12728971",miles:"7K",drive:"4WD",trans:"Automatic",mpg:"Not Available",exterior_color:"Black",interior_color:"Brown","index":8,"url":"http://www.carmax.com/search?ANa=285&D=90&zip=23114&Us=15&Q=9dd60990-1ab0-4925-9b0b-603eee53bc51&Ep=search:results:results%20page"},
{vehicle_title:"2014 Land Rover Range Rover HSE",picture: "http://img2.carmax.com/image/12310248/216/162",
options:"Leather Seats, Navigation System, Tow Hitch, Front Seat Heaters, 4WD/AWD, Auxiliary Audio Input more...",location:"Dallas, TX",price:"$81,998*",stock_num:"12310248",miles:"25K",drive:"4WD",trans:"Automatic",mpg:"Not Available",exterior_color:"Silver",interior_color:"Tan","index":9,"url":"http://www.carmax.com/search?ANa=285&D=90&zip=23114&Us=15&Q=9dd60990-1ab0-4925-9b0b-603eee53bc51&Ep=search:results:results%20page"},
{vehicle_title:"2015 Lexus LX 570",picture: "http://img2.carmax.com/image/12909887/216/162",
options:"Luxury Package, Leather Seats, 3rd Rear Seat, Sunroof(s), Navigation System, DVD Video System more...",location:"West Broad",price:"$79,998*",stock_num:"12909887",miles:"<1K",drive:"4WD",trans:"Automatic",mpg:"Not Available",exterior_color:"Gray",interior_color:"Black","index":10,"url":"http://www.carmax.com/search?ANa=285&D=90&zip=23114&Us=15&Q=9dd60990-1ab0-4925-9b0b-603eee53bc51&Ep=search:results:results%20page"},
{vehicle_title:"2014 Porsche 911 Carrera S",picture: "http://img2.carmax.com/image/12603859/216/162",
options:"Sport Package, Leather Seats, Navigation System, Sunroof(s), Rear Spoiler, Front Seat Heaters more...",location:"San Diego, CA",price:"$78,998*",stock_num:"12603859",miles:"5K",drive:"2WD",trans:"Manual 7 Speed",mpg:"Not Available",exterior_color:"Black",interior_color:"Black","index":11,"url":"http://www.carmax.com/search?ANa=285&D=90&zip=23114&Us=15&Q=9dd60990-1ab0-4925-9b0b-603eee53bc51&Ep=search:results:results%20page"},
{vehicle_title:"2014 Mercedes-Benz S550",picture: "http://img2.carmax.com/image/12160985/216/162",
options:"Premium Package, Navigation System, Leather Seats, Front Seat Heaters, Satellite Radio Ready, Memory Seat(s) more...",location:"Columbus, OH",price:"$75,998*",stock_num:"12160985",miles:"11K",drive:"2WD",trans:"Automatic",mpg:"17/25",exterior_color:"Silver",interior_color:"Tan","index":12,"url":"http://www.carmax.com/search?ANa=285&D=90&zip=23114&Us=15&Q=9dd60990-1ab0-4925-9b0b-603eee53bc51&Ep=search:results:results%20page"},
{vehicle_title:"2015 Jaguar XJ L Supercharged",picture: "http://img2.carmax.com/image/12795772/216/162",
options:"Navigation System, Leather Seats, Front Seat Heaters, DVD Video System, Satellite Radio Ready, Memory Seat(s) more...",location:"Austin, TX",price:"$75,998*",stock_num:"12795772",miles:"8K",drive:"2WD",trans:"Automatic",mpg:"15/23",exterior_color:"Gray",interior_color:"Tan","index":13,"url":"http://www.carmax.com/search?ANa=285&D=90&zip=23114&Us=15&Q=9dd60990-1ab0-4925-9b0b-603eee53bc51&Ep=search:results:results%20page"},
{vehicle_title:"2015 Mercedes-Benz GL550",picture: "http://img2.carmax.com/image/12630567/216/162",
options:"Leather Seats, 3rd Rear Seat, Navigation System, Tow Hitch, Front Seat Heaters, 4WD/AWD more...",location:"Naperville, IL",price:"$74,998*",stock_num:"12630567",miles:"20K",drive:"4WD",trans:"Automatic",mpg:"13/18",exterior_color:"Silver",interior_color:"Gray","index":14,"url":"http://www.carmax.com/search?ANa=285&D=90&zip=23114&Us=15&Q=9dd60990-1ab0-4925-9b0b-603eee53bc51&Ep=search:results:results%20page"},
{vehicle_title:"2012 Porsche Panamera Turbo",picture: "http://img2.carmax.com/image/11104121/216/162",
options:"4WD/AWD, Navigation System, Sunroof(s), Front Seat Heaters, Rear Spoiler, BOSE Sound System more...",location:"Jackson, MS",price:"$74,998*",stock_num:"11104121",miles:"31K",drive:"4WD",trans:"Automatic",mpg:"15/23",exterior_color:"Gray",interior_color:"Tan","index":15,"url":"http://www.carmax.com/search?ANa=285&D=90&zip=23114&Us=15&Q=9dd60990-1ab0-4925-9b0b-603eee53bc51&Ep=search:results:results%20page"},
{vehicle_title:"2009 Porsche 911 Turbo",picture: "http://img2.carmax.com/image/12785883/216/162",
options:"Navigation System, Rear Spoiler, Front Seat Heaters, Turbo Charged Engine, BOSE Sound System, Alloy Wheels more...",location:"Houston, TX",price:"$74,998*",stock_num:"12785883",miles:"35K",drive:"4WD",trans:"Automatic",mpg:"15/23",exterior_color:"Blue",interior_color:"Black","index":16,"url":"http://www.carmax.com/search?ANa=285&D=90&zip=23114&Us=15&Q=9dd60990-1ab0-4925-9b0b-603eee53bc51&Ep=search:results:results%20page"},
{vehicle_title:"2013 Audi S8",picture: "http://img2.carmax.com/image/12679555/216/162",
options:"4WD/AWD, Navigation System, Sunroof(s), Front Seat Heaters, BOSE Sound System, Satellite Radio Ready more...",location:"Ontario, CA",price:"$74,998*",stock_num:"12679555",miles:"17K",drive:"4WD",trans:"Automatic",mpg:"15/26",exterior_color:"Blue",interior_color:"Black","index":17,"url":"http://www.carmax.com/search?ANa=285&D=90&zip=23114&Us=15&Q=9dd60990-1ab0-4925-9b0b-603eee53bc51&Ep=search:results:results%20page"},
{vehicle_title:"2014 Porsche 911 Carrera S",picture: "http://img2.carmax.com/image/12295034/216/162",
options:"Premium Package, Leather Seats, Navigation System, Sunroof(s), Rear Spoiler, Front Seat Heaters more...",location:"Costa Mesa, CA",price:"$74,998*",stock_num:"12295034",miles:"13K",drive:"2WD",trans:"Manual 7 Speed",mpg:"Not Available",exterior_color:"Brown",interior_color:"Tan","index":18,"url":"http://www.carmax.com/search?ANa=285&D=90&zip=23114&Us=15&Q=9dd60990-1ab0-4925-9b0b-603eee53bc51&Ep=search:results:results%20page"},
{vehicle_title:"2015 BMW 650 I",picture: "http://img2.carmax.com/image/12801873/216/162",
options:"Cold Weather Package, Navigation System, Front Seat Heaters, Satellite Radio Ready, Memory Seat(s), Auxiliary Audio Input more...",location:"Buena Park, CA",price:"$74,998*",stock_num:"12801873",miles:"6K",drive:"2WD",trans:"Automatic",mpg:"17/25",exterior_color:"Black",interior_color:"Black","index":19,"url":"http://www.carmax.com/search?ANa=285&D=90&zip=23114&Us=15&Q=9dd60990-1ab0-4925-9b0b-603eee53bc51&Ep=search:results:results%20page"},
{vehicle_title:"2014 Mercedes-Benz S550",picture: "http://img2.carmax.com/image/12518067/216/162",
options:"Premium Package, Adjustable Suspension, 4WD/AWD, Navigation System, Leather Seats, Front Seat Heaters more...",location:"Frederick, MD",price:"$74,899*",stock_num:"12518067",miles:"17K",drive:"4WD",trans:"Automatic",mpg:"16/26",exterior_color:"Black",interior_color:"Brown","index":20,"url":"http://www.carmax.com/search?ANa=285&D=90&zip=23114&Us=15&Q=9dd60990-1ab0-4925-9b0b-603eee53bc51&Ep=search:results:results%20page"},
{vehicle_title:"2015 Lexus LX 570",picture: "http://img2.carmax.com/image/12607453/216/162",
options:"Luxury Package, Leather Seats, 3rd Rear Seat, Sunroof(s), Navigation System, DVD Video System more...",location:"Turnersville, NJ",price:"$73,998*",stock_num:"12607453",miles:"14K",drive:"4WD",trans:"Automatic",mpg:"12/17",exterior_color:"Gray",interior_color:"Black","index":21,"url":"http://www.carmax.com/search?No=20&D=90&zip=23114&N=285&Us=15&Q=9dd60990-1ab0-4925-9b0b-603eee53bc51&Ep=search:results:results%20page"},
{vehicle_title:"2013 Porsche 911 Carrera 4S",picture: "http://img2.carmax.com/image/12252416/216/162",
options:"Premium Package, Leather Seats, Navigation System, Sunroof(s), Rear Spoiler, Front Seat Heaters more...",location:"Albuquerque, NM",price:"$73,998*",stock_num:"12252416",miles:"23K",drive:"4WD",trans:"Automatic",mpg:"Not Available",exterior_color:"Red",interior_color:"Black","index":22,"url":"http://www.carmax.com/search?No=20&D=90&zip=23114&N=285&Us=15&Q=9dd60990-1ab0-4925-9b0b-603eee53bc51&Ep=search:results:results%20page"},
{vehicle_title:"2015 BMW 750 I",picture: "http://img2.carmax.com/image/12252024/216/162",
options:"Navigation System, Leather Seats, Sunroof(s), Front Seat Heaters, Satellite Radio Ready, Memory Seat(s) more...",location:"Las Vegas, NV",price:"$73,998*",stock_num:"12252024",miles:"3K",drive:"2WD",trans:"Automatic",mpg:"17/25",exterior_color:"Gray",interior_color:"Tan","index":23,"url":"http://www.carmax.com/search?No=20&D=90&zip=23114&N=285&Us=15&Q=9dd60990-1ab0-4925-9b0b-603eee53bc51&Ep=search:results:results%20page"},
{vehicle_title:"2015 Cadillac Escalade ESV Premium",picture: "http://img2.carmax.com/image/12702959/216/162",
options:"Leather Seats, 3rd Rear Seat, Sunroof(s), Navigation System, DVD Video System, Tow Hitch more...",location:"Las Vegas, NV",price:"$73,998*",stock_num:"12702959",miles:"15K",drive:"4WD",trans:"Automatic",mpg:"14/20",exterior_color:"Black",interior_color:"Black","index":24,"url":"http://www.carmax.com/search?No=20&D=90&zip=23114&N=285&Us=15&Q=9dd60990-1ab0-4925-9b0b-603eee53bc51&Ep=search:results:results%20page"},
{vehicle_title:"2015 BMW M4",picture: "http://img2.carmax.com/image/12571470/216/162",
options:"Leather Seats, Navigation System, Rear Spoiler, Front Seat Heaters, Turbo Charged Engine, Hard Top more...",location:"Ontario, CA",price:"$73,998*",stock_num:"12571470",miles:"8K",drive:"2WD",trans:"Automatic",mpg:"17/24",exterior_color:"Silver",interior_color:"Black","index":25,"url":"http://www.carmax.com/search?No=20&D=90&zip=23114&N=285&Us=15&Q=9dd60990-1ab0-4925-9b0b-603eee53bc51&Ep=search:results:results%20page"},
{vehicle_title:"2013 Porsche 911 Carrera S",picture: "http://img2.carmax.com/image/12498088/216/162",
options:"Premium Package, Leather Seats, Navigation System, Sunroof(s), Rear Spoiler, Front Seat Heaters more...",location:"Roseville, CA",price:"$73,998*",stock_num:"12498088",miles:"16K",drive:"2WD",trans:"Automatic",mpg:"19/27",exterior_color:"Black",interior_color:"Black","index":26,"url":"http://www.carmax.com/search?No=20&D=90&zip=23114&N=285&Us=15&Q=9dd60990-1ab0-4925-9b0b-603eee53bc51&Ep=search:results:results%20page"},
{vehicle_title:"2014 Mercedes-Benz ML63 AMG AMG",picture: "http://img2.carmax.com/image/12562419/216/162",
options:"Special Edition, Performance Package, Leather Seats, Sunroof(s), Navigation System, Tow Hitch more...",location:"Houston, TX",price:"$72,998*",stock_num:"12562419",miles:"35K",drive:"4WD",trans:"Automatic",mpg:"13/17",exterior_color:"Black",interior_color:"Black","index":27,"url":"http://www.carmax.com/search?No=20&D=90&zip=23114&N=285&Us=15&Q=9dd60990-1ab0-4925-9b0b-603eee53bc51&Ep=search:results:results%20page"},
{vehicle_title:"2014 Mercedes-Benz S550",picture: "http://img2.carmax.com/image/12734746/216/162",
options:"Premium Package, Adjustable Suspension, Navigation System, Leather Seats, Front Seat Heaters, Satellite Radio Ready more...",location:"Houston, TX",price:"$72,998*",stock_num:"12734746",miles:"13K",drive:"2WD",trans:"Automatic",mpg:"17/25",exterior_color:"Silver",interior_color:"Black","index":28,"url":"http://www.carmax.com/search?No=20&D=90&zip=23114&N=285&Us=15&Q=9dd60990-1ab0-4925-9b0b-603eee53bc51&Ep=search:results:results%20page"},
{vehicle_title:"2015 Porsche Cayman GTS",picture: "http://img2.carmax.com/image/12727457/216/162",
options:"Adjustable Suspension, Navigation System, Rear Spoiler, Front Seat Heaters, BOSE Sound System, Alloy Wheels more...",location:"Houston, TX",price:"$72,998*",stock_num:"12727457",miles:"5K",drive:"2WD",trans:"Manual 6 Speed",mpg:"19/26",exterior_color:"Black",interior_color:"Black","index":29,"url":"http://www.carmax.com/search?No=20&D=90&zip=23114&N=285&Us=15&Q=9dd60990-1ab0-4925-9b0b-603eee53bc51&Ep=search:results:results%20page"},
{vehicle_title:"2012 Porsche 911 GTS",picture: "http://img2.carmax.com/image/12388321/216/162",
options:"Navigation System, Rear Spoiler, Front Seat Heaters, BOSE Sound System, Alloy Wheels, Traction Control more...",location:"Austin, TX",price:"$72,998*",stock_num:"12388321",miles:"11K",drive:"2WD",trans:"Automatic",mpg:"19/27",exterior_color:"Black",interior_color:"Black","index":30,"url":"http://www.carmax.com/search?No=20&D=90&zip=23114&N=285&Us=15&Q=9dd60990-1ab0-4925-9b0b-603eee53bc51&Ep=search:results:results%20page"},
{vehicle_title:"2015 BMW 650 I Gran Coupe",picture: "http://img2.carmax.com/image/12557027/216/162",
options:"Navigation System, Front Seat Heaters, Satellite Radio Ready, Memory Seat(s), Auxiliary Audio Input, A/C Seat(s) more...",location:"Las Vegas, NV",price:"$72,998*",stock_num:"12557027",miles:"4K",drive:"2WD",trans:"Automatic",mpg:"17/25",exterior_color:"Black",interior_color:"Black","index":31,"url":"http://www.carmax.com/search?No=20&D=90&zip=23114&N=285&Us=15&Q=9dd60990-1ab0-4925-9b0b-603eee53bc51&Ep=search:results:results%20page"},
{vehicle_title:"2015 Porsche Macan Turbo",picture: "http://img2.carmax.com/image/12449200/216/162",
options:"Premium Package, Navigation System, Tow Hitch, Front Seat Heaters, 4WD/AWD, Auxiliary Audio Input more...",location:"Laurel, MD",price:"$71,998*",stock_num:"12449200",miles:"10K",drive:"4WD",trans:"Automatic",mpg:"17/23",exterior_color:"White",interior_color:"Brown","index":32,"url":"http://www.carmax.com/search?No=20&D=90&zip=23114&N=285&Us=15&Q=9dd60990-1ab0-4925-9b0b-603eee53bc51&Ep=search:results:results%20page"},
{vehicle_title:"2014 BMW M5",picture: "http://img2.carmax.com/image/12502036/216/162",
options:"Competition Package, Leather Seats, Navigation System, Sunroof(s), Rear Spoiler, Front Seat Heaters more...",location:"Schaumburg, IL",price:"$71,998*",stock_num:"12502036",miles:"14K",drive:"2WD",trans:"Automatic",mpg:"14/20",exterior_color:"Black",interior_color:"Black","index":33,"url":"http://www.carmax.com/search?No=20&D=90&zip=23114&N=285&Us=15&Q=9dd60990-1ab0-4925-9b0b-603eee53bc51&Ep=search:results:results%20page"},
{vehicle_title:"2016 BMW M4",picture: "http://img2.carmax.com/image/12560817/216/162",
options:"Leather Seats, Navigation System, Front Seat Heaters, Turbo Charged Engine, Harman Kardon Sound, Alloy Wheels more...",location:"Ft. Lauderdale, FL",price:"$71,998*",stock_num:"12560817",miles:"2K",drive:"2WD",trans:"Manual 6 Speed",mpg:"Not Available",exterior_color:"Orange",interior_color:"Black","index":34,"url":"http://www.carmax.com/search?No=20&D=90&zip=23114&N=285&Us=15&Q=9dd60990-1ab0-4925-9b0b-603eee53bc51&Ep=search:results:results%20page"},
{vehicle_title:"2015 Cadillac Escalade Premium",picture: "http://img2.carmax.com/image/12727407/216/162",
options:"Leather Seats, 3rd Rear Seat, Sunroof(s), Navigation System, DVD Video System, Tow Hitch more...",location:"Irving, TX",price:"$71,998*",stock_num:"12727407",miles:"19K",drive:"4WD",trans:"Automatic",mpg:"15/21",exterior_color:"Black",interior_color:"Black","index":35,"url":"http://www.carmax.com/search?No=20&D=90&zip=23114&N=285&Us=15&Q=9dd60990-1ab0-4925-9b0b-603eee53bc51&Ep=search:results:results%20page"},
{vehicle_title:"2015 Cadillac Escalade Premium",picture: "http://img2.carmax.com/image/12712642/216/162",
options:"Leather Seats, 3rd Rear Seat, Sunroof(s), Navigation System, DVD Video System, Tow Hitch more...",location:"Irving, TX",price:"$71,998*",stock_num:"12712642",miles:"11K",drive:"2WD",trans:"Automatic",mpg:"15/22",exterior_color:"Black",interior_color:"Tan","index":36,"url":"http://www.carmax.com/search?No=20&D=90&zip=23114&N=285&Us=15&Q=9dd60990-1ab0-4925-9b0b-603eee53bc51&Ep=search:results:results%20page"},
{vehicle_title:"2013 Porsche Cayenne GTS",picture: "http://img2.carmax.com/image/12570391/216/162",
options:"Navigation System, Front Seat Heaters, 4WD/AWD, Auxiliary Audio Input, Rear View Camera, Adjustable Suspension more...",location:"Irving, TX",price:"$71,998*",stock_num:"12570391",miles:"10K",drive:"4WD",trans:"Automatic",mpg:"15/21",exterior_color:"Blue",interior_color:"Brown","index":37,"url":"http://www.carmax.com/search?No=20&D=90&zip=23114&N=285&Us=15&Q=9dd60990-1ab0-4925-9b0b-603eee53bc51&Ep=search:results:results%20page"},
{vehicle_title:"2014 Mercedes-Benz GL550",picture: "http://img2.carmax.com/image/12785845/216/162",
options:"Leather Seats, 3rd Rear Seat, Sunroof(s), Navigation System, Front Seat Heaters, 4WD/AWD more...",location:"Houston, TX",price:"$71,998*",stock_num:"12785845",miles:"21K",drive:"4WD",trans:"Automatic",mpg:"13/18",exterior_color:"Black",interior_color:"Brown","index":38,"url":"http://www.carmax.com/search?No=20&D=90&zip=23114&N=285&Us=15&Q=9dd60990-1ab0-4925-9b0b-603eee53bc51&Ep=search:results:results%20page"},
{vehicle_title:"2015 Cadillac Escalade ESV Luxury",picture: "http://img2.carmax.com/image/12729890/216/162",
options:"Leather Seats, 3rd Rear Seat, Sunroof(s), Navigation System, Tow Hitch, Quad Seats more...",location:"Los Angeles, CA",price:"$71,998*",stock_num:"12729890",miles:"15K",drive:"4WD",trans:"Automatic",mpg:"14/20",exterior_color:"Gray",interior_color:"Black","index":39,"url":"http://www.carmax.com/search?No=20&D=90&zip=23114&N=285&Us=15&Q=9dd60990-1ab0-4925-9b0b-603eee53bc51&Ep=search:results:results%20page"},
{vehicle_title:"2015 Cadillac Escalade Luxury",picture: "http://img2.carmax.com/image/12521994/216/162",
options:"Leather Seats, 3rd Rear Seat, Sunroof(s), Navigation System, DVD Video System, Tow Hitch more...",location:"Norcross, GA",price:"$70,998*",stock_num:"12521994",miles:"9K",drive:"4WD",trans:"Automatic",mpg:"15/21",exterior_color:"Gray",interior_color:"Black","index":40,"url":"http://www.carmax.com/search?No=20&D=90&zip=23114&N=285&Us=15&Q=9dd60990-1ab0-4925-9b0b-603eee53bc51&Ep=search:results:results%20page"},
{vehicle_title:"2015 Mercedes-Benz SL400",picture: "http://img2.carmax.com/image/12481580/216/162",
options:"Sport Package, Premium Package, Adjustable Suspension, Navigation System, Front Seat Heaters, Satellite Radio Ready more...",location:"Phoenix, AZ",price:"$70,998*",stock_num:"12481580",miles:"5K",drive:"2WD",trans:"Automatic",mpg:"20/27",exterior_color:"White",interior_color:"Red","index":41,"url":"http://www.carmax.com/search?No=40&D=90&zip=23114&N=285&Us=15&Q=9dd60990-1ab0-4925-9b0b-603eee53bc51&Ep=search:results:results%20page"},
{vehicle_title:"2014 BMW M5",picture: "http://img2.carmax.com/image/12732323/216/162",
options:"Navigation System, Sunroof(s), Rear Spoiler, Front Seat Heaters, Turbo Charged Engine, Harman Kardon Sound more...",location:"Ontario, CA",price:"$70,998*",stock_num:"12732323",miles:"31K",drive:"2WD",trans:"Automatic",mpg:"14/20",exterior_color:"Black",interior_color:"Black","index":42,"url":"http://www.carmax.com/search?No=40&D=90&zip=23114&N=285&Us=15&Q=9dd60990-1ab0-4925-9b0b-603eee53bc51&Ep=search:results:results%20page"},
{vehicle_title:"2015 Cadillac Escalade ESV Luxury",picture: "http://img2.carmax.com/image/12413687/216/162",
options:"Leather Seats, 3rd Rear Seat, Sunroof(s), Navigation System, Tow Hitch, Front Seat Heaters more...",location:"Costa Mesa, CA",price:"$70,998*",stock_num:"12413687",miles:"23K",drive:"4WD",trans:"Automatic",mpg:"14/20",exterior_color:"Black",interior_color:"Black","index":43,"url":"http://www.carmax.com/search?No=40&D=90&zip=23114&N=285&Us=15&Q=9dd60990-1ab0-4925-9b0b-603eee53bc51&Ep=search:results:results%20page"},
{vehicle_title:"2015 Cadillac Escalade Premium",picture: "http://img2.carmax.com/image/12747660/216/162",
options:"Leather Seats, 3rd Rear Seat, Sunroof(s), Navigation System, DVD Video System, Tow Hitch more...",location:"Sacramento, CA",price:"$70,998*",stock_num:"12747660",miles:"28K",drive:"4WD",trans:"Automatic",mpg:"15/21",exterior_color:"Black",interior_color:"Black","index":44,"url":"http://www.carmax.com/search?No=40&D=90&zip=23114&N=285&Us=15&Q=9dd60990-1ab0-4925-9b0b-603eee53bc51&Ep=search:results:results%20page"},
{vehicle_title:"2015 Jaguar F-Type S",picture: "http://img2.carmax.com/image/10974353/216/162",
options:"Premium Package, Navigation System, Front Seat Heaters, Rear Spoiler, Satellite Radio Ready, Memory Seat(s) more...",location:"Woodbridge, VA",price:"$69,998*",stock_num:"10974353",miles:"5K",drive:"2WD",trans:"Automatic",mpg:"19/27",exterior_color:"Silver",interior_color:"Black","index":45,"url":"http://www.carmax.com/search?No=40&D=90&zip=23114&N=285&Us=15&Q=9dd60990-1ab0-4925-9b0b-603eee53bc51&Ep=search:results:results%20page"},
{vehicle_title:"2013 Porsche Panamera 4S",picture: "http://img2.carmax.com/image/12491063/216/162",
options:"Sport Package, Premium Package, 4WD/AWD, Navigation System, Leather Seats, Sunroof(s) more...",location:"Boston, MA",price:"$69,998*",stock_num:"12491063",miles:"14K",drive:"4WD",trans:"Automatic",mpg:"16/24",exterior_color:"Black",interior_color:"Black","index":46,"url":"http://www.carmax.com/search?No=40&D=90&zip=23114&N=285&Us=15&Q=9dd60990-1ab0-4925-9b0b-603eee53bc51&Ep=search:results:results%20page"},
{vehicle_title:"2015 Mercedes-Benz SL400",picture: "http://img2.carmax.com/image/12233938/216/162",
options:"Navigation System, Front Seat Heaters, Memory Seat(s), Auxiliary Audio Input, A/C Seat(s), Parking Sensors more...",location:"Dallas, TX",price:"$69,998*",stock_num:"12233938",miles:"2K",drive:"2WD",trans:"Automatic",mpg:"20/27",exterior_color:"Silver",interior_color:"Red","index":47,"url":"http://www.carmax.com/search?No=40&D=90&zip=23114&N=285&Us=15&Q=9dd60990-1ab0-4925-9b0b-603eee53bc51&Ep=search:results:results%20page"},
{vehicle_title:"2014 BMW M5",picture: "http://img2.carmax.com/image/12727614/216/162",
options:"Leather Seats, Navigation System, Sunroof(s), Rear Spoiler, Front Seat Heaters, Turbo Charged Engine more...",location:"Irving, TX",price:"$69,998*",stock_num:"12727614",miles:"15K",drive:"2WD",trans:"Automatic",mpg:"14/20",exterior_color:"Blue",interior_color:"Gray","index":48,"url":"http://www.carmax.com/search?No=40&D=90&zip=23114&N=285&Us=15&Q=9dd60990-1ab0-4925-9b0b-603eee53bc51&Ep=search:results:results%20page"},
{vehicle_title:"2014 Porsche 911 Carrera",picture: "http://img2.carmax.com/image/12756619/216/162",
options:"Leather Seats, Navigation System, Sunroof(s), Rear Spoiler, Front Seat Heaters, BOSE Sound System more...",location:"Tucson, AZ",price:"$69,998*",stock_num:"12756619",miles:"12K",drive:"2WD",trans:"Automatic",mpg:"Not Available",exterior_color:"Silver",interior_color:"Black","index":49,"url":"http://www.carmax.com/search?No=40&D=90&zip=23114&N=285&Us=15&Q=9dd60990-1ab0-4925-9b0b-603eee53bc51&Ep=search:results:results%20page"},
{vehicle_title:"2012 Porsche 911 Carrera 4S",picture: "http://img2.carmax.com/image/12870631/216/162",
options:"Navigation System, Front Seat Heaters, BOSE Sound System, Alloy Wheels, Traction Control, Cruise Control more...",location:"Irvine, CA",price:"$69,998*",stock_num:"12870631",miles:"13K",drive:"2WD",trans:"Manual 6 Speed",mpg:"18/25",exterior_color:"Silver",interior_color:"Black","index":50,"url":"http://www.carmax.com/search?No=40&D=90&zip=23114&N=285&Us=15&Q=9dd60990-1ab0-4925-9b0b-603eee53bc51&Ep=search:results:results%20page"},
{vehicle_title:"2015 BMW M4",picture: "http://img2.carmax.com/image/12515492/216/162",
options:"Leather Seats, Navigation System, Sunroof(s), Front Seat Heaters, Turbo Charged Engine, Harman Kardon Sound more...",location:"Roseville, CA",price:"$69,998*",stock_num:"12515492",miles:"5K",drive:"2WD",trans:"Manual 6 Speed",mpg:"17/26",exterior_color:"White",interior_color:"Red","index":51,"url":"http://www.carmax.com/search?No=40&D=90&zip=23114&N=285&Us=15&Q=9dd60990-1ab0-4925-9b0b-603eee53bc51&Ep=search:results:results%20page"},
{vehicle_title:"2014 BMW M5",picture: "http://img2.carmax.com/image/12611167/216/162",
options:"Competition Package, Leather Seats, Navigation System, Sunroof(s), Rear Spoiler, Front Seat Heaters more...",location:"Roseville, CA",price:"$69,998*",stock_num:"12611167",miles:"23K",drive:"2WD",trans:"Automatic",mpg:"14/20",exterior_color:"Black",interior_color:"Black","index":52,"url":"http://www.carmax.com/search?No=40&D=90&zip=23114&N=285&Us=15&Q=9dd60990-1ab0-4925-9b0b-603eee53bc51&Ep=search:results:results%20page"},
{vehicle_title:"2014 Mercedes-Benz SL550",picture: "http://img2.carmax.com/image/12514930/216/162",
options:"Sport Package, Leather Seats, Navigation System, Front Seat Heaters, Turbo Charged Engine, Hard Top more...",location:"Roseville, CA",price:"$69,998*",stock_num:"12514930",miles:"12K",drive:"2WD",trans:"Automatic",mpg:"18/25",exterior_color:"Silver",interior_color:"Black","index":53,"url":"http://www.carmax.com/search?No=40&D=90&zip=23114&N=285&Us=15&Q=9dd60990-1ab0-4925-9b0b-603eee53bc51&Ep=search:results:results%20page"},
{vehicle_title:"2012 Porsche 911 Carrera S",picture: "http://img2.carmax.com/image/12719433/216/162",
options:"Leather Seats, Navigation System, Sunroof(s), Rear Spoiler, Front Seat Heaters, BOSE Sound System more...",location:"Laurel, MD",price:"$69,899*",stock_num:"12719433",miles:"19K",drive:"2WD",trans:"Manual 6 Speed",mpg:"19/27",exterior_color:"Silver",interior_color:"Black","index":54,"url":"http://www.carmax.com/search?No=40&D=90&zip=23114&N=285&Us=15&Q=9dd60990-1ab0-4925-9b0b-603eee53bc51&Ep=search:results:results%20page"},
{vehicle_title:"2008 Porsche 911 Turbo",picture: "http://img2.carmax.com/image/12326668/216/162",
options:"Sport Package, Navigation System, Rear Spoiler, Front Seat Heaters, Turbo Charged Engine, BOSE Sound System more...",location:"Boston, MA",price:"$68,998*",stock_num:"12326668",miles:"22K",drive:"4WD",trans:"Manual 6 Speed",mpg:"15/24",exterior_color:"Black",interior_color:"Tan","index":55,"url":"http://www.carmax.com/search?No=40&D=90&zip=23114&N=285&Us=15&Q=9dd60990-1ab0-4925-9b0b-603eee53bc51&Ep=search:results:results%20page"},
{vehicle_title:"2015 BMW 750 I",picture: "http://img2.carmax.com/image/12521181/216/162",
options:"Navigation System, Leather Seats, Sunroof(s), Front Seat Heaters, Satellite Radio Ready, Memory Seat(s) more...",location:"Birmingham, AL",price:"$68,998*",stock_num:"12521181",miles:"9K",drive:"2WD",trans:"Automatic",mpg:"17/25",exterior_color:"White",interior_color:"Black","index":56,"url":"http://www.carmax.com/search?No=40&D=90&zip=23114&N=285&Us=15&Q=9dd60990-1ab0-4925-9b0b-603eee53bc51&Ep=search:results:results%20page"},
{vehicle_title:"2014 BMW M5",picture: "http://img2.carmax.com/image/12673747/216/162",
options:"Leather Seats, Navigation System, Sunroof(s), Rear Spoiler, Front Seat Heaters, Turbo Charged Engine more...",location:"Boynton Beach, FL",price:"$68,998*",stock_num:"12673747",miles:"15K",drive:"2WD",trans:"Automatic",mpg:"14/20",exterior_color:"White",interior_color:"Gray","index":57,"url":"http://www.carmax.com/search?No=40&D=90&zip=23114&N=285&Us=15&Q=9dd60990-1ab0-4925-9b0b-603eee53bc51&Ep=search:results:results%20page"},
{vehicle_title:"2015 Cadillac Escalade Luxury",picture: "http://img2.carmax.com/image/12671314/216/162",
options:"Leather Seats, 3rd Rear Seat, Sunroof(s), Navigation System, DVD Video System, Tow Hitch more...",location:"Jackson, MS",price:"$68,998*",stock_num:"12671314",miles:"25K",drive:"4WD",trans:"Automatic",mpg:"15/21",exterior_color:"Gold",interior_color:"Black","index":58,"url":"http://www.carmax.com/search?No=40&D=90&zip=23114&N=285&Us=15&Q=9dd60990-1ab0-4925-9b0b-603eee53bc51&Ep=search:results:results%20page"},
{vehicle_title:"2015 Cadillac Escalade Luxury",picture: "http://img2.carmax.com/image/12321932/216/162",
options:"Leather Seats, 3rd Rear Seat, Sunroof(s), Navigation System, DVD Video System, Tow Hitch more...",location:"Kansas City, KS",price:"$68,998*",stock_num:"12321932",miles:"28K",drive:"4WD",trans:"Automatic",mpg:"15/21",exterior_color:"Silver",interior_color:"Black","index":59,"url":"http://www.carmax.com/search?No=40&D=90&zip=23114&N=285&Us=15&Q=9dd60990-1ab0-4925-9b0b-603eee53bc51&Ep=search:results:results%20page"},
{vehicle_title:"2015 Cadillac Escalade Premium",picture: "http://img2.carmax.com/image/12709172/216/162",
options:"Leather Seats, 3rd Rear Seat, Sunroof(s), Navigation System, DVD Video System, Tow Hitch more...",location:"Austin, TX",price:"$68,998*",stock_num:"12709172",miles:"31K",drive:"4WD",trans:"Automatic",mpg:"15/21",exterior_color:"Gray",interior_color:"Brown","index":60,"url":"http://www.carmax.com/search?No=40&D=90&zip=23114&N=285&Us=15&Q=9dd60990-1ab0-4925-9b0b-603eee53bc51&Ep=search:results:results%20page"},
{vehicle_title:"2016 Jaguar F-Type S",picture: "http://img2.carmax.com/image/12730011/216/162",
options:"4WD/AWD, Navigation System, Front Seat Heaters, Rear Spoiler, Satellite Radio Ready, Memory Seat(s) more...",location:"Irvine, CA",price:"$68,998*",stock_num:"12730011",miles:"<1K",drive:"4WD",trans:"Automatic",mpg:"18/26",exterior_color:"Gray",interior_color:"Black","index":61,"url":"http://www.carmax.com/search?No=60&D=90&zip=23114&N=285&Us=15&Q=9dd60990-1ab0-4925-9b0b-603eee53bc51&Ep=search:results:results%20page"},
{vehicle_title:"2008 Porsche 911 Turbo",picture: "http://img2.carmax.com/image/12416845/216/162",
options:"Navigation System, Rear Spoiler, Front Seat Heaters, Turbo Charged Engine, BOSE Sound System, Alloy Wheels more...",location:"Buena Park, CA",price:"$68,998*",stock_num:"12416845",miles:"19K",drive:"4WD",trans:"Manual 6 Speed",mpg:"15/24",exterior_color:"Black",interior_color:"Black","index":62,"url":"http://www.carmax.com/search?No=60&D=90&zip=23114&N=285&Us=15&Q=9dd60990-1ab0-4925-9b0b-603eee53bc51&Ep=search:results:results%20page"},
{vehicle_title:"2014 BMW M5",picture: "http://img2.carmax.com/image/12479453/216/162",
options:"Leather Seats, Navigation System, Sunroof(s), Rear Spoiler, Front Seat Heaters, Turbo Charged Engine more...",location:"Inglewood, CA",price:"$68,998*",stock_num:"12479453",miles:"20K",drive:"2WD",trans:"Automatic",mpg:"14/20",exterior_color:"White",interior_color:"Black","index":63,"url":"http://www.carmax.com/search?No=60&D=90&zip=23114&N=285&Us=15&Q=9dd60990-1ab0-4925-9b0b-603eee53bc51&Ep=search:results:results%20page"},
{vehicle_title:"2013 Porsche 911 Carrera",picture: "http://img2.carmax.com/image/12738691/216/162",
options:"Premium Package, Leather Seats, Navigation System, Sunroof(s), Rear Spoiler, Front Seat Heaters more...",location:"Sacramento, CA",price:"$68,998*",stock_num:"12738691",miles:"6K",drive:"2WD",trans:"Manual 7 Speed",mpg:"19/27",exterior_color:"White",interior_color:"Black","index":64,"url":"http://www.carmax.com/search?No=60&D=90&zip=23114&N=285&Us=15&Q=9dd60990-1ab0-4925-9b0b-603eee53bc51&Ep=search:results:results%20page"},
{vehicle_title:"2015 BMW M4",picture: "http://img2.carmax.com/image/12417639/216/162",
options:"Leather Seats, Navigation System, Rear Spoiler, Front Seat Heaters, Turbo Charged Engine, Harman Kardon Sound more...",location:"Brandywine, MD",price:"$68,899*",stock_num:"12417639",miles:"3K",drive:"2WD",trans:"Manual 6 Speed",mpg:"17/26",exterior_color:"Orange",interior_color:"Red","index":65,"url":"http://www.carmax.com/search?No=60&D=90&zip=23114&N=285&Us=15&Q=9dd60990-1ab0-4925-9b0b-603eee53bc51&Ep=search:results:results%20page"},
{vehicle_title:"2015 BMW M3",picture: "http://img2.carmax.com/image/12114990/216/162",
options:"Leather Seats, Navigation System, Sunroof(s), Rear Spoiler, Front Seat Heaters, Turbo Charged Engine more...",location:"East Haven, CT",price:"$67,998*",stock_num:"12114990",miles:"4K",drive:"2WD",trans:"Automatic",mpg:"17/24",exterior_color:"White",interior_color:"Gray","index":66,"url":"http://www.carmax.com/search?No=60&D=90&zip=23114&N=285&Us=15&Q=9dd60990-1ab0-4925-9b0b-603eee53bc51&Ep=search:results:results%20page"},
{vehicle_title:"2013 Porsche Cayenne GTS",picture: "http://img2.carmax.com/image/12765544/216/162",
options:"Sunroof(s), Navigation System, Front Seat Heaters, 4WD/AWD, Auxiliary Audio Input, Rear View Camera more...",location:"Hartford, CT",price:"$67,998*",stock_num:"12765544",miles:"21K",drive:"4WD",trans:"Automatic",mpg:"15/21",exterior_color:"Red",interior_color:"Tan","index":67,"url":"http://www.carmax.com/search?No=60&D=90&zip=23114&N=285&Us=15&Q=9dd60990-1ab0-4925-9b0b-603eee53bc51&Ep=search:results:results%20page"},
{vehicle_title:"2014 Mercedes-Benz SL550",picture: "http://img2.carmax.com/image/12782103/216/162",
options:"Sport Package, Leather Seats, Navigation System, Front Seat Heaters, Turbo Charged Engine, Harman Kardon Sound more...",location:"Tampa, FL",price:"$67,998*",stock_num:"12782103",miles:"14K",drive:"2WD",trans:"Automatic",mpg:"18/25",exterior_color:"Silver",interior_color:"Black","index":68,"url":"http://www.carmax.com/search?No=60&D=90&zip=23114&N=285&Us=15&Q=9dd60990-1ab0-4925-9b0b-603eee53bc51&Ep=search:results:results%20page"},
{vehicle_title:"2014 Mercedes-Benz S550",picture: "http://img2.carmax.com/image/12713623/216/162",
options:"Sport Package, Premium Package, Adjustable Suspension, Navigation System, Leather Seats, Front Seat Heaters more...",location:"Irving, TX",price:"$67,998*",stock_num:"12713623",miles:"48K",drive:"2WD",trans:"Automatic",mpg:"Not Available",exterior_color:"White",interior_color:"Tan","index":69,"url":"http://www.carmax.com/search?No=60&D=90&zip=23114&N=285&Us=15&Q=9dd60990-1ab0-4925-9b0b-603eee53bc51&Ep=search:results:results%20page"},
{vehicle_title:"2013 Mercedes-Benz SL550",picture: "http://img2.carmax.com/image/12339937/216/162",
options:"Premium Package, Leather Seats, Navigation System, Front Seat Heaters, Turbo Charged Engine, Hard Top more...",location:"Houston, TX",price:"$67,998*",stock_num:"12339937",miles:"11K",drive:"2WD",trans:"Automatic",mpg:"17/25",exterior_color:"Gray",interior_color:"Black","index":70,"url":"http://www.carmax.com/search?No=60&D=90&zip=23114&N=285&Us=15&Q=9dd60990-1ab0-4925-9b0b-603eee53bc51&Ep=search:results:results%20page"},
{vehicle_title:"2015 BMW M4",picture: "http://img2.carmax.com/image/12591089/216/162",
options:"Leather Seats, Navigation System, Sunroof(s), Rear Spoiler, Front Seat Heaters, Turbo Charged Engine more...",location:"Ontario, CA",price:"$67,998*",stock_num:"12591089",miles:"6K",drive:"2WD",trans:"Automatic",mpg:"17/24",exterior_color:"Silver",interior_color:"White","index":71,"url":"http://www.carmax.com/search?No=60&D=90&zip=23114&N=285&Us=15&Q=9dd60990-1ab0-4925-9b0b-603eee53bc51&Ep=search:results:results%20page"},
{vehicle_title:"2015 BMW M4",picture: "http://img2.carmax.com/image/12480206/216/162",
options:"Leather Seats, Navigation System, Sunroof(s), Rear Spoiler, Front Seat Heaters, Turbo Charged Engine more...",location:"San Diego, CA",price:"$67,998*",stock_num:"12480206",miles:"4K",drive:"2WD",trans:"Automatic",mpg:"17/24",exterior_color:"Black",interior_color:"Black","index":72,"url":"http://www.carmax.com/search?No=60&D=90&zip=23114&N=285&Us=15&Q=9dd60990-1ab0-4925-9b0b-603eee53bc51&Ep=search:results:results%20page"},
{vehicle_title:"2013 Porsche 911 Carrera",picture: "http://img2.carmax.com/image/12341740/216/162",
options:"Premium Package, Leather Seats, Navigation System, Sunroof(s), Rear Spoiler, Front Seat Heaters more...",location:"Irvine, CA",price:"$67,998*",stock_num:"12341740",miles:"17K",drive:"2WD",trans:"Manual 7 Speed",mpg:"19/27",exterior_color:"Brown",interior_color:"Tan","index":73,"url":"http://www.carmax.com/search?No=60&D=90&zip=23114&N=285&Us=15&Q=9dd60990-1ab0-4925-9b0b-603eee53bc51&Ep=search:results:results%20page"},
{vehicle_title:"2013 Porsche 911 Carrera S",picture: "http://img2.carmax.com/image/12592309/216/162",
options:"Sport Package, Leather Seats, Navigation System, Rear Spoiler, Front Seat Heaters, BOSE Sound System more...",location:"Irvine, CA",price:"$67,998*",stock_num:"12592309",miles:"49K",drive:"2WD",trans:"Automatic",mpg:"19/27",exterior_color:"White",interior_color:"Gray","index":74,"url":"http://www.carmax.com/search?No=60&D=90&zip=23114&N=285&Us=15&Q=9dd60990-1ab0-4925-9b0b-603eee53bc51&Ep=search:results:results%20page"},
{vehicle_title:"2016 Porsche Cayenne",picture: "http://img2.carmax.com/image/12747989/216/162",
options:"Leather Seats, Navigation System, Front Seat Heaters, 4WD/AWD, Auxiliary Audio Input, Cruise Control more...",location:"Irvine, CA",price:"$67,998*",stock_num:"12747989",miles:"10K",drive:"4WD",trans:"Automatic",mpg:"19/24",exterior_color:"White",interior_color:"Tan","index":75,"url":"http://www.carmax.com/search?No=60&D=90&zip=23114&N=285&Us=15&Q=9dd60990-1ab0-4925-9b0b-603eee53bc51&Ep=search:results:results%20page"},
{vehicle_title:"2016 Lexus LS 460",picture: "http://img2.carmax.com/image/12834578/216/162",
options:"Navigation System, Sunroof(s), Front Seat Heaters, Satellite Radio Ready, Memory Seat(s), Cruise Control more...",location:"Duarte, CA",price:"$67,998*",stock_num:"12834578",miles:"5K",drive:"2WD",trans:"Automatic",mpg:"16/24",exterior_color:"Black",interior_color:"Tan","index":76,"url":"http://www.carmax.com/search?No=60&D=90&zip=23114&N=285&Us=15&Q=9dd60990-1ab0-4925-9b0b-603eee53bc51&Ep=search:results:results%20page"},
{vehicle_title:"2015 BMW M4",picture: "http://img2.carmax.com/image/12867328/216/162",
options:"Leather Seats, Navigation System, Sunroof(s), Rear Spoiler, Front Seat Heaters, Turbo Charged Engine more...",location:"Buena Park, CA",price:"$67,998*",stock_num:"12867328",miles:"3K",drive:"2WD",trans:"Manual 6 Speed",mpg:"17/26",exterior_color:"White",interior_color:"Black","index":77,"url":"http://www.carmax.com/search?No=60&D=90&zip=23114&N=285&Us=15&Q=9dd60990-1ab0-4925-9b0b-603eee53bc51&Ep=search:results:results%20page"},
{vehicle_title:"2013 BMW M6",picture: "http://img2.carmax.com/image/12691541/216/162",
options:"Leather Seats, Navigation System, Front Seat Heaters, Turbo Charged Engine, Alloy Wheels, Traction Control more...",location:"Raleigh, NC",price:"$66,998*",stock_num:"12691541",miles:"20K",drive:"2WD",trans:"Automatic",mpg:"14/20",exterior_color:"Gray",interior_color:"Black","index":78,"url":"http://www.carmax.com/search?No=60&D=90&zip=23114&N=285&Us=15&Q=9dd60990-1ab0-4925-9b0b-603eee53bc51&Ep=search:results:results%20page"},
{vehicle_title:"2014 BMW M5",picture: "http://img2.carmax.com/image/11996438/216/162",
options:"Leather Seats, Navigation System, Sunroof(s), Rear Spoiler, Front Seat Heaters, Turbo Charged Engine more...",location:"Stockbridge, GA",price:"$66,998*",stock_num:"11996438",miles:"18K",drive:"2WD",trans:"Automatic",mpg:"14/20",exterior_color:"Black",interior_color:"Black","index":79,"url":"http://www.carmax.com/search?No=60&D=90&zip=23114&N=285&Us=15&Q=9dd60990-1ab0-4925-9b0b-603eee53bc51&Ep=search:results:results%20page"},
{vehicle_title:"2013 Mercedes-Benz SL550",picture: "http://img2.carmax.com/image/12813000/216/162",
options:"Premium Package, Adjustable Suspension, Leather Seats, Navigation System, Front Seat Heaters, Turbo Charged Engine more...",location:"Stockbridge, GA",price:"$66,998*",stock_num:"12813000",miles:"10K",drive:"2WD",trans:"Automatic",mpg:"17/25",exterior_color:"Gray",interior_color:"Gray","index":80,"url":"http://www.carmax.com/search?No=60&D=90&zip=23114&N=285&Us=15&Q=9dd60990-1ab0-4925-9b0b-603eee53bc51&Ep=search:results:results%20page"},
{vehicle_title:"2014 Mercedes-Benz SL550",picture: "http://img2.carmax.com/image/12673838/216/162",
options:"Sport Package, Leather Seats, Navigation System, Front Seat Heaters, Turbo Charged Engine, Hard Top more...",location:"Naples, FL",price:"$66,998*",stock_num:"12673838",miles:"13K",drive:"2WD",trans:"Automatic",mpg:"18/25",exterior_color:"Silver",interior_color:"Black","index":81,"url":"http://www.carmax.com/search?No=80&D=90&zip=23114&N=285&Us=15&Q=9dd60990-1ab0-4925-9b0b-603eee53bc51&Ep=search:results:results%20page"},
{vehicle_title:"2013 Mercedes-Benz SL550",picture: "http://img2.carmax.com/image/12584721/216/162",
options:"Premium Package, Adjustable Suspension, Leather Seats, Navigation System, Front Seat Heaters, Turbo Charged Engine more...",location:"Dallas, TX",price:"$66,998*",stock_num:"12584721",miles:"9K",drive:"2WD",trans:"Automatic",mpg:"17/25",exterior_color:"Black",interior_color:"Black","index":82,"url":"http://www.carmax.com/search?No=80&D=90&zip=23114&N=285&Us=15&Q=9dd60990-1ab0-4925-9b0b-603eee53bc51&Ep=search:results:results%20page"},
{vehicle_title:"2011 Porsche Panamera Turbo",picture: "http://img2.carmax.com/image/12785574/216/162",
options:"Sport Package, Adjustable Suspension, 4WD/AWD, Navigation System, Sunroof(s), Front Seat Heaters more...",location:"Houston, TX",price:"$66,998*",stock_num:"12785574",miles:"46K",drive:"4WD",trans:"Automatic",mpg:"15/23",exterior_color:"Black",interior_color:"Black","index":83,"url":"http://www.carmax.com/search?No=80&D=90&zip=23114&N=285&Us=15&Q=9dd60990-1ab0-4925-9b0b-603eee53bc51&Ep=search:results:results%20page"},
{vehicle_title:"2011 Porsche Panamera Turbo",picture: "http://img2.carmax.com/image/12232981/216/162",
options:"Sport Package, Adjustable Suspension, 4WD/AWD, Navigation System, Leather Seats, Sunroof(s) more...",location:"San Antonio, TX",price:"$66,998*",stock_num:"12232981",miles:"42K",drive:"4WD",trans:"Automatic",mpg:"15/23",exterior_color:"Silver",interior_color:"Gray","index":84,"url":"http://www.carmax.com/search?No=80&D=90&zip=23114&N=285&Us=15&Q=9dd60990-1ab0-4925-9b0b-603eee53bc51&Ep=search:results:results%20page"},
{vehicle_title:"2012 Land Rover Range Rover Autobiography",picture: "http://img2.carmax.com/image/12732997/216/162",
options:"Special Edition, Sunroof(s), Navigation System, DVD Video System, Front Seat Heaters, 4WD/AWD more...",location:"Irvine, CA",price:"$66,998*",stock_num:"12732997",miles:"27K",drive:"4WD",trans:"Automatic",mpg:"Not Available",exterior_color:"Black",interior_color:"Black","index":85,"url":"http://www.carmax.com/search?No=80&D=90&zip=23114&N=285&Us=15&Q=9dd60990-1ab0-4925-9b0b-603eee53bc51&Ep=search:results:results%20page"},
{vehicle_title:"2012 Porsche 911 Carrera S",picture: "http://img2.carmax.com/image/11499195/216/162",
options:"Premium Package, Leather Seats, Navigation System, Rear Spoiler, Alloy Wheels, Traction Control more...",location:"Duarte, CA",price:"$66,998*",stock_num:"11499195",miles:"30K",drive:"2WD",trans:"Manual 7 Speed",mpg:"19/27",exterior_color:"White",interior_color:"Tan","index":86,"url":"http://www.carmax.com/search?No=80&D=90&zip=23114&N=285&Us=15&Q=9dd60990-1ab0-4925-9b0b-603eee53bc51&Ep=search:results:results%20page"},
{vehicle_title:"2015 BMW M4",picture: "http://img2.carmax.com/image/12793220/216/162",
options:"Leather Seats, Navigation System, Rear Spoiler, Front Seat Heaters, Turbo Charged Engine, Alloy Wheels more...",location:"Costa Mesa, CA",price:"$66,998*",stock_num:"12793220",miles:"5K",drive:"2WD",trans:"Automatic",mpg:"17/24",exterior_color:"Yellow",interior_color:"Black","index":87,"url":"http://www.carmax.com/search?No=80&D=90&zip=23114&N=285&Us=15&Q=9dd60990-1ab0-4925-9b0b-603eee53bc51&Ep=search:results:results%20page"},
{vehicle_title:"2014 Lexus LX 570",picture: "http://img2.carmax.com/image/12542120/216/162",
options:"Leather Seats, 3rd Rear Seat, Sunroof(s), Navigation System, DVD Video System, Tow Hitch more...",location:"Los Angeles, CA",price:"$66,998*",stock_num:"12542120",miles:"27K",drive:"4WD",trans:"Automatic",mpg:"12/17",exterior_color:"White",interior_color:"Tan","index":88,"url":"http://www.carmax.com/search?No=80&D=90&zip=23114&N=285&Us=15&Q=9dd60990-1ab0-4925-9b0b-603eee53bc51&Ep=search:results:results%20page"},
{vehicle_title:"2016 Chevrolet Corvette Stingray Z51",picture: "http://img2.carmax.com/image/12567251/216/162",
options:"Leather Seats, Navigation System, Rear Spoiler, Front Seat Heaters, BOSE Sound System, Alloy Wheels more...",location:"Jacksonville, FL",price:"$65,998*",stock_num:"12567251",miles:"<1K",drive:"2WD",trans:"Automatic",mpg:"16/29",exterior_color:"Black",interior_color:"Black","index":89,"url":"http://www.carmax.com/search?No=80&D=90&zip=23114&N=285&Us=15&Q=9dd60990-1ab0-4925-9b0b-603eee53bc51&Ep=search:results:results%20page"},
{vehicle_title:"2015 Jaguar F-Type S",picture: "http://img2.carmax.com/image/12347543/216/162",
options:"Adjustable Suspension, Navigation System, Leather Seats, Front Seat Heaters, Rear Spoiler, Satellite Radio Ready more...",location:"Tinley Park, IL",price:"$65,998*",stock_num:"12347543",miles:"15K",drive:"2WD",trans:"Automatic",mpg:"16/23",exterior_color:"Black",interior_color:"Black","index":90,"url":"http://www.carmax.com/search?No=80&D=90&zip=23114&N=285&Us=15&Q=9dd60990-1ab0-4925-9b0b-603eee53bc51&Ep=search:results:results%20page"},
{vehicle_title:"2014 Lexus LX 570",picture: "http://img2.carmax.com/image/12501913/216/162",
options:"Leather Seats, 3rd Rear Seat, Sunroof(s), Navigation System, DVD Video System, Tow Hitch more...",location:"Naperville, IL",price:"$65,998*",stock_num:"12501913",miles:"21K",drive:"4WD",trans:"Automatic",mpg:"12/17",exterior_color:"Red",interior_color:"Tan","index":91,"url":"http://www.carmax.com/search?No=80&D=90&zip=23114&N=285&Us=15&Q=9dd60990-1ab0-4925-9b0b-603eee53bc51&Ep=search:results:results%20page"},
{vehicle_title:"2011 Porsche 911 Carrera S",picture: "http://img2.carmax.com/image/12727654/216/162",
options:"Leather Seats, Navigation System, Front Seat Heaters, BOSE Sound System, Alloy Wheels, Traction Control more...",location:"Irving, TX",price:"$65,998*",stock_num:"12727654",miles:"16K",drive:"2WD",trans:"Manual 6 Speed",mpg:"18/26",exterior_color:"Blue",interior_color:"Black","index":92,"url":"http://www.carmax.com/search?No=80&D=90&zip=23114&N=285&Us=15&Q=9dd60990-1ab0-4925-9b0b-603eee53bc51&Ep=search:results:results%20page"},
{vehicle_title:"2015 BMW 740 Li",picture: "http://img2.carmax.com/image/12253578/216/162",
options:"Navigation System, Leather Seats, Sunroof(s), Front Seat Heaters, Satellite Radio Ready, Memory Seat(s) more...",location:"Houston, TX",price:"$65,998*",stock_num:"12253578",miles:"20K",drive:"2WD",trans:"Automatic",mpg:"19/29",exterior_color:"Black",interior_color:"Black","index":93,"url":"http://www.carmax.com/search?No=80&D=90&zip=23114&N=285&Us=15&Q=9dd60990-1ab0-4925-9b0b-603eee53bc51&Ep=search:results:results%20page"},
{vehicle_title:"2013 Mercedes-Benz SL550",picture: "http://img2.carmax.com/image/12299974/216/162",
options:"Premium Package, Leather Seats, Navigation System, Front Seat Heaters, Turbo Charged Engine, Panoramic Sunroof more...",location:"Houston, TX",price:"$65,998*",stock_num:"12299974",miles:"4K",drive:"2WD",trans:"Automatic",mpg:"17/25",exterior_color:"Black",interior_color:"Black","index":94,"url":"http://www.carmax.com/search?No=80&D=90&zip=23114&N=285&Us=15&Q=9dd60990-1ab0-4925-9b0b-603eee53bc51&Ep=search:results:results%20page"},
{vehicle_title:"2015 BMW X5 XDrive50i",picture: "http://img2.carmax.com/image/12412468/216/162",
options:"Cold Weather Package, Leather Seats, 3rd Rear Seat, Navigation System, Front Seat Heaters, 4WD/AWD more...",location:"Albuquerque, NM",price:"$65,998*",stock_num:"12412468",miles:"6K",drive:"4WD",trans:"Automatic",mpg:"15/22",exterior_color:"Gray",interior_color:"Black","index":95,"url":"http://www.carmax.com/search?No=80&D=90&zip=23114&N=285&Us=15&Q=9dd60990-1ab0-4925-9b0b-603eee53bc51&Ep=search:results:results%20page"},
{vehicle_title:"2015 BMW M4",picture: "http://img2.carmax.com/image/11774908/216/162",
options:"Adjustable Suspension, Leather Seats, Navigation System, Rear Spoiler, Front Seat Heaters, Turbo Charged Engine more...",location:"Phoenix, AZ",price:"$65,998*",stock_num:"11774908",miles:"11K",drive:"2WD",trans:"Automatic",mpg:"17/24",exterior_color:"Blue",interior_color:"Red","index":96,"url":"http://www.carmax.com/search?No=80&D=90&zip=23114&N=285&Us=15&Q=9dd60990-1ab0-4925-9b0b-603eee53bc51&Ep=search:results:results%20page"},
{vehicle_title:"2015 BMW 640 I",picture: "http://img2.carmax.com/image/12456139/216/162",
options:"Navigation System, Leather Seats, Front Seat Heaters, Satellite Radio Ready, Memory Seat(s), Cruise Control more...",location:"Las Vegas, NV",price:"$65,998*",stock_num:"12456139",miles:"9K",drive:"2WD",trans:"Automatic",mpg:"20/31",exterior_color:"Black",interior_color:"Black","index":97,"url":"http://www.carmax.com/search?No=80&D=90&zip=23114&N=285&Us=15&Q=9dd60990-1ab0-4925-9b0b-603eee53bc51&Ep=search:results:results%20page"},
{vehicle_title:"2014 Audi RS5",picture: "http://img2.carmax.com/image/12078259/216/162",
options:"4WD/AWD, Navigation System, Leather Seats, Front Seat Heaters, Rear Spoiler, Satellite Radio Ready more...",location:"Irvine, CA",price:"$65,998*",stock_num:"12078259",miles:"8K",drive:"4WD",trans:"Automatic",mpg:"16/22",exterior_color:"Gray",interior_color:"Black","index":98,"url":"http://www.carmax.com/search?No=80&D=90&zip=23114&N=285&Us=15&Q=9dd60990-1ab0-4925-9b0b-603eee53bc51&Ep=search:results:results%20page"},
{vehicle_title:"2015 BMW M4",picture: "http://img2.carmax.com/image/12729168/216/162",
options:"Leather Seats, Navigation System, Rear Spoiler, Front Seat Heaters, Turbo Charged Engine, Harman Kardon Sound more...",location:"Irvine, CA",price:"$65,998*",stock_num:"12729168",miles:"2K",drive:"2WD",trans:"Manual 6 Speed",mpg:"Not Available",exterior_color:"Yellow",interior_color:"Black","index":99,"url":"http://www.carmax.com/search?No=80&D=90&zip=23114&N=285&Us=15&Q=9dd60990-1ab0-4925-9b0b-603eee53bc51&Ep=search:results:results%20page"},
{vehicle_title:"2013 Porsche 911 Carrera",picture: "http://img2.carmax.com/image/12661533/216/162",
options:"Premium Package, Leather Seats, Navigation System, Rear Spoiler, Front Seat Heaters, BOSE Sound System more...",location:"Irvine, CA",price:"$65,998*",stock_num:"12661533",miles:"12K",drive:"2WD",trans:"Automatic",mpg:"20/28",exterior_color:"Black",interior_color:"Black","index":100,"url":"http://www.carmax.com/search?No=80&D=90&zip=23114&N=285&Us=15&Q=9dd60990-1ab0-4925-9b0b-603eee53bc51&Ep=search:results:results%20page"}
];


    /*      $scope.addCards = function(count) {
    $http.get('http://api.randomuser.me/?results=' + count).then(function(value) {
      angular.forEach(value.data.results, function (v) {
        $scope.addCard(v.user.picture.medium, v.user.email);
      });
      $scope.showCards = true;
    });
  };*/


 /*$scope.test = function () {
    url = "https://www.kimonolabs.com/api/bzq274q4?apikey=2RDsgK4l1iZS8H71yc9GgF2gDFQvSZtm&callback=JSON_CALLBACK";
    $http.jsonp(url).
    success(function (data) {
        $scope.data = data['results']['collection1'];
        var test = $scope.date;
        console.log(test);
    });
}*/
/*$scope.test2 = function(data){
$http.jsonp('https://www.kimonolabs.com/api/digje55k?apikey=3zsESu0rlVqMIdxZyJfkGDiE53haDcZ2&callback=JSON_CALLBACK')
.success(function(resp) {
console.log('Success', resp.results);
$scope.news = resp.results.MaritimeNews; 
}, function(err) {
console.error('ERR',err);
})
};*/

/*$http.jsonp('https://www.kimonolabs.com/api/digje55k?apikey=3zsESu0rlVqMIdxZyJfkGDiE53haDcZ2&callback=JSON_CALLBACK')
.success(function(resp) {
console.log('Success', resp.results);
$scope.data = [];
$scope.data = resp.results; 
console.log($scope.data);
var data = $scope.data;
$scope.cars = [];
for(var i in data) {
        $scope.cars[+i] = data[i];
        console.log($scope.cars);
    console.log(data);
    console.log($scope.cars);
}
}, function(err) {
console.error('ERR',err);
});*/


        /*$scope.getCards = function() {
            $scope.pulse = true;
            $timeout(function() 
            {
              $http.jsonp('https://www.kimonolabs.com/api/digje55k?apikey=3zsESu0rlVqMIdxZyJfkGDiE53haDcZ2&callback=JSON_CALLBACK')
                .success(function(resp) 
                {
                  console.log('Success', resp.results);
                  $scope.data = resp.results; 
                  console.log($scope.data);
                  for(var i in $scope.data) 
                  {
                      var cars = "";
                      cars[+i] = $scope.data[i];

                      console.log($scope.data);
                  }

                  angular.forEach($scope.data, function(card) 
                  {
                    $scope.cards.push(card);
                  });
                  console.log($scope.cards);
                }
              ,function(err) 
              {
                console.error('ERR',err);
                console.log($scope.cards);
                console.log($scope.cars);
              });
                $scope.pulse = false;
            }, 1700);
        };*/

        $scope.getCards = function() {
            $scope.pulse = true;
            $timeout(function() {
                angular.forEach($scope.list, function(card) {
                    $scope.cards.push(card);
                });
                $scope.pulse = false;
            }, 1700);
        };

        $scope.remove = function(index) {
            $scope.cards.splice(index, 1);
            if($scope.cards.length <= 0) {
                $scope.getCards();
            }
        };

        $scope.reject = function(index) {
            console.log('LEFT SWIPE');
        };

        $scope.like = function(index) {
            console.log('RIGHT SWIPE');
        };

        $scope.swipeLeft = function() {
            TDCardDelegate.$getByHandle('cards').getFirstCard().swipe('left');
        };

        $scope.swipeRight = function() {
            TDCardDelegate.$getByHandle('cards').getFirstCard().swipe('right');
        };

       /* $scope.create = function() {
          .then(function(result) {
            if(result !== "") {
                if($scope.data.hasOwnProperty("todos") !== true) {
                    $scope.data.todos = [];
                }
                $scope.data.todos.push({title: result});
            } else {
                console.log("Action not completed");
          }
    });
        };*/

        $scope.getCards();
    });