const assert = require("assert");
const {
  getLines,
  getCharacters,
  errorHandling,
  head
} = require("../src/headLibrary.js");

const readFileSync = function(string) {
  return string;
};

const validater = function(file) {
  if (file == "not exists") {
    return false;
  }
  return true;
};
describe("getLines()", function() {
  it("shoud return the 10 lines by default", function() {
    let string =
      "The \ncoins \nentered\n circulation\nAfter \nlegal\n maneuvering\nthe\n government\nThe\n coins\n were\nCongress \ncalled \nin the coins";
    let expectedOutput =
      "The \ncoins \nentered\n circulation\nAfter \nlegal\n maneuvering\nthe\n government\nThe";
    assert.deepEqual(getLines(string, 10), expectedOutput);
  });
});

describe("getCharacter()", function() {
  it("shoud return the 10 character for input10", function() {
    let string =
      "The \ncoins \nentered\n circulation\nAfter \nlegal\n maneuvering\nthe\n government\nThe\n coins\n were\nCongress \ncalled \nin the coins";
    let expectedOutput = "The \ncoins";
    assert.deepEqual(getCharacters(string, 10), expectedOutput);
  });
});

describe("head()", function() {
  it("should return the lines as per provided input", function() {
    let file = "one\ntwo\nthree\nfour";
    let parameters = { option: "n", count: "3", inputFiles: [file] };
    assert.deepEqual(
      head(readFileSync, validater, parameters),
      "one\ntwo\nthree"
    );
  });

  it("should return the characters as per provided input", function() {
    let file = "one\ntwo\nthree\nfour";
    let parameters = { option: "c", count: "2", inputFiles: [file] };
    assert.deepEqual(head(readFileSync, validater, parameters), "on");
  });

  it("should return the lines for file which exists and error for file which doesn't exists", function() {
    let file = "one\ntwo\nthree";
    let file1 = "not exists";
    let parameters = { option: "n", count: "2", inputFiles: [file, file1] };
    let expectedOutput =
      "==> one\ntwo\nthree <==\none\ntwo\n\nhead: not exists: No such file or directory";
    assert.deepEqual(head(readFileSync, validater, parameters), expectedOutput);
  });
});

describe("errorHandling()", function() {
  it("should return the error massage if input have any other option", function() {
    let file = "one\ntwo\nthree";
    let parameters = { option: "v", count: "3", inputFiles: [file] };
    assert.deepEqual(
      errorHandling(parameters),
      "head: illegal option -- " +
        "v" +
        "\n" +
        "usage: head [-n lines | -c bytes] [file ...]"
    );
  });

  it("should return illegal line error massage for invalid lines", function() {
    let file = "one\ntwo\nthree";
    let parameters = { option: "n", count: "0", inputFiles: [file] };
    assert.deepEqual(
      errorHandling(parameters),
      "head: illegal line count -- " + 0
    );
  });

  it("should return illegal byte error massage for invalid bytes", function() {
    let file = "one\ntwo\nthree";
    let parameters = { option: "c", count: "x", inputFiles: [file] };
    assert.deepEqual(
      errorHandling(parameters),
      "head: illegal byte count -- " + "x"
    );
  });
});
