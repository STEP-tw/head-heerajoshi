const getLines = function(content, count) {
  let result = content.split("\n").slice(0,count);
  return result.join("\n");
};

const getLinesTail = function(content,count){
  let totalLine = content.split('\n').length;
  let start = totalLine - count ;
  start = Math.max(0,start);
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
  return !(validater(file));
};

const missingFileError = function(validater, file,command) {
  let type={'h':'head','t':'tail'}
  let invalidfile = isInValidFile(validater, file);
  if (invalidfile) {
    return type[command] + ": " + file + ": No such file or directory";
  }
};

const getFileHeading = function(file) {
  return "==> " + file + " <==" ;
};
const errorHandlingTail = function({ option, count, inpputFiles }) {
  if (option != "n" && option != "c") {
    return (
      "tail: illegal option -- " +
      option +
      "\n" +
      "usage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]"
    );
  }
  if (isNaN(count - 0)) {
    return "tail: illegal offset -- " + count;
  }
}

const head = function(readFileSync, validater, { option, count, inputFiles }) {
  let typeCall = { n: getLines, c: getCharacters };
  let error = errorHandling({ option, count, inputFiles });
  if (error) {
    return error;
  }
  return inputFiles
    .map(function(file) {
      let missingFile = missingFileError(validater, file,'h');
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

const tail = function(userInput,readFileSync,validater){
  let {option,count,inputFiles} = userInput;
  let typeCall = {n: getLinesTail,c:getCharacterTail}
  let error = errorHandlingTail({ option, count, inputFiles });
  if (error) {
    return error;
  }
  return inputFiles.map(function(file){
    let missingFile = missingFileError(validater, file,'t');
      if (missingFile) {
        return missingFile;
      }
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
  tail,
  errorHandlingTail
};
