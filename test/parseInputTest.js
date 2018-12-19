const assert = require("assert");
const { inputSeparator } = require("../src/parseInput.js");

describe("inputSeparator", function() {
  it("should return arguments object when line/byte and count is provided combine", function() {
    let actualInput = inputSeparator(["-n5", "file1"]);
    let expectedOutput = { option: "lines", count: "5", files: ["file1"] };
    assert.deepEqual(actualInput, expectedOutput);
  });
  
  it("should return arguments object when line/byte and count is provided combine", function() {
    let actualInput = inputSeparator(["-n-5", "file1"]);
    let expectedOutput = { option: "lines", count: "-5", files: ["file1"] };
    assert.deepEqual(actualInput, expectedOutput);
  });

  it("should return arguments object when only count is provide", function() {
    let actualInput = inputSeparator(["-5", "file1"]);
    let expectedOutput = { option: "lines", count: "5", files: ["file1"] };
    assert.deepEqual(actualInput, expectedOutput);
  });

  it("should return arguments object when line/byte and count is provided separately", function() {
    let actualInput = inputSeparator(["-c", "3", "file1", "file2"]);
    let expectedOutput = {
      option: "bytes",
      count: "3",
      files: ["file1", "file2"]
    };
    assert.deepEqual(actualInput, expectedOutput);
  });

  it("should handle default arguments for multiple files ", function() {
    let actualInput = inputSeparator(["file1", "file2"]);
    let expectedOutput = {
      option: "lines",
      count: "10",
      files: ["file1", "file2"]
    };
    assert.deepEqual(actualInput, expectedOutput);
  });
  it("should handle default arguments for one file ", function() {
    let actualInput = inputSeparator(["file1"]);
    let expectedOutput = {
      option: "lines",
      count: "10",
      files: ["file1"]
    };
    assert.deepEqual(actualInput, expectedOutput);
  });

});

