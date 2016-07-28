//
// This is only a SKELETON file for the "Bob" exercise. It's been provided as a
// convenience to get you started writing code faster.
//

var Bob = function() {};

Bob.prototype.hey = function(input) {
  if( isAllCaps(input) ) {
    return "Whoa, chill out!";
  }
  else if( isQuestion(input) ){
    return "Sure.";
  }
  else if( isEmptyOrSpace(input) ) {
    return "Fine. Be that way!";
  }
  else {
    return "Whatever.";
  }
};

function isAllCaps(input) {
  //Remove Numbers and Special Characters.
  var alphaCharacters;
  try {
    alphaCharacters = input.match(/[\u00e4\u00fca-z]/gi).join('');
  } catch (e) {
    alphaCharacter = "";
  }
  return (/^[\u00c4\u00dcA-Z]+$/g).test(alphaCharacters);
}

function isQuestion(input) {
  return (/\?$/).test(input)
}

function isEmptyOrSpace(input) {
  return !input || (/^\s+$/).test(input);
}

module.exports = Bob;
