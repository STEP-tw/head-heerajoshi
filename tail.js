/* 
  Usage:
  node ./tail.js file1
  node ./tail.js -n5 file1
  node ./tail.js -n 5 file1
  node ./tail.js -5 file1
  node ./tail.js file1 file2
  node ./tail.js -n 5 file1 file2
  node ./tail.js -n5 file1 file2
  node ./tail.js -5 file1 file2 
  node ./tail.js -c5 file1
  node ./tail.js -c 5 file1
  node ./tail.js -c5 file1 file2
  node ./tail.js -c 5 file1 file2
*/
const {readFileSync,existsSync} = require('fs');
const {tail} = require('./src/headLibrary.js');
const {inputSeparator} = require('./src/utilLib.js')
let userArg = process.argv.slice(2);
const main = function(){
let inputs = inputSeparator(userArg);
console.log(tail(inputs,readFileSync,existsSync))
}

main();
