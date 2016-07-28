"use strict";

const ENGLISH_MAP = {
  0: "zero", 10: "ten",
  1: "one", 11: "eleven",
  2: "two", 12: "twelve",
  3: "three", 13: "thirteen",
  4: "four", 15: "fifteen",
  5: "five", 18: "eighteen",
  6: "six", 20: "twenty",
  7: "seven", 30: "thirty",
  8: "eight", 40: "forty",
  9: "nine", 50: "fifty",
  80: "eighty"
};

const PLACES_MAP = {1: "thousand", 2: "million", 3: "billion"};

module.exports = { inEnglish: inEnglish }

function inEnglish(number) {
  if(isNotValid(number))
    throw new Error('Number must be between 0 and 999,999,999,999.');
  let array = placeValues(number);
  return array.reduce((phrase, meta, index) => {
    if(meta.value === 0 && index !== 0) return phrase += "";
    phrase += ` ${numberToWords(meta.value)} ${meta.place}`;
    return phrase.trim();
  },"");
};

function numberToWords(number) {
  if(number < 10) return ENGLISH_MAP[number];
  let hundredth = Math.floor(number/100);
  if(hundredth) {
    let remainder = number % 100;
    return (remainder) ?
      `${ENGLISH_MAP[hundredth]} hundred ` + numberToWords(remainder):
      `${ENGLISH_MAP[hundredth]} hundred`;
    }
  return (number > 19)? parseTenths(number): parseTeens(number);
}

function placeValues(number) {
  let array = reverseString(number.toString()).match(/.{3}|.{2}|./g);
  return array.map(
    (numberString, index) => {
      let meta = {};
      meta.place = PLACES_MAP[index] || "";
      meta.value = parseInt(reverseString(numberString));
      return meta;
    }).reverse();
}

function reverseString(string) {
  let reversed = "";
  let length = string.length;
  while(length--) {
    reversed += string[length];
  }
  return reversed;
}

function parseTenths(number) {
  let tenths = Math.floor(number / 10);
  let ones = number % 10;
  let string = ENGLISH_MAP[tenths * 10] || `${ENGLISH_MAP[tenths]}ty`;
  return (ones)? `${string}-${ENGLISH_MAP[ones]}` : string;
}

function parseTeens(number) {
  return ENGLISH_MAP[number] || `${ENGLISH_MAP[number % 10]}teen`;
}

function isNotValid(number) {
  return number < 0 || number > (1E12 - 1);
}
