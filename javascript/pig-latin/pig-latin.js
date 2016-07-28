"use strict";

module.exports = new PigLatin();

function PigLatin() {}

PigLatin.prototype.translate = function translate(phrase) {
  return phrase.split(" ").reduce(
    (translation, word) => {
      return translation += toPigLatin(word) + " ";
    },"").trim();
};

function toPigLatin(word) {
  let partial;
  if( (/^[aeiou]/).test(word.charAt(0)) ) partial = word;
  else if((/^sch|squ|thr/).test(word)) partial = subStrings(word, 3);
  else if((/^ch|qu|th/).test(word)) partial = subStrings(word, 2)
  else partial = subStrings(word, 1);

  return partial + "ay";
}

function subStrings(word, index) {
  return word.substring(index) + word.substring(0, index);
}
