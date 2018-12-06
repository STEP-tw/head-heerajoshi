const inputSeparator = function(userInputs){
  let separatedInputs = {type:'n',lines:10,inputFiles:userInputs.slice(0)}
  if( userInputs[0].length >= 3 && userInputs[0][0] =='-' && isNaN(userInputs[0][1]) ) {
    separatedInputs.type = userInputs[0][1];
    separatedInputs.lines = userInputs[0].slice(2);
    separatedInputs.inputFiles = userInputs.slice(1);
  }
  if( userInputs[0].length >= 2 && !isNaN(userInputs[0].slice(0,2)) ) {
    separatedInputs.lines = userInputs[0].slice(1);
    separatedInputs.inputFiles = userInputs.slice(1);
  }
  if( userInputs[0].length == 2 && isNaN(userInputs[0][1]) && userInputs[0][0]=='-') {
    separatedInputs.type = userInputs[0][1];
    separatedInputs.lines = userInputs[1];
    separatedInputs.inputFiles = userInputs.slice(2);
  }
  return separatedInputs;
}

exports.inputSeparator = inputSeparator;
