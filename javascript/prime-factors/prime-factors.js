"use strict";

module.exports = new PrimeFactors();

function PrimeFactors() {}

PrimeFactors.prototype.for = function(natural) {
  let factor = 2, collection = [];

  while(natural >= factor) {
    if(natural % factor === 0) {
      collection.push(factor);
      natural /= factor;
    } else {
      factor++
    }
  }

  return collection;
}
