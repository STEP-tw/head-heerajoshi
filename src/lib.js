const {
  handleHeadError,
  handleTailError,
  isInvalidFile,
  missingFileError
} = require("./error.js");

const fetchHeadContent = function(content, count, delimiter) {
  return content
    .split(delimiter)
    .slice(0, count)
    .join(delimiter);
};

const fetchTailContent = function(content, count, delimiter) {
  let totalNumOfLine = content.split(delimiter).length;
  let start = totalNumOfLine - count;
  start = Math.max(0, start);
  return content
    .split(delimiter)
    .slice(start)
    .join(delimiter);
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
  const delimiter = { lines: "\n", bytes: "" };
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
  let result = runCommand.bind(null, userInput, fetchHeadContent, fs, "head");
  return userInput.inputFiles.map(result).join("\n");
};

const tail = function(userInput, fs) {
  let error = handleTailError(userInput);
  if (error) {
    return error;
  }
  let result = runCommand.bind(null, userInput, fetchTailContent, fs, "tail");
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
