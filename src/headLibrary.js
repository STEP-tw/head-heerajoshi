const getLines = function(content,lines){
  let result = content.split('\n').slice(0,lines);
  return result.join('\n');
};

const getCharacters = function(content,character){
  let result = content.split('').slice(0,character);
  return result.join('');
};


const head = function(readFileSync,{type,lines,inputFiles}){
  let content = readFileSync(inputFiles.toString(),'utf8');
  let result = getLines(content,lines);
  if(type == 'c'){
    result = getCharacters(content,lines);
    return result;
  }
  return result;
}
  module.exports = {getLines,getCharacters,head};


