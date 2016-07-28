"use strict";

module.exports = Anagram;

function Anagram(givenWord) { this.word = givenWord; }

Anagram.prototype.matches = function matches() {
  let args;
  (arguments[0] instanceof Array)?
    args = arguments[0]:
    args = Array.prototype.slice.call(arguments);
  return args.filter(isAnagram, this);
};

function isAnagram(stringInArray) {
  if( isMatch(stringInArray, this.word) ) return false;

  let i = stringInArray.length,
      matchingWord = this.word;

  while(i--) {
    if( !isMatch(stringInArray[i], matchingWord) ) return false;
    matchingWord = removeCharFrom(stringInArray[i], matchingWord);
  }
  return (matchingWord.length) ? false : true;
}

function removeCharFrom(char, removeFrom) {
  let regExp = new RegExp(char, "i");
  return removeFrom.replace(regExp,"");
}

function isMatch(match, against){
  let regExp = new RegExp(match, "i");
  return regExp.test(against);
}
