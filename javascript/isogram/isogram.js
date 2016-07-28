"use strict";

module.exports = Isogram;

function Isogram(givenString) {
  this.string = givenString;
};

Isogram.prototype.isIsogram = function isIsogram() {
  let charactersArray = this.string.toLowerCase().replace(/[\s-]+/g,"").split(""),
      hash = {},
      containsDuplicates = charactersArray.some(
        char => {
          if( hash[char] ) return true;
          hash[char] = true;
        });

  return !containsDuplicates;
};
