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
        console.log(d);
    };
    //end of finding the distance difference haversine formula
    //lat2 & lon2 should be the space station since the formula subs 1 from 2
    
    

    function lonLatData(callback){    
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
                
                request(location, function(err, data){
                    if(err){
                        console.log("err");
                    }
                    else{
                        var parsed = JSON.parse(data.body);
                        //parsed data is when JSON converts an output string into an object
                        
                        var userLonLatObj = parsed.results[0].geometry.location;
                        //this is our user longitude latitude object with both values inside
                            
                        request('http://api.open-notify.org/iss-now.json', function(err, data){
                               if(err){
                                   console.log("there was an error");
                               }
                               
                               else{
                                    var position = JSON.parse(data.body);
                                    var issLonLatObj = position.iss_position;
                                    
                                    
                                    callback(issLonLatObj, userLonLatObj);
                                    //IMPORTANT!
                                    //this is our callback parameter in action
                                    //it takes the iss obj first then the user objet
                                }
                               
                        });
                        //end of request for iss data
                        //we have the request for iss data nested so that our callback function
                        //can access both locations' object data.

                    }
                    //end of else statement for user location data
                    
                });
                //end of request to google maps api
                //the request function finds the lon and lat of the user's inputted
                //location by using the concated string location
                //it then parses the data
                //then it accesses the lon and lat obj via the nested objects path
    
            }
            //we need to access the answer that the user gave us to a specific string
            //this else statement is taking the userInput value for the prompted string
            //and using concat to add it to our googleMapUrl string.
            
            //bracket notation, userInput[""]; is the safer option since some prompt strings will not
            //always be one word
        });
        //end of prompt function
        //the prompt function asks the user for an input, in this case the user's location
    
    }
    //end of lonLatData function
    //this function prompts the user for their location,
    //then requests the lon lat data on the user
    //then request the lon lat data on the iss
    
    function callbackResults(issObj, userObj){
        var lat1 = issObj.latitude; 
        var lon1 = issObj.longitude;
        
        var lat2 = userObj.lat;
        var lon2 = userObj.lng;
        
        distanceDifference(lat1, lat2, lon1, lon2);
        //remember, it's 2 minus 1
        // distanceDifference(lat1,lat2,lon1,lon2)
        //a reminder of the parameters.
        
        
    }
    //our callbackResults is a callback function
    //it is used to grab the objects that contain lon and lat data for
    //both the iss and the user so that the distanceDifference function
    //can use the data to calculate the difference
    
    lonLatData(callbackResults);
};    

//end of distanceIss function
//calculates the distance between a user and the international space station


