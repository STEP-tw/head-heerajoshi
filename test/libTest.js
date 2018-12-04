const assert = require('assert');
const {lineSeperator} = require('../src/headLibrary.js');

describe('lineSeperator()',function(){
  it('shoud return the 10 lines by default',function(){
    let string = 'The \ncoins \nentered\n circulation\nAfter \nlegal\n maneuvering\nthe\n government\nThe\n coins\n were\nCongress \ncalled \nin the coins'
    let expectedOutput = 'The \ncoins \nentered\n circulation\nAfter \nlegal\n maneuvering\nthe\n government\nThe'
    assert.deepEqual(lineSeperator(string),expectedOutput);
  })
});
