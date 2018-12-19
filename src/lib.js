const {handleHeadError, handleTailError,
       isInvalidFile, missingFileError} = require('./error.js')

const fetchHeadContent = function(content, count, delimiter) {
  return content.split(delimiter).slice(0, count).join(delimiter);
};

const fetchTailContent = function(content, count, delimiter) {
  return content.split(delimiter).slice(-Math.abs(count)).join(delimiter);
};

const getFileHeading = function(file) {
  return "==> " + file + " <==";
};

const addHeader = function(inputFiles, file, result) {
  if (inputFiles.length > 1) {
    return file + "\n" + result;
  }
  return result;
};

const runCommand = function(userInput, opeartion, fs, commandType, file) {
  const { option, count, inputFiles } = userInput;
  const delimiter = { n: "\n", c: "" };
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
  let error = handleHeadError(userInput);
  if (error) {
    return error;
  }
  let result = runCommand.bind(null, userInput, fetchHeadContent, fs, "h");
  return userInput.inputFiles.map(result).join("\n");
};

const tail = function(userInput, fs) {
  let error = handleTailError(userInput);
  if (error) {
    return error;
  }
  let result = runCommand.bind(null, userInput, fetchTailContent, fs, "t");
  return userInput.inputFiles.map(result).join("\n");
};

module.exports = {
  fetchHeadContent,
  handleHeadError,
  isInvalidFile,
  missingFileError,
  head,
  getFileHeading,
  fetchTailContent,
  fetchTailContent,
  tail,
  handleTailError,
  runCommand
};
