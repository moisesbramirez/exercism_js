"use strict";

module.exports = Palindrome;

function Palindrome(options) {
  this.options = options;
  this.palindromes = {};
}

Palindrome.prototype.generate = function generate() {
  let max = this.options.maxFactor;
  let min = this.options.minFactor || 1;
  for(let factor1 = min; factor1 <= max; factor1++) {
    for(let factor2 = min; factor2 <= factor1; factor2++) {
      let product = factor1 * factor2;
      if(isPalindrome(product)) {
        let pair = [factor2,factor1];
        (this.palindromes[product])?
          this.palindromes[product].push(pair):
          this.palindromes[product] = [pair];
      }
    }
  }
};

Palindrome.prototype.largest = function largest() {
  return results(this.palindromes, true);
};

Palindrome.prototype.smallest = function smallest() {
  return results(this.palindromes, false);
};

function results(palindromes, largest) {
  let keys = Object.keys(palindromes).map(value => parseInt(value));
  let value = largest ? Math.max(...keys) : Math.min(...keys);
  return { value: value, factors: palindromes[value] };
}

function isPalindrome(number) {
  let copy = number;
  let reversedNumber = copy.toString().split("").reverse().join("");
  return number.toString() === reversedNumber;
}
