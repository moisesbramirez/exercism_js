"use strict";

module.exports = new Prime();

function Prime() {}

Prime.prototype.nth = function getNth(nth) {
  if(nth < 1) throw new Error("Prime is not possible");

  let primes = [], number = 2;
  while(primes.length < nth) {
    if(!isDivisibleByPrimes(primes,number)) {
      primes.push(number)
    }
    number++;
  }
  return primes.pop();
};

function isDivisibleByPrimes(primesArray, number) {
  return primesArray.some(prime => number % prime === 0);
}
