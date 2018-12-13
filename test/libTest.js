const assert = require('assert');
const {getLines,getCharacters,errorHandling,head,errorHandlingTail,getLinesTail,getCharacterTail,tail,getFileHeading} = require('../src/headLibrary.js');

const readFileSync  = function(string){
  return string;
}

const validater = function(file) {
  if(file == 'not exists') {
    return false;
  }
  return true;
}
const fs = {existsSync:validater,readFileSync:readFileSync};

describe('getLines()',function(){
  it('shoud return the 10 lines by default',function(){
    let string = 'The \ncoins \nentered\n circulation\nAfter \nlegal\n maneuvering\nthe\n government\nThe\n coins\n were\nCongress \ncalled \nin the coins'
    let expectedOutput = 'The \ncoins \nentered\n circulation\nAfter \nlegal\n maneuvering\nthe\n government\nThe'
    assert.deepEqual(getLines(string,10),expectedOutput);
  })
  it('shoud return 1 lines by givin input',function(){
    let string = 'The \ncoins \nentered\n circulation\nAfter \nlegal\n maneuvering\nthe\n government\nThe\n coins\n were\nCongress \ncalled \nin the coins'
    let expectedOutput = 'The '
    assert.deepEqual(getLines(string,1),expectedOutput);
  })
  it('shoud return the 4 lines in input 4',function(){
    let string = 'The \ncoins \nentered\n circulation\nAfter \nlegal\n maneuvering\nthe\n government\nThe\n coins\n were\nCongress \ncalled \nin the coins'
    let expectedOutput = 'The \ncoins \nentered\n circulation'
    assert.deepEqual(getLines(string,4),expectedOutput);
  })
});

describe('getFileHeading()',function(){
  it('shoud return file name with header',function(){
    let string = 'The'
    let expectedOutput = "==> " + 'The' + " <==" ;
    assert.deepEqual(getFileHeading(string),expectedOutput);
  })
  it('shoud return file name with header',function(){
    let string = 'The'
    let expectedOutput = "==> " + 'The' + " <==" ;
    assert.deepEqual(getFileHeading(string),expectedOutput);
  })
})

describe('getCharacter()',function(){
  it('shoud return the 10 character for input10',function(){
    let string = 'The \ncoins \nentered\n circulation\nAfter \nlegal\n maneuvering\nthe\n government\nThe\n coins\n were\nCongress \ncalled \nin the coins'
    let expectedOutput = 'The \ncoins' 
    assert.deepEqual(getCharacters(string,10),expectedOutput);
  })
  it('shoud return  1 character for input 1',function(){
    let string = 'The \ncoins \nentered\n circulation\nAfter \nlegal\n maneuvering\nthe\n government\nThe\n coins\n were\nCongress \ncalled \nin the coins'
    let expectedOutput = 'T'
    assert.deepEqual(getCharacters(string,1),expectedOutput);
  })
  it('shoud return 2 character for input 2',function(){
    let string = 'The \ncoins \nentered\n circulation\nAfter \nlegal\n maneuvering\nthe\n government\nThe\n coins\n were\nCongress \ncalled \nin the coins'
    let expectedOutput = 'Th'
    assert.deepEqual(getCharacters(string,2),expectedOutput);
  })
});

describe('head()', function() {
  it('should return the lines as per provided input', function() {
    let file = 'one\ntwo\nthree\nfour';
    let parameters = {option:'n',count:'3',inputFiles:[file]}
    assert.deepEqual(head(fs,parameters),'one\ntwo\nthree');
  });

  it('should return the characters as per provided input', function() {
    let file = 'one\ntwo\nthree\nfour';
    let parameters = {option:'c',count:'2',inputFiles: [file]}
    assert.deepEqual(head(fs,parameters),'on');
  });
  it('should return error massage for wrong count', function() {
    let file = 'one\ntwo\nthree\nfour';
    let parameters = {option:'c',count:'7f',inputFiles: [file]}
    assert.deepEqual(head(fs,parameters),'head: illegal byte count -- 7f');
  });
  it('should return error massage for 0 count', function() {
    let file = 'one\ntwo\nthree\nfour';
    let parameters = {option:'c',count:'0',inputFiles: [file]}
    assert.deepEqual(head(fs,parameters),'head: illegal byte count -- 0');
  });
  it('should return usage massage for wrong option', function() {
    let file = 'one\ntwo\nthree\nfour';
    let parameters = {option:'g',count:'7',inputFiles: [file]}
    assert.deepEqual(head(fs,parameters),'head: illegal option -- g\nusage: head [-n lines | -c bytes] [file ...]');
  });

  
  it("should return the lines for file which exists and error for file which doesn't exists", function() {
    let file = 'one\ntwo\nthree';
    let file1 = 'not exists';
    let parameters = {option:'n',count:'2',inputFiles:[file,file1]}
    let expectedOutput = '==> one\ntwo\nthree <==\none\ntwo\nhead: not exists: No such file or directory'
    assert.deepEqual(head(fs,parameters),expectedOutput);
  });
});


