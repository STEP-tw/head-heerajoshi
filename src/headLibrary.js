const getLines = function(content, count) {
  let result = content.split("\n").slice(0, count);
  return result.join("\n");
};

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

const head = function(readFileSync, validater, { option, count, inputFiles }) {
  let error = errorHandling({ option, count, inputFiles });
  if (error) {
    return error;
  }
  return inputFiles
    .map(function(file) {
      if (!validater(file)) {
        return "head: " + file + ": No such file or directory";
      }
      let content = readFileSync(file, "utf8");
      let result = getLines(content, count);
      let fileName = "==> " + file + " <==" + "\n";
      if (option == "c") {
        result = getCharacters(content, count);
      }
      if (inputFiles.length > 1) {
        return fileName + result + "\n";
      }
      return result;
    })
    .join("\n");
};

module.exports = { getLines, getCharacters, errorHandling, head };
