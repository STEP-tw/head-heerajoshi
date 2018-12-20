const assert = require('assert');
const {handleHeadError}  = require('../src/error.js');

describe("handleHeadError()", function() {
    it("should return the error message if input have any other option", function() {
      let file =
        "one\ntwo\nthree\nfour\nfive\nsix\nseven\neight\nnine\nten\neleven";
      let args = { option: "v", count: "3", files: [file] };
      assert.equal(
        handleHeadError(args),
        "head: illegal option -- " +
          "v" +
          "\n" +
          "usage: head [-n lines | -c bytes] [file ...]"
      );
    });
  
    it("should treat 0 as an illegal line count", function() {
      let file =
        "one\ntwo\nthree\nfour\nfive\nsix\nseven\neight\nnine\nten\neleven";
      let args = { option: "lines", count: "0", files: [file] };
      assert.equal(
        handleHeadError(args),
        "head: illegal line count -- " + 0
      );
    });
  
    it("should provide an error for invalid values for -c", function() {
      let file =
        "one\ntwo\nthree\nfour\nfive\nsix\nseven\neight\nnine\nten\neleven";
      let args = { option: 'bytes', count: "x", files: [file] };
      assert.equal(
        handleHeadError(args),
        "head: illegal byte count -- " + "x"
      );
    });
    it("should provide an error for invalid values for -n", function() {
        let file =
          "one\ntwo\nthree\nfour\nfive\nsix\nseven\neight\nnine\nten\neleven";
        let args = { option: 'lines', count: "x", files: [file] };
        assert.equal(
          handleHeadError(args),
          "head: illegal line count -- " + "x"
        );
      });

})