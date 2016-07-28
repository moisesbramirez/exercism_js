"use strict";

module.exports = Trinary;

function Trinary(string) {
  this.numberString = string;
}

Trinary.prototype.toDecimal = function toDecimal() {
  if(!isValidTrinary(this.numberString)) return 0;
  let stringArray = this.numberString.
                    split("").
                    reverse().
                    map( value => parseInt(value) );
  return conversion(stringArray);
};

function conversion(array) {
  return array.reduce(
    (result, value, index) => {
      return result += value * Math.pow(3, index);
    }, 0);
}

function isValidTrinary(string) {
  return (/^[012]+$/g).test(string);
}
