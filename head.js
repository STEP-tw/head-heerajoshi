const fs = require("fs");
const { head } = require("./src/lib.js");
const { inputSeparator } = require("./src/utilLib.js");
const main = function() {
  let userArg = inputSeparator(process.argv.slice(2));
  console.log(head(userArg, fs));
};

main();
