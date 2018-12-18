const assert = require("assert");
const {
  fetchHeadContent,
  errorHandling,
  head,
  errorHandlingTail,
  fetchTailContent,
  tail,
  getFileHeading
} = require("../src/lib.js");

const fileContents = {
  numberFile : "one\ntwo\nthree\nfour\nfive\nsix\nseven\neight\nnine\nten\neleven" ,
  stringFile : "The \ncoins \nentered\n circulation\nAfter \nlegal\n maneuvering\nthe\n government\nThe\n coins\n were\nCongress \ncalled \nin the coins"
} 

const readFileSync = file => fileContents[file];

const validater = function(file) {
  if (file == "not exists") {
    return false;
  }
  return true;
};
const fs = { existsSync: validater, readFileSync: readFileSync };

describe("fetchHeadContent()", function() {
  it("shoud return the 10 lines by default", function() {
    let string =
      "The \ncoins \nentered\n circulation\nAfter \nlegal\n maneuvering\nthe\n government\nThe\n coins\n were\nCongress \ncalled \nin the coins";
    let expectedOutput =
      "The \ncoins \nentered\n circulation\nAfter \nlegal\n maneuvering\nthe\n government\nThe";
    assert.deepEqual(fetchHeadContent(string, 10, "\n"), expectedOutput);
  });
  it("shoud return 1 lines by givin input", function() {
    let string =
      "The \ncoins \nentered\n circulation\nAfter \nlegal\n maneuvering\nthe\n government\nThe\n coins\n were\nCongress \ncalled \nin the coins";
    let expectedOutput = "The ";
    assert.deepEqual(fetchHeadContent(string, 1, "\n"), expectedOutput);
  });
  it("shoud return the 4 lines in input 4", function() {
    let string =
      "The \ncoins \nentered\n circulation\nAfter \nlegal\n maneuvering\nthe\n government\nThe\n coins\n were\nCongress \ncalled \nin the coins";
    let expectedOutput = "The \ncoins \nentered\n circulation";
    assert.deepEqual(fetchHeadContent(string, 4, "\n"), expectedOutput);
  });
  it("shoud return the 10 character for input10", function() {
    let string =
      "The \ncoins \nentered\n circulation\nAfter \nlegal\n maneuvering\nthe\n government\nThe\n coins\n were\nCongress \ncalled \nin the coins";
    let expectedOutput = "The \ncoins";
    assert.deepEqual(fetchHeadContent(string, 10, ""), expectedOutput);
  });
  it("shoud return  1 character for input 1", function() {
    let string =
      "The \ncoins \nentered\n circulation\nAfter \nlegal\n maneuvering\nthe\n government\nThe\n coins\n were\nCongress \ncalled \nin the coins";
    let expectedOutput = "T";
    assert.deepEqual(fetchHeadContent(string, 1, ""), expectedOutput);
  });
  it("shoud return 2 character for input 2", function() {
    let string =
      "The \ncoins \nentered\n circulation\nAfter \nlegal\n maneuvering\nthe\n government\nThe\n coins\n were\nCongress \ncalled \nin the coins";
    let expectedOutput = "Th";
    assert.deepEqual(fetchHeadContent(string, 2, ""), expectedOutput);
  });
});

describe("getFileHeading()", function() {
  it("shoud return file name with header", function() {
    let string = "The";
    let expectedOutput = "==> " + "The" + " <==";
    assert.deepEqual(getFileHeading(string), expectedOutput);
  });
  it("shoud return file name with header", function() {
    let string = "The";
    let expectedOutput = "==> " + "The" + " <==";
    assert.deepEqual(getFileHeading(string), expectedOutput);
  });
});

