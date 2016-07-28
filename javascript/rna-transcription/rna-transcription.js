"use strict";

module.exports = DnaTranscriber;

function DnaTranscriber() {}
DnaTranscriber.prototype.toRna = toRna;

let dnaMap = {
  G: "C",
  C: "G",
  A: "U",
  T: "A"
};

function toRna(string) {
  if(string.length === 1) return dnaMap[string];
  return dnaMap[string[0]] + toRna(string.substring(1));
}
