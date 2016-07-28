"use strict";

const HEXA_MAP = {
  "a" : 10,
  "b" : 11,
  "c" : 12,
  "d" : 13,
  "e" : 14,
  "f" : 15
}

module.exports = Hexadecimal;

function Hexadecimal(string) {
  this.string = string;
}

Hexadecimal.prototype.toDecimal = function toDecimal() {
  if( !isValid(this.string) ) return 0;

  let values = this.string.split("").reverse();
  return values.reduce(
    (sum, value, index) => {
      let multiplier = HEXA_MAP[value] || parseInt(value);
      return sum += multiplier * Math.pow(16,index);
    },0);
};

function isValid(string) {
  return (/^[a-f\d]+$/g).test(string);
}
