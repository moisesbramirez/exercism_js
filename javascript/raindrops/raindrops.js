"use strict";

module.exports = RainDrops;

function RainDrops() {}

RainDrops.prototype.convert = function convert(number){
  let primeFactors = getPrimeFactors(number, 2, []);
  let drops =  primeFactors.reduce(
    (string, value) => {
      if(value === 3 && !string.includes("i")) return string += "Pling";
      if(value === 5 && !string.includes("a")) return string += "Plang";
      if(value === 7 && !string.includes("o")) return string += "Plong";
      return string;
    }, "");

  return drops || number.toString();
}

function getPrimeFactors(number, factor, collection) {
  if(factor > number) return collection;
  if(number % factor === 0) {
    collection.push(factor)
    return getPrimeFactors(number/factor, factor, collection);
  }
  return getPrimeFactors(number, factor+1, collection);
}