describe("head()", function() {
  it("should return the lines as per provided input", function() {
    let parameters = { option: "n", count: "3", inputFiles: ['numberFile'] };
    assert.deepEqual(head(parameters, fs), "one\ntwo\nthree");
  });
  it("should return the hole file when count is more than the line of the input file", function() {
    let parameters = { option: "n", count: "30", inputFiles: ['numberFile'] };
    assert.deepEqual(head(parameters, fs), "one\ntwo\nthree\nfour\nfive\nsix\nseven\neight\nnine\nten\neleven")
  });
  it("should return the characters as per provided input", function() {
    let parameters = { option: "c", count: "2", inputFiles: ['numberFile'] };
    assert.deepEqual(head(parameters, fs), "on");
  });
  it("should return error massage for wrong count", function() {
    let parameters = { option: "c", count: "7f", inputFiles: ['numberFile'] };
    assert.deepEqual(head(parameters, fs), "head: illegal byte count -- 7f");
  });
  it("should return error massage for 0 count", function() {
    let parameters = { option: "c", count: "0", inputFiles: ['numberFile'] };
    assert.deepEqual(head(parameters, fs), "head: illegal byte count -- 0");
  });
  it("should return usage massage for wrong option", function() {
    let parameters = { option: "g", count: "7", inputFiles: ['numberFile'] };
    assert.deepEqual(
      head(parameters, fs),
      "head: illegal option -- g\nusage: head [-n lines | -c bytes] [file ...]"
    );
  });

  it("should return the lines for file which exists and error for file which doesn't exists", function() {
    let file1 = "not exists";
    let parameters = { option: "n", count: "2", inputFiles: ['numberFile', file1] };
    let expectedOutput =
      "==> numberFile <==\none\ntwo\nhead: not exists: No such file or directory";
    assert.deepEqual(head(parameters, fs), expectedOutput);
  });
});

describe("errorHandling()", function() {
  it("should return the error massage if input have any other option", function() {
    let file = "one\ntwo\nthree\nfour\nfive\nsix\nseven\neight\nnine\nten\neleven";
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
    let file = "one\ntwo\nthree\nfour\nfive\nsix\nseven\neight\nnine\nten\neleven";
    let parameters = { option: "n", count: "0", inputFiles: [file] };
    assert.deepEqual(
      errorHandling(parameters),
      "head: illegal line count -- " + 0
    );
  });

  it("should return illegal byte error massage for invalid bytes", function() {
    let file = "one\ntwo\nthree\nfour\nfive\nsix\nseven\neight\nnine\nten\neleven";
    let parameters = { option: "c", count: "x", inputFiles: [file] };
    assert.deepEqual(
      errorHandling(parameters),
      "head: illegal byte count -- " + "x"
    );
  });
});

describe("fetchTailContent()", function() {
  it("shoud return the 10 lines by default", function() {
    let string =
      "The \ncoins \nentered\n circulation\nAfter \nlegal\n maneuvering\nthe\n government\nThe\n coins\n were\nCongress \ncalled \nin the coins";
    let expectedOutput =
      "legal\n maneuvering\nthe\n government\nThe\n coins\n were\nCongress \ncalled \nin the coins";
    assert.deepEqual(fetchTailContent(string, 10, "\n"), expectedOutput);
  });
  it("shoud return 1 lines by givin input", function() {
    let string =
      "The \ncoins \nentered\n circulation\nAfter \nlegal\n maneuvering\nthe\n government\nThe\n coins\n were\nCongress \ncalled \nin the coins";
    let expectedOutput = "in the coins";
    assert.deepEqual(fetchTailContent(string, 1, "\n"), expectedOutput);
  });
  it("shoud return the 4 lines in input 4", function() {
    let string =
      "The \ncoins \nentered\n circulation\nAfter \nlegal\n maneuvering\nthe\n government\nThe\n coins\n were\nCongress \ncalled \nin the coins";
    let expectedOutput = " were\nCongress \ncalled \nin the coins";
    assert.deepEqual(fetchTailContent(string, 4, "\n"), expectedOutput);
  });
  it("shoud return the 10 character for input10", function() {
    let string =
      "The \ncoins \nentered\n circulation\nAfter \nlegal\n maneuvering\nthe\n government\nThe\n coins\n were\nCongress \ncalled \nin the coins";
    let expectedOutput = " the coins";
    assert.deepEqual(fetchTailContent(string, 10, ""), expectedOutput);
  });
  it("shoud return  1 character for input 1", function() {
    let string =
      "The \ncoins \nentered\n circulation\nAfter \nlegal\n maneuvering\nthe\n government\nThe\n coins\n were\nCongress \ncalled \nin the coins";
    let expectedOutput = "s";
    assert.deepEqual(fetchTailContent(string, 1, ""), expectedOutput);
  });
  it("shoud return 2 character for input 2", function() {
    let string =
      "The \ncoins \nentered\n circulation\nAfter \nlegal\n maneuvering\nthe\n government\nThe\n coins\n were\nCongress \ncalled \nin the coins";
    let expectedOutput = "ns";
    assert.deepEqual(fetchTailContent(string, 2, ""), expectedOutput);
  });
});

