const errorHandling = function({ option, count }) {
    let type = { n: "line", c: "byte" };
    if (option != "n" && option != "c") {
      return (
        "head: illegal option -- " +
        option +
        "\n" +
        "usage: head [-n lines | -c bytes] [file ...]"
      );
    }
    if (isNaN(count) || count < 1) {
      return "head: illegal " + type[option] + " count -- " + count;
    }
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

  module.exports = {errorHandling, errorHandlingTail,
                    missingFileError};