const inputSeparator = function(userInputs){
  let separatedInputs = {option:'n',count:10,inputFiles:userInputs.slice(0)}
  if( userInputs[0].length >= 3 && userInputs[0][0] =='-' && isNaN(userInputs[0][1]) ) {
    separatedInputs.option = userInputs[0][1];
    separatedInputs.count = userInputs[0].slice(2);
    separatedInputs.inputFiles = userInputs.slice(1);
  }
  if( userInputs[0].length >= 2 && !isNaN(userInputs[0].slice(0,2)) ) {
    separatedInputs.count = userInputs[0].slice(1);
    separatedInputs.inputFiles = userInputs.slice(1);
  }
  if( userInputs[0].length == 2 && isNaN(userInputs[0][1]) && userInputs[0][0]=='-') {
    separatedInputs.option = userInputs[0][1];
    separatedInputs.count = userInputs[1];
    separatedInputs.inputFiles = userInputs.slice(2);
  }
  return separatedInputs;
}

exports.inputSeparator = inputSeparator;