describe('errorHandling()', function() {
  it('should return the error massage if input have any other option', function() {
    let file = 'one\ntwo\nthree';
    let parameters = {option:'v',count:'3',inputFiles:[file]}
    assert.deepEqual(errorHandling(parameters),'head: illegal option -- ' + 'v' + '\n' + 'usage: head [-n lines | -c bytes] [file ...]'
 );
  });

  it('should return illegal line error massage for invalid lines', function() {
    let file = 'one\ntwo\nthree';
    let parameters = {option:'n',count:'0',inputFiles: [file]}
    assert.deepEqual(errorHandling(parameters),'head: illegal line count -- ' + 0);
  });

  it("should return illegal byte error massage for invalid bytes" ,function() {
    let file = 'one\ntwo\nthree';
    let parameters = {option:'c',count:'x',inputFiles:[file]}
    assert.deepEqual(errorHandling(parameters),'head: illegal byte count -- ' + 'x');
  });
});

describe('getLinesTail()',function(){
  it('shoud return the 10 lines by default',function(){
    let string = 'The \ncoins \nentered\n circulation\nAfter \nlegal\n maneuvering\nthe\n government\nThe\n coins\n were\nCongress \ncalled \nin the coins'
    let expectedOutput = 'legal\n maneuvering\nthe\n government\nThe\n coins\n were\nCongress \ncalled \nin the coins'
    assert.deepEqual(getLinesTail(string,10),expectedOutput);
  })
  it('shoud return 1 lines by givin input',function(){
    let string = 'The \ncoins \nentered\n circulation\nAfter \nlegal\n maneuvering\nthe\n government\nThe\n coins\n were\nCongress \ncalled \nin the coins'
    let expectedOutput = 'in the coins'
    assert.deepEqual(getLinesTail(string,1),expectedOutput);
  })
  it('shoud return the 4 lines in input 4',function(){
    let string = 'The \ncoins \nentered\n circulation\nAfter \nlegal\n maneuvering\nthe\n government\nThe\n coins\n were\nCongress \ncalled \nin the coins'
    let expectedOutput = ' were\nCongress \ncalled \nin the coins'
    assert.deepEqual(getLinesTail(string,4),expectedOutput);
  })
});

describe('getCharacterTail())',function(){
  it('shoud return the 10 character for input10',function(){
    let string = 'The \ncoins \nentered\n circulation\nAfter \nlegal\n maneuvering\nthe\n government\nThe\n coins\n were\nCongress \ncalled \nin the coins'
    let expectedOutput = ' the coins' 
    assert.deepEqual(getCharacterTail(string,10),expectedOutput);
  })
  it('shoud return  1 character for input 1',function(){
    let string = 'The \ncoins \nentered\n circulation\nAfter \nlegal\n maneuvering\nthe\n government\nThe\n coins\n were\nCongress \ncalled \nin the coins'
    let expectedOutput = 's'
    assert.deepEqual(getCharacterTail(string,1),expectedOutput);
  })
  it('shoud return 2 character for input 2',function(){
    let string = 'The \ncoins \nentered\n circulation\nAfter \nlegal\n maneuvering\nthe\n government\nThe\n coins\n were\nCongress \ncalled \nin the coins'
    let expectedOutput = 'ns'
    assert.deepEqual(getCharacterTail(string,2),expectedOutput);
  })
});

describe('errorHandlingTail()', function() {
  it('should return the error massage if input have any other option', function() {
    let file = 'one\ntwo\nthree';
    let parameters = {option:'v',count:'3',inputFiles:[file]}
    assert.deepEqual(errorHandlingTail(parameters),'tail: illegal option -- ' + 'v' + '\n' + 'usage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]'
 );
  });
  it('should return illegal line error massage for invalid lines', function() {
    let file = 'one\ntwo\nthree';
    let parameters = {option:'n',count:'5r',inputFiles: [file]}
    assert.deepEqual(errorHandlingTail(parameters),"tail: illegal offset -- " + '5r');
  });

  it("should return illegal byte error massage for invalid bytes" ,function() {
    let file = 'one\ntwo\nthree';
    let parameters = {option:'c',count:'5r',inputFiles:[file]}
    assert.deepEqual(errorHandlingTail(parameters),"tail: illegal offset -- " + '5r');
  });
});

describe('tail()', function() {
  it('should return the lines as per provided input', function() {
    let file = 'one\ntwo\nthree\nfour';
    let parameters = {option:'n',count:'3',inputFiles:[file]}
    assert.deepEqual(tail(parameters,fs),'two\nthree\nfour');
  });

  it('should return the characters as per provided input', function() {
    let file = 'one\ntwo\nthree\nfour';
    let parameters = {option:'c',count:'2',inputFiles: [file]}
    assert.deepEqual(tail(parameters ,fs),'ur');
  });

  it("should return the lines for file which exists and error for file which doesn't exists", function() {
    let file = 'one\ntwo\nthree';
    let file1 = 'not exists';
    let parameters = {option:'n',count:'2',inputFiles:[file,file1]}
    let expectedOutput = '==> one\ntwo\nthree <==\ntwo\nthree\ntail: not exists: No such file or directory'
    assert.deepEqual(tail(parameters ,fs),expectedOutput);
  });
});

