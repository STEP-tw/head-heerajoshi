const {readFileSync,existsSync} = require('fs');
const {getlines,getCharactor,head} = require('./src/headLibrary.js');
const {inputSeparator} = require('./src/utilLib.js') 
const main = function(){
  let userInput = process.argv.slice(2)
  let inputs = inputSeparator(userInput);
  console.log(head(readFileSync,existsSync,inputs));
};

main();

