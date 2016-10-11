//Number Guessing Game

function guessingGame(){
    
    
    var prompt = require('prompt');
    
    function randomNumber(callback){
        var randomNum = Math.floor(Math.random() * 101);
        var idx = 0;
        callback(randomNum, idx);
        
    }
//end of randomNumber function
//makes a random number value 0-100, 100 included


function guess(randomNum, idx){
    prompt.get("Guess the number", function(err, userInput){
        //prompt takes userInput as an object with the key of the string and the value
        //of the input
        var userNum = parseInt(userInput["Guess the number"]);
        
        if(err){
            console.log("server error");
        }
        //checking for errors
       
        else{
            if(userNum > randomNum){
                console.log(userNum + " is too big, guess again!");
                ++idx;
                //increase counter
                if(idx > 3){
                    console.log("Ah sorry, four guesses is the max. The number was " + randomNum)
                    return;
                }
                //stops the program after four guesses.
                
                guess(randomNum, idx);
                //calls the function on itself so that the game continues,
                //recursion!
            }
            else if (userNum < randomNum){
                console.log(userNum + " is too small, try again!");
                ++idx;
                if(idx > 3){
                    console.log("Ah sorry, four guesses is the max. The number was " + randomNum)
                    return;
                }
                //stops the program after four guesses
                
                guess(randomNum, idx);
                //recursively calls upon the function
            }
            else if(userNum === randomNum){
                console.log("Whoa you got it! Congratulations ^_^");
                return;
                //ends if the correct number is guessed
            }
            else{
                console.log("That's not a number! But " + randomNum + " was the number");
                return;
                //fail safe to find out the random number/to stop the program
                //enter anything except a number.
            }
        }
    });
}
//end of guess function

randomNumber(function(randomNum, idx){
    guess(randomNum, idx);
});
//end of randomNumber
//callback nests


};
//end of guessing game function

guessingGame();