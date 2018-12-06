const assert = require('assert');
const {getLines,getCharacters} = require('../src/headLibrary.js');

describe('getLines()',function(){
  it('shoud return the 10 lines by default',function(){
    let string = 'The \ncoins \nentered\n circulation\nAfter \nlegal\n maneuvering\nthe\n government\nThe\n coins\n were\nCongress \ncalled \nin the coins'
    let expectedOutput = 'The \ncoins \nentered\n circulation\nAfter \nlegal\n maneuvering\nthe\n government\nThe'
    assert.deepEqual(getLines(string,10),expectedOutput);
  })
});

describe('getCharacter()',function(){
  it('shoud return the 10 character for input10',function(){
    let string = 'The \ncoins \nentered\n circulation\nAfter \nlegal\n maneuvering\nthe\n government\nThe\n coins\n were\nCongress \ncalled \nin the coins'
    let expectedOutput = 'The \ncoins' 
    assert.deepEqual(getCharacters(string,10),expectedOutput);
  })
});

