"use strict";
const ALPHABET = "abcdefghijklmnopqrstuvwxyz";

module.exports = { encode: encode };

function encode(message) {
  let messageArray = message.toLowerCase().split('');
  return cipherFormat( messageArray.reduce(transpose,"") );
}

function transpose(string, character) {
  if( isNumber(character) ) return string += character;
  let index = ALPHABET.indexOf(character);
  return string += ALPHABET[25 - index] || "";
}

function cipherFormat(string) {
  return string.replace(/(.{5})/g, "$1 ").trim();
}

function isNumber(character) {
  return (/\d/).test(character);
}
