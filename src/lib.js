const {errorHandling} = require('./error.js')

const fetchHeadContent = function(content, count, delimiter) {
  let result = content.split(delimiter).slice(0, count);
  return result.join(delimiter);
};

const fetchTailContent = function(content, count, delimiter) {
  let result = content.split(delimiter).slice(-Math.abs(count));
  return result.join(delimiter);
};

const isInvalidFile = function(validater, file) {
  return !validater(file);
};

const missingFileError = function(validater, file, command) {
  let type = { h: "head", t: "tail" };
  let invalidfile = isInvalidFile(validater, file);
  if (invalidfile) {
    return type[command] + ": " + file + ": No such file or directory";
  }
};

const getFileHeading = function(file) {
  return "==> " + file + " <==";
};

const errorHandlingTail = function({ option, count }) {
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
};

const addHeader = function(inputFiles, file, result) {
  if (inputFiles.length > 1) {
    return file + "\n" + result;
  }
  return result;
};

const runCommand = function(userInput, opeartion, fs, commandType, file) {
  let { option, count, inputFiles } = userInput;
  let delimiter = { n: "\n", c: "" };
  const { existsSync } = fs;
  let missingFile = missingFileError(existsSync, file, commandType);
  if (missingFile) {
    return missingFile;
  }
  let fileHeader = getFileHeading(file);
  let content = fs.readFileSync(file, "utf8");
  let result = opeartion(content, count, delimiter[option]);
  return addHeader(inputFiles, fileHeader, result);
};

const head = function(userInput, fs) {
  let error = errorHandling(userInput);
  if (error) {
    return error;
  }
  let result = runCommand.bind(null, userInput, fetchHeadContent, fs, "h");
  return userInput.inputFiles.map(result).join("\n");
};

const tail = function(userInput, fs) {
  let error = errorHandlingTail(userInput);
  if (error) {
    return error;
  }
  let result = runCommand.bind(null, userInput, fetchTailContent, fs, "t");
  return userInput.inputFiles.map(result).join("\n");
};

module.exports = {
  fetchHeadContent,
  errorHandling,
  isInvalidFile,
  missingFileError,
  head,
  getFileHeading,
  fetchTailContent,
  fetchTailContent,
  tail,
  errorHandlingTail,
  runCommand
};
