"use strict";

module.exports = PhoneNumber;

function PhoneNumber(givenString) {
  this.digits = givenString;
}

PhoneNumber.prototype.toString = function toString() {
  return `(${this.areaCode()}) ${this.number().slice(3,6)}-${this.number().slice(-4)}`;
};

PhoneNumber.prototype.areaCode = function areaCode() {
  return this.number().slice(0,3);
};

PhoneNumber.prototype.number = function number() {
  let result = extractNumber(this.digits);
  if( result.length !== 10 )
    result = lengthValidation(result);
  return result;
};

function extractNumber(string) {
  return string.match(/[\d]+/g).join('');
}

function lengthValidation(string) {
  if( string.length === 11 && string[0] === '1' )
    return string.substring(1);
  return "0000000000";
}
