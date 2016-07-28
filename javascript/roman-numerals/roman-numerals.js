"use strict";
const ROMANS = {1:"I", 5:"V", 10:"X", 50:"L",
                100:"C", 500:"D", 1000: "M"};

module.exports = function toRoman(natural) {
  if(!natural) return "";
  let keys = getKeys(natural, getFirstDigit(natural));
  let roman = (keys.min)? ROMANS[keys.min] + ROMANS[keys.min + keys.max] : ROMANS[keys.max];
  return roman + toRoman(natural - keys.max);
};

function getKeys(natural, firstDigit) {
  let keys = {};
  let isDivisible = divide(natural);
  if( fourOrNine(firstDigit) ) {
    keys.min = sortedRomanKeys().filter(isPow10).find(isDivisible);
    keys.max = firstDigit * keys.min;;
  } else {
    keys.max = sortedRomanKeys().find(isDivisible);
  }
  return keys;
}

function getFirstDigit(value) {
  return +value.toString().split("")[0];
}

function divide(int) {
  return function isDivisibleBy(value) {
    return Math.floor(int/value);
  }
}

function fourOrNine(number) {
  return number === 4 || number === 9;
}

function sortedRomanKeys() {
  return Object.keys(ROMANS).map(value => +value).sort(comparator);
}

function comparator(a,b) { return b - a }

function isPow10(value) {
  let firstDigit = getFirstDigit(value);
  return firstDigit === 1;
}
