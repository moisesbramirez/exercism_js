"use strict";

module.exports = Series;

function Series(string){
  this.string = string;
}

Series.prototype.largestProduct = function largestProduct(factors) {
  validations(this.string, factors);
  
  return (!factors)? 1 : getCombinations(this.string, factors).reduce(
    (finalProduct, combination) => {
      let product = combination.reduce((result, value) => result * value, 1);
      return (product > finalProduct)? product : finalProduct;
    },0);
};

function getCombinations(string, length) {
  return string.split("").reduce(
    (combinations, value, index, array) => {
      if(index + length <= array.length)
        combinations.push(array.slice(index,index + length));
      return combinations;
    },[]);
}

function validations(string, factors) {
  if(string.length === 0 && factors === 0) return;
  if(factors > string.length) throw new Error("Slice size is too big.");
  if(!(/^[\d]+$/g).test(string) || factors < 0)
    throw new Error("Invalid input.");
}
