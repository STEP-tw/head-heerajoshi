const fs = require('fs');
const {head} = require('./src/lib.js');
const {inputSeparator} = require('./src/utilLib.js') 
const main = function(){
  let userInput = process.argv.slice(2)
  let inputs = inputSeparator(userInput);
  console.log(head(fs,inputs));
};

main();

