const getFirstNLines = function(content, count) {
  let result = content.split("\n").slice(0, count);
  return result.join("\n");
};

const getFirstNBytes = function(content, count) {
  let result = content.split("").slice(0, count);
  return result.join("");
};

const getLastNLines = function(content, count) {
  let totalLine = content.split("\n").length;
  let start = totalLine - count;
  start = Math.max(0, start);
  let result = content.split("\n").slice(start);
  return result.join("\n");
};

const getLastNBytes = function(content, count) {
  let totalLine = content.split("").length;
  let start = totalLine - count;
  let result = content.split("").slice(start);
  return result.join("");
};

const errorHandling = function({ option, count }) {
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
  const { existsSync } = fs;
  let missingFile = missingFileError(existsSync, file, commandType);
  if (missingFile) {
    return missingFile;
  }
  let fileHeader = getFileHeading(file);
  let content = fs.readFileSync(file, "utf8");
  let result = opeartion[option](content, count);
  return addHeader(inputFiles, fileHeader, result);
};

const head = function(userInput,fs) {
  let opeartion = { n: getFirstNLines, c: getFirstNBytes };
  let error = errorHandling(userInput);
  if (error) {
    return error;
  }
  let result = runCommand.bind(null, userInput, opeartion, fs, "h");
  return userInput.inputFiles.map(result).join("\n");
};

const tail = function(userInput, fs) {
  let operation = { n: getLastNLines, c: getLastNBytes };
  let error = errorHandlingTail(userInput);
  if (error) {
    return error;
  }
  let result = runCommand.bind(null, userInput, operation, fs, "t");
  return userInput.inputFiles.map(result).join("\n");
};

module.exports = {
  getFirstNLines,
  getFirstNBytes,
  errorHandling,
  isInvalidFile,
  missingFileError,
  head,
  getFileHeading,
  getLastNLines,
  getLastNBytes,
  tail,
  errorHandlingTail,
  runCommand
};
