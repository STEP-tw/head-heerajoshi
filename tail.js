const fs = require('fs');
const {tail} = require('./src/lib.js');
const {inputSeparator} = require('./src/utilLib.js')
let userArg = process.argv.slice(2);
const main = function(){
let inputs = inputSeparator(userArg);
console.log(tail(inputs,fs))
}

main();
