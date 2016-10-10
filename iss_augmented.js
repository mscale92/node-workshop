//Tell the user how far the iss is from them, interesting...



var request = require('request');
var prompt = require('prompt');
//this is the line that accesses our module info after installing the mod


function distanceIss(){
    prompt.get("enter your location",function(err, userInput){
        //the .get is crucial, it tells prompt to get the input from asking the following
        //string
        if(err){
            console.log("uh-oh, there's an error!");
        }
        //in case there is an error
        else{
            var googleMapUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address='
            var location = googleMapUrl.concat(userInput["enter your location"]);
            
            console.log(location);
            request(location, function(err, data){
                if(err){
                    console.log("err");
                }
                else{
                    var result = JSON.parse(data.body);
                    var mapArray = result.results;
                    var lonLatObj = mapArray[0].geometry.location;
                    console.log(lonLatObj);
                }
            });
        }
        //we need to access the answer that the user gave us to a specific string
        //this else statement is taking the userInput value for the prompted string
        //and using concat to add it to our googleMapUrl string.
        
        //bracket notation, userInput[""]; is the safer option since some prompt strings will not
        //always be one word
    });
    //end of prompt function
    //the prompt function asks the user for an input, in this case the user's location
    
};
//end of distanceIss function
//calculates the distance between a user and the international space station



//object.results, then an array with only one object
//var objArray = object.results
//objArray[0].geometry.location
//this is where the lat and lon object dwells