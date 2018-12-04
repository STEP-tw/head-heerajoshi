const fs = require('fs');
const {lineSeperator} = require('./src/headLibrary.js');

const main = function(){
 let fileName = process.argv[2];
   let content = fs.readFileSync(fileName, 'utf8');
   console.log(lineSeperator(content));
};

main();

