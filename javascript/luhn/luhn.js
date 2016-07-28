"use strict";

module.exports = Luhn;

function Luhn(digits) {
  this.digits = digits;
  this.checkDigit = rightmostDigit(this.digits);
  this.addends = getAddends(this.digits);
  this.checksum = getChecksum(this.digits);
  this.valid = isValid(this.digits);
}

Luhn.create = function create(number) {
  let potential = number * 10;
  return isValid(potential) ? potential :
    potential + (10 - (getChecksum(potential) % 10));
};

function rightmostDigit(number) {
  let str = number.toString()
  return parseInt(str[str.length -1]);
}

function getAddends(number) {
  let numberString = number.toString();
  let mapFunction = oddOrEvenMap(numberString.length);
  return numberString.split("").map(mapFunction);
}

function oddOrEvenMap(length) {
  return ( isEven(length) ) ? targetEvens : targetOdds;

  function targetEvens(digit, index) {
    if( isEven(index) ) return handleTarget(digit);
    return parseInt(digit);
  }

  function targetOdds(digit, index) {
    if( !isEven(index) ) return handleTarget(digit);
    return parseInt(digit);
  }
}

function isEven(number){
  return number % 2 === 0;
}

function handleTarget(digit) {
  let doubled = parseInt(digit) * 2;
  return (doubled >= 10) ? doubled - 9 : doubled;
}

function getChecksum(number) {
  let addends = getAddends(number);
  return addends.reduce((sum, value) => sum += value, 0);
}

function isValid(number) {
  return getChecksum(number) % 10 === 0;
}
