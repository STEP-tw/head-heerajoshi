const optionType = function(option){
  const optionValue = { "n": "lines", "c": "bytes" };
  option = optionValue[option];
  return option;
}

const inputSeparator = function(userInputs) {
  let separatedInputs = {
    option: "lines",
    count: 10,
    files: userInputs.slice(0)
  };
  let option = userInputs[0][1]
  if (
    userInputs[0].length >= 3 &&
    userInputs[0][0] == "-" &&
    isNaN(userInputs[0][1])
  ) {
    separatedInputs.option = optionType(option);
    separatedInputs.count = userInputs[0].slice(2);
    separatedInputs.files = userInputs.slice(1);
  }
  if (userInputs[0].length >= 2 && !isNaN(userInputs[0].slice(0, 2))) {
    separatedInputs.count = userInputs[0].slice(1);
    separatedInputs.files = userInputs.slice(1);
  }
  if (
    userInputs[0].length == 2 &&
    isNaN(userInputs[0][1]) &&
    userInputs[0][0] == "-"
  ) {
    separatedInputs.option = optionType(option);
    separatedInputs.count = userInputs[1];
    separatedInputs.files = userInputs.slice(2);
  }
  return separatedInputs;
};

exports.inputSeparator = inputSeparator;
