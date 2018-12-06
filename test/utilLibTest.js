const assert = require('assert');
const {inputSeparator} = require('../src/utilLib.js')

describe('inputSeparator', function() {
  it('should return parameter object when line/byte and lines is provided combine', function() {
    let actualInput = inputSeparator(['-n5','file1']); 
    let expectedOutput = {type:'n',lines:'5',inputFiles:['file1']};
    assert.deepEqual(actualInput,expectedOutput);
  });

  it('should return parameter object when only lines is provide', function() {
    let actualInput = inputSeparator(['-5','file1']); 
    let expectedOutput = {type:'n',lines:'5',inputFiles:['file1']};
    assert.deepEqual(actualInput,expectedOutput);
  });

  it('should return parameter object when line/byte and lines is provided separately', function() {
    let actualInput = inputSeparator(['-c','3','file1','file2']); 
    let expectedOutput = {type:'c',lines:'3',inputFiles:['file1','file2']};
    assert.deepEqual(actualInput,expectedOutput);
  });

  it('should return parameter object when only inputs files are provided', function() {
    let actualInput = inputSeparator(['file1','file2']); 
    let expectedOutput = {type:'n',lines:'10',inputFiles:['file1','file2']};
    assert.deepEqual(actualInput,expectedOutput);
  });
});

