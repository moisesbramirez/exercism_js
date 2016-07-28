"use strict";

module.exports = DiffOfSquares;

function DiffOfSquares(max) {
  this.max = max;
  this.squareOfSums = squareOfSums(this.max);
  this.sumOfSquares = sumOfSquares(this.max);
  this.difference = this.squareOfSums - this.sumOfSquares;
}

function squareOfSums(max) {
  let sum = max;
  while(--max) { sum += max; }
  return Math.pow(sum,2);
}

function sumOfSquares(max) {
  let sum = Math.pow(max,2);
  while(--max) { sum += Math.pow(max, 2); }
  return sum;
}
