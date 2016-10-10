//Write a node program that takes the lon and lat from the 
//international space station via api
//don't forget to inspect element to find out where the data
//you need is stored on the webpage, otherwise you'll
//get a big ole mess of html!

//one more thing, you will need to install the request module
//type npm install request into the console to download the library

var request = require('request');

request('http://api.open-notify.org/iss-now.json', function(err, data){
   //the request function takes a url then a callback function
   if(err){
       console.log("there was an error");
   }
   //with node programming we need to have something execute if the
   //error parameter, err, occurs
   else{
       var answer = JSON.parse(data.body);
       //data is our webpage, we're then accessing the body of the html where
       //our data lives
       //JSON.parse translates the output string into an object
       console.log(answer.iss_position);
       //we console.log our answer variable, which is equal to our object that
       //JSON extracted from the ouput string
       //.iss_position is where longitude and latitude live, the api doc
       //told us this
   }
   //the else is what will happen if our data is correctly accessed
});

