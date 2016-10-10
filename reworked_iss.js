//Reworked iss_augmented.js without nesting

//Tell the user how far the iss is from them, interesting...



var request = require('request');
var prompt = require('prompt');
//this is the line that accesses our module info after installing the mod

function distanceIss(){
    
    function distanceDifference(lat1,lat2,lon1,lon2){
        Number.prototype.toRadians = function() {
            return this * Math.PI / 180;
        }
        //converts degrees to radians
        
        var R = 6371e3; // metres
        var φ1 = lat1.toRadians();
        var φ2 = lat2.toRadians();
        var Δφ = (lat2-lat1).toRadians();
        var Δλ = (lon2-lon1).toRadians();
    
        var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
                Math.cos(φ1) * Math.cos(φ2) *
                Math.sin(Δλ/2) * Math.sin(Δλ/2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    
        var d = R * c;
        console.log("You are " + d + " km in great circle distance from the International Space Station!");
    };
    //end of finding the distance difference haversine formula
    //lat2 & lon2 should be the space station since the formula subs 1 from 2
    
    

    function userAddress(callback){    
        prompt.get("enter your location",function(err, userInput){
            //the .get is crucial, it tells prompt to get the input from asking the following
            //string
            
            if(err){
                console.log("uh-oh, there's an error!");
            }
            //in case there is an error
            
            
            else{
                var googleMapUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address='
                //this is our url to google maps' api information
                //we will use this to find out the lat lon of the user's location
                
                var noSpaces = userInput["enter your location"].split('');
                noSpaces = noSpaces.join('');
                //These two lines convert the userInput string into an array and back into a string
                //Why? well to any errors in location if the user enters a location separated by a space.
                
                var location = googleMapUrl.concat(noSpaces);
                //here we combine the map url string and the no spaces string
                //this puts the name of the location at the end of the url 
                //the url address will now pull up all the data for whatever location the user is accessing.
            
                callback(location);  
                //callback
                //userCoordinates needs the location variable that contains the modified url
            }
        });
    }
    //end of userAddress
    
    function userCoordinates(location, callback){
        request(location, function(err, data){
            if(err){
                console.log("err");
            }
            else{
                var parsed = JSON.parse(data.body);
                //parsed data is when JSON converts an output string into an object
                
                var userLonLatObj = parsed.results[0].geometry.location;
                //this is our user longitude latitude object with both values inside

                var userlat = userLonLatObj.lat;
                var userlon = userLonLatObj.lng;
                
                console.log("red");
                callback(userlat, userlon);
            }
        });
    }
    //end of userCoordinates
    
    function issCoordinates(callback){
        request('http://api.open-notify.org/iss-now.json', function(err, data){
               if(err){
                   console.log("there was an error");
               }
               
               else{
                    var position = JSON.parse(data.body);
                    var issLonLatObj = position.iss_position;
                    
                    var isslon = issLonLatObj.longitude;
                    var isslat = issLonLatObj.latitude;
                    
                    console.log("blue");
                    callback(isslat, isslon);
                }
               
        });
    }
//end of issCoordinates

//proper callback structure
userAddress(function(location){
    //userAddress takes a callback function and gives it the location as its parameter
    //from userAddress as its parameter
    userCoordinates(location, function(userlon, userlat) {
        //userCoordinates takes location from userAddress and then
        //a callback function that takes the userlon and userlat from userCoordinates
        //as its parameters
        issCoordinates(function(isslon, isslat) {
            //issCoordinates takes a callback function and gives it the isslon and isslat 
            //values from issCoordinates
            distanceDifference(isslat,userlat,isslon,userlon);
                //distanceDifference takes all four data points and computes the difference
                //of the distance
    
        })
         
    })
})

//first attempt at callbacks
// function userData(userlat, userlon){
//       issCoordinates(issData);
//       function issData(isslat, isslon){
//           console.log("green", isslat, userlat);
//           distanceDifference(isslat,userlat,isslon,userlon);
//       }
// }
    

    
};    

//end of distanceIss function
//calculates the distance between a user and the international space station

distanceIss();