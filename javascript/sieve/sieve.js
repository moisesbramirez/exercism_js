"use strict";

module.exports = Sieve;

function Sieve(limit) {
  this.primes = findPrimes(limit);
}

function findPrimes(limit) {
  let primes = [], composites = [];

  for( let i = 2; i <= limit; i++ ) {
    if( excludes(composites, i) ) primes.push(i);
    for( let multiplier = 2; multiplier * i<= limit; multiplier++ ) {
      let product = multiplier * i;
      if( excludes(composites, product) ) composites.push(product);
    }
  }
  return primes;
}

function excludes(array, item) {
  return array.indexOf(item) === -1;
}
