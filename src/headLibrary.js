const getLines = function(content, count) {
  let result = content.split("\n").slice(0,count);
  return result.join("\n");
};

const getLinesTail = function(content,count){
  let totalLine = content.split('\n').length;
  let start = totalLine - count ;
  let result = content.split('\n').slice(start);
  return  result.join('\n');
}

const getCharacterTail = function(content,count){
  let totalLine = content.split('').length;
  let start = totalLine - count ;
  let result = content.split('').slice(start);
  return  result.join('');
}

const getCharacters = function(content, character) {
  let result = content.split("").slice(0, character);
  return result.join("");
};

const errorHandling = function({ option, count, inpputFiles }) {
  if (option != "n" && option != "c") {
    return (
      "head: illegal option -- " +
      option +
      "\n" +
      "usage: head [-n lines | -c bytes] [file ...]"
    );
  }
  if (isNaN(count - 0) || count < 1) {
    if (option == "n") {
      return "head: illegal line count -- " + count;
    }
    return "head: illegal byte count -- " + count;
  }
};

const isInValidFile = function(validater, file) {
  return !validater(file);
};

const missingFileError = function(validater, file) {
  let invalidfile = isInValidFile(validater, file);
  if (invalidfile) {
    return "head: " + file + ": No such file or directory";
  }
};

const getFileHeading = function(file) {
  return "==> " + file + " <==" ;
};

const head = function(readFileSync, validater, { option, count, inputFiles }) {
  let typeCall = { n: getLines, c: getCharacters };
  let error = errorHandling({ option, count, inputFiles });
  if (error) {
    return error;
  }
  return inputFiles
    .map(function(file) {
      let missingFile = missingFileError(validater, file);
      if (missingFile) {
        return missingFile;
      }
      let content = readFileSync(file, "utf8");
      let result = typeCall[option](content, count);
      let fileName = getFileHeading(file) + '\n';
      if (inputFiles.length > 1) {
        return fileName + result + '\n';
      }
      return result;
    })
    .join("\n");
};

const tail = function(userInput,fs){
  let typeCall = {n: getLinesTail,c:getCharacterTail}
  let {readFileSync,existsSync} = fs;
  let {option,count,inputFiles} = userInput;
  return inputFiles.map(function(file){
    let filename = getFileHeading(file);

    let content = readFileSync(file,'utf8')
    let result = typeCall[option](content,count)
    if(inputFiles.length > 1){
      return filename +'\n'+ result ;
    }
    return result; 
  }).join('\n');
}

module.exports = {
  getLines,
  getCharacters,
  errorHandling,
  isInValidFile,
  missingFileError,
  head,
  getFileHeading,
  getLinesTail,
  getCharacterTail,
  tail
};