describe("errorHandlingTail()", function() {
  it("should return the error massage if input have any other option", function() {
    let file = "one\ntwo\nthree\nfour\nfive\nsix\nseven\neight\nnine\nten\neleven";
    let parameters = { option: "v", count: "3", inputFiles: [file] };
    assert.deepEqual(
      errorHandlingTail(parameters),
      "tail: illegal option -- " +
        "v" +
        "\n" +
        "usage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]"
    );
  });
  it("should return illegal line error massage for invalid lines", function() {
    let file = "one\ntwo\nthree\nfour\nfive\nsix\nseven\neight\nnine\nten\neleven";
    let parameters = { option: "n", count: "5r", inputFiles: [file] };
    assert.deepEqual(
      errorHandlingTail(parameters),
      "tail: illegal offset -- " + "5r"
    );
  });

  it("should return illegal byte error massage for invalid bytes", function() {
    let file = "one\ntwo\nthree\nfour\nfive\nsix\nseven\neight\nnine\nten\neleven";
    let parameters = { option: "c", count: "5r", inputFiles: [file] };
    assert.deepEqual(
      errorHandlingTail(parameters),
      "tail: illegal offset -- " + "5r"
    );
  });
});

describe("tail()", function() {
  it("should return the lines as per provided input", function() {
    let parameters = { option: "n", count: "3", inputFiles: ['numberFile'] };
    assert.deepEqual(tail(parameters, fs),"nine\nten\neleven"); 
  });

  it("should return usage massage for wrong option", function() {
    let parameters = { option: "g", count: "7", inputFiles: ['numberFile'] };
    assert.deepEqual(
      tail(parameters, fs),
      "tail: illegal option -- g\nusage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]"
    );
  });

  it("should return error massage for wrong count", function() {
    let parameters = { option: "n", count: "7r", inputFiles: ['numberFile'] };
    assert.deepEqual(tail(parameters, fs), "tail: illegal offset -- 7r");
  });

  it("should return full file when count is more than the the total no of line", function() {
    let parameters = { option: "n", count: "40", inputFiles: ['numberFile'] };
    assert.deepEqual(tail(parameters, fs), "one\ntwo\nthree\nfour\nfive\nsix\nseven\neight\nnine\nten\neleven");
  });

  it("should return the characters as per provided input", function() {
    let parameters = { option: "c", count: "2", inputFiles: ['numberFile'] };
    assert.deepEqual(tail(parameters, fs), "en");
  });

  it("should return the lines for file which exists and error for file which doesn't exists", function() {
    let file1 = "not exists";
    let parameters = { option: "n", count: "2", inputFiles: ['numberFile' , file1] };
    let expectedOutput =
      "==> numberFile <==\nten\neleven\ntail: not exists: No such file or directory";
    assert.deepEqual(tail(parameters, fs), expectedOutput);
  });
});
