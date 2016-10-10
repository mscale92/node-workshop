//1. Create a program that outputs a string to the console, then ten seconds later
//it outputs another string

console.log("hello world");

setTimeout(function(){
    console.log("hello world again!!");
},10000);


//2.Use setTimeout to recursively write a program that spits out
//hello world every ten seconds forever! no whiles

function overAndover(){setTimeout(function(){
    console.log("hello world");
    overAndover();
},10000);
};
//classic recursion, a function calling upon itself. In this case, forever.
overAndover();
//have to call the function so that it will run infinitely