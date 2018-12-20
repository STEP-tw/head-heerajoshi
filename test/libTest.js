const assert = require("assert");
const {
  fetchHeadContent,
  head,
  fetchTailContent,
  tail,
  getFileHeading
} = require("../src/lib.js");

const fileContents = {
  numberFile:
    "one\ntwo\nthree\nfour\nfive\nsix\nseven\neight\nnine\nten\neleven",
  randomFile:
    "The \ncoins \nentered\n circulation\nAfter \nlegal\n maneuvering\nthe\n government\nThe\n coins\n were\nCongress \ncalled \nin the coins"
};

const readFileSync = file => fileContents[file];

const validater = function (file) {
  if (fileContents[file] == undefined) {
    return false;
  }
  return true;
};

const fs = { existsSync: validater, readFileSync: readFileSync };

describe("fetchHeadContent()", function() {
  it("should handle default arguments for a single file", function() {
    let content =
      "The \ncoins \nentered\n circulation\nAfter \nlegal\n maneuvering\nthe\n government\nThe\n coins\n were\nCongress \ncalled \nin the coins";
    let expectedOutput =
      "The \ncoins \nentered\n circulation\nAfter \nlegal\n maneuvering\nthe\n government\nThe";
    assert.equal(fetchHeadContent(content, 10, "\n"), expectedOutput);
  });
  it("should return 1 lines if count is 1", function() {
    let content =
      "The \ncoins \nentered\n circulation\nAfter \nlegal\n maneuvering\nthe\n government\nThe\n coins\n were\nCongress \ncalled \nin the coins";
    let expectedOutput = "The ";
    assert.equal(fetchHeadContent(content, 1, "\n"), expectedOutput);
  });
  it("should return the 4 lines in input 4", function() {
    let content =
      "The \ncoins \nentered\n circulation\nAfter \nlegal\n maneuvering\nthe\n government\nThe\n coins\n were\nCongress \ncalled \nin the coins";
    let expectedOutput = "The \ncoins \nentered\n circulation";
    assert.equal(fetchHeadContent(content, 4, "\n"), expectedOutput);
  });
  it("should return the 10 character if count is 10", function() {
    let content =
      "The \ncoins \nentered\n circulation\nAfter \nlegal\n maneuvering\nthe\n government\nThe\n coins\n were\nCongress \ncalled \nin the coins";
    let expectedOutput = "The \ncoins";
    assert.equal(fetchHeadContent(content, 10, ""), expectedOutput);
  });
  it("should return  1 character for input 1", function() {
    let content =
      "The \ncoins \nentered\n circulation\nAfter \nlegal\n maneuvering\nthe\n government\nThe\n coins\n were\nCongress \ncalled \nin the coins";
    let expectedOutput = "T";
    assert.equal(fetchHeadContent(content, 1, ""), expectedOutput);
  });
  it("should return 2 character for input 2", function() {
    let content =
      "The \ncoins \nentered\n circulation\nAfter \nlegal\n maneuvering\nthe\n government\nThe\n coins\n were\nCongress \ncalled \nin the coins";
    let expectedOutput = "Th";
    assert.equal(fetchHeadContent(content, 2, ""), expectedOutput);
  });
});

describe("getFileHeading()", function() {
  it("should return file name with header", function() {
    let content = "The";
    let expectedOutput = "==> " + "The" + " <==";
    assert.equal(getFileHeading(content), expectedOutput);
  });
 
});

describe("head()", function() {
  it("should handle default arguments for a single file", function() {
    let args = { option: "lines", count: "3", files: ["numberFile"] };
    assert.equal(head(args, fs), "one\ntwo\nthree");
  });
  it("should return the lines as per provided input", function() {
    let args = { option: "lines", count: "3", files: ["numberFile"] };
    assert.equal(head(args, fs), "one\ntwo\nthree");
  });
  it("should list the contents of the entire file if argument is greater than number of lines in file  ", function() {
    let args = { option: "lines", count: "30", files: ["numberFile"] };
    assert.equal(
      head(args, fs),
      "one\ntwo\nthree\nfour\nfive\nsix\nseven\neight\nnine\nten\neleven"
    );
  });
  it("should return the characters as per provided input", function() {
    let args = { option: 'bytes', count: "2", files: ["numberFile"] };
    assert.equal(head(args, fs), "on");
  });
  it("should return the lines for file which exists and error for file which doesn't exists", function() {
    let file1 = "not exists";
     let args = {
       option: "lines",
       count: "2",
       files: ["numberFile", file1]
     };
     let expectedOutput =
       "==> numberFile <==\none\ntwo\nhead: not exists: No such file or directory";
     assert.equal(head(args, fs), expectedOutput);
   });

  it("should provide an error for invalid values for -c", function() {
    let args = { option: 'bytes', count: "7f", files: ["numberFile"] };
    assert.equal(head(args, fs), "head: illegal byte count -- 7f");
  });
  it("should treat 0 as an illegal line count", function() {
    let args = { option: 'bytes', count: "0", files: ["numberFile"] };
    assert.equal(head(args, fs), "head: illegal byte count -- 0");
  });
  it("should return usage message for wrong option", function() {
    let args = { option: "g", count: "7", files: ["numberFile"] };
    assert.equal(
      head(args, fs),
      "head: illegal option -- g\nusage: head [-n lines | -c bytes] [file ...]"
    );
  });

  it("should provide the error message for a missing file but list other files that are present", function() {
    let file1 = "not exists";
    let args = {
      option: "lines",
      count: "2",
      files: ["numberFile", file1]
    };
    let expectedOutput =
      "==> numberFile <==\none\ntwo\nhead: not exists: No such file or directory";
    assert.equal(head(args, fs), expectedOutput);
  });
  it("should return the lines of each file for more than one file", function() {
    let args = {
      option: "lines",
      count: "2",
      files: ["numberFile", "randomFile"]
    };
    let expectedOutput =
      "==> numberFile <==\none\ntwo\n==> randomFile <==\nThe \ncoins ";
    assert.equal(head(args, fs), expectedOutput);
  });
});

