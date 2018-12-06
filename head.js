const fs = require('fs');
const {lineSeperator} = require('./src/headLibrary.js');
let userInput = process.argv.slice(2)
const main = function(){
  let fileName = process.argv[3];
  let requiredLine = process.argv[2]
  let content = fs.readFileSync(fileName, 'utf8');
  console.log(lineSeperator(content,requiredLine));
};

main();

