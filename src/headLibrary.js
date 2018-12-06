const getLines = function(content,lines){
  let result = content.split('\n').slice(0,lines);
  return result.join('\n');
};

const getCharacters = function(content,character){
  let result = content.split('').slice(0,character);
  return result.join('');
};

const head = function(readFileSync,validater,{type,lines,inputFiles}){
  return inputFiles.map(function(file){
    if (!validater(file)) {
      return 'head: '+file+': No such file or directory';
    }

    let content = readFileSync(file,'utf8');
    let result = getLines(content,lines);
    let fileName = "==> " + file + " <==" + '\n';
    if(type == 'c'){
      result = getCharacters(content,lines);
    }
    if(inputFiles.length > 1){
      return fileName + result + '\n';
    }
    return result;
  }).join('\n');
}
module.exports = {getLines,getCharacters,head};


