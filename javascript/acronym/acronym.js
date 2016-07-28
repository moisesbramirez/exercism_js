"use strict";

module.exports = {parse: parse}

function parse(phrase) {
  let wordArray = phrase.split(" ");
  return wordArray.reduce(
    (acronym, value) => {
      return acronym += parseForHyphen(value)
      || parseForPunctuation(value)
      || parseForUpperCase(value)
      || value[0];
  },"").toUpperCase();
}

function parseForUpperCase(value) {
  return value.replace(/[^A-Z]/g, "");
}

function parseForHyphen(value) {
  if( value.includes("-") ) {
    return value.split("-").reduce( (result, value) => result += value[0], "");
  }
}

function parseForPunctuation(value) {
  if( (/[^\w]/).test(value) ) return value[0];
}
