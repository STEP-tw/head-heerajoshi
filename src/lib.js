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

const addHeader = function(files, file, result) {
  let fileHeader = getFileHeading(file);
  if (files.length > 1) {
    return fileHeader + "\n" + result;
  }
  return result;
};

const handlers = {
  head:{error:handleHeadError,fetch:fetchHeadContent},
  tail:{error:handleTailError,fetch:fetchTailContent}
}

const runCommand = function(userInput, operation, fs, commandType, file) {
  const { option, count, files } = userInput;
  const delimiter = { lines: "\n", bytes: "" };
  const { existsSync } = fs;
  let missingFile = missingFileError(existsSync, file, commandType);
  if (missingFile) {
    return missingFile;
  }
  let content = fs.readFileSync(file, "utf8");
  let result = operation(content, count, delimiter[option]);
  return addHeader(files, file, result);
};

const createCommand = name => function(userInput, fs) {
  let handler = handlers[name];
  let error = handler.error(userInput);
  if (error) {
    return error;
  }
  let result = runCommand.bind(null, userInput, handler.fetch, fs, name);
  return userInput.files.map(result).join("\n");
};
const head = createCommand('head');
const tail = createCommand('tail');


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
