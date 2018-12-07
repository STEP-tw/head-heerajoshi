const {readFileSync,existsSync} = require('fs');
const {getlines,getCharactor,head} = require('./src/headLibrary.js');
const {inputSeparator} = require('./src/utilLib.js') 
let userInput = process.argv.slice(2)
const main = function(){
  let inputs = inputSeparator(userInput);
  console.log(head(readFileSync,existsSync,inputs));
};

main();