describe("fetchTailContent()", function() {
  it("should return the 10 lines by default", function() {
    let content =
      "The \ncoins \nentered\n circulation\nAfter \nlegal\n maneuvering\nthe\n government\nThe\n coins\n were\nCongress \ncalled \nin the coins";
    let expectedOutput =
      "legal\n maneuvering\nthe\n government\nThe\n coins\n were\nCongress \ncalled \nin the coins";
    assert.equal(fetchTailContent(content, 10, "\n"), expectedOutput);
  });
  it("should return 1 lines by givin input", function() {
    let content =
      "The \ncoins \nentered\n circulation\nAfter \nlegal\n maneuvering\nthe\n government\nThe\n coins\n were\nCongress \ncalled \nin the coins";
    let expectedOutput = "in the coins";
    assert.equal(fetchTailContent(content, 1, "\n"), expectedOutput);
  });
  it("should return the 4 lines in input 4", function() {
    let content =
      "The \ncoins \nentered\n circulation\nAfter \nlegal\n maneuvering\nthe\n government\nThe\n coins\n were\nCongress \ncalled \nin the coins";
    let expectedOutput = " were\nCongress \ncalled \nin the coins";
    assert.equal(fetchTailContent(content, 4, "\n"), expectedOutput);
  });
  it("should return the 10 character for input10", function() {
    let content =
      "The \ncoins \nentered\n circulation\nAfter \nlegal\n maneuvering\nthe\n government\nThe\n coins\n were\nCongress \ncalled \nin the coins";
    let expectedOutput = " the coins";
    assert.equal(fetchTailContent(content, 10, ""), expectedOutput);
  });
  it("should return  1 character for input 1", function() {
    let content =
      "The \ncoins \nentered\n circulation\nAfter \nlegal\n maneuvering\nthe\n government\nThe\n coins\n were\nCongress \ncalled \nin the coins";
    let expectedOutput = "s";
    assert.equal(fetchTailContent(content, 1, ""), expectedOutput);
  });
  it("should return 2 character for input 2", function() {
    let content =
      "The \ncoins \nentered\n circulation\nAfter \nlegal\n maneuvering\nthe\n government\nThe\n coins\n were\nCongress \ncalled \nin the coins";
    let expectedOutput = "ns";
    assert.equal(fetchTailContent(content, 2, ""), expectedOutput);
  });
});


describe("tail()", function() {
  it("should return the lines as per provided input", function() {
    let args = { option: "lines", count: "3", files: ["numberFile"] };
    assert.equal(tail(args, fs), "nine\nten\neleven");
  });

  it("should return usage message for wrong option", function() {
    let args = { option: "g", count: "7", files: ["numberFile"] };
    assert.equal(
      tail(args, fs),
      "tail: illegal option -- g\nusage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]"
    );
  });

  it("should return error message for wrong count", function() {
    let args = { option: "lines", count: "7r", files: ["numberFile"] };
    assert.equal(tail(args, fs), "tail: illegal offset -- 7r");
  });

  it("should return error message for wrong count of character", function() {
    let args = { option: 'bytes', count: "7r", files: ["numberFile"] };
    assert.equal(tail(args, fs), "tail: illegal offset -- 7r");
  });

  it("should return full file when count is more than the the total no of line", function() {
    let args = { option: "lines", count: "40", files: ["numberFile"] };
    assert.equal(
      tail(args, fs),
      "one\ntwo\nthree\nfour\nfive\nsix\nseven\neight\nnine\nten\neleven"
    );
  });

  it("should return the characters as per provided input", function() {
    let args = { option: 'bytes', count: "2", files: ["numberFile"] };
    assert.equal(tail(args, fs), "en");
  });

  it("should return the lines for file which exists and error for file which doesn't exists", function() {
   let file1 = "not exists";
    let args = {
      option: "lines",
      count: "2",
      files: ["numberFile", file1]
    };
    let expectedOutput =
      "==> numberFile <==\nten\neleven\ntail: not exists: No such file or directory";
    assert.equal(tail(args, fs), expectedOutput);
  });
});

