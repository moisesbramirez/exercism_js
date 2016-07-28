"use strict";

module.exports = Series;

function Series(digitString) {
  this.digits = digitsArray(digitString);
}

Series.prototype.slices = function slices(number) {
  if( number > this.digits.length ) throw new Error("Slice size is too big.")
  return this.digits.reduce(
    (slices, digit, index, digits) => {
      let slice = digits.slice(index, index + number);
      if( slice.length === number ) slices.push(slice);
      return slices;
  },[]);
};

function digitsArray(string) {
  return string.split("").map(digit => parseInt(digit));
}
