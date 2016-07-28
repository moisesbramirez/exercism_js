"use strict";

module.exports = Pangram;
const abc = 'abcdefghijklmnopqrstuvwxyz';

function Pangram(givenString) {
  this.string = givenString;
}

Pangram.prototype.isPangram = function isPangram() {
  let iter = 26, found = true;

  while(iter-- && found) {
    let regExp = new RegExp(abc[iter], "i");
    found = regExp.test(this.string);
  }

  return found;
};
