const wrongOptionMessageHead = function(option) {
  return (
    "head: illegal option -- " +
    option +
    "\n" +
    "usage: head [-n lines | -c bytes] [file ...]"
  );
};

const wrongOptionMessageTail = function(option) {
  return (
    "tail: illegal option -- " +
    option +
    "\n" +
    "usage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]"
  );
};

const isWrongOption = function(option) {
  return (option != "lines" && option != "bytes");
};
const handleHeadError = function({ option, count }) {
  let type = { lines: "line", bytes: "byte" };
  if (isWrongOption(option)) {
    return wrongOptionMessageHead(option);
  }
  if (isNaN(count) || count < 1) {
    return "head: illegal " + type[option] + " count -- " + count;
  }
};

const handleTailError = function({ option, count }) {
  if (isWrongOption(option)) {
    return wrongOptionMessageTail(option);
  }
  if (isNaN(count - 0)) {
    return "tail: illegal offset -- " + count;
  }
};

const isInvalidFile = function(validater, file) {
  return !validater(file);
};

const missingFileError = function(validater, file, command) {
  let type = { head: "head", tail: "tail" };
  let invalidfile = isInvalidFile(validater, file);
  if (invalidfile) {
    return type[command] + ": " + file + ": No such file or directory";
  }
};

module.exports = { handleHeadError, handleTailError, missingFileError };
