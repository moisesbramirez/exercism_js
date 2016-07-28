"use strict";

module.exports = PythagoreanTriplet;

function PythagoreanTriplet(a, b, c) {
  this.a = a,
  this.b = b,
  this.c = c;
}

PythagoreanTriplet.where = function where(options) {
  let sum = options.sum || 0,
      min = options.minFactor || 1,
      max = options.maxFactor || 10,
      pythagoreanStrings = [];

  for( let gap = 1; gap < max; gap++ ) {
    let b = min, c = b + gap;
    while( c <= max ) {
      let a = Math.sqrt( square(c) - square(b) );
      if( isNatural(a) && a >= min ) {
        let pythagoreanString = [a,b,c].sort(numberSort).join(",");
        if( pythagoreanStrings.indexOf(pythagoreanString) < 0 ) {
          pythagoreanStrings.push(pythagoreanString);
        }
      }
      b++;
      c = b + gap;
    }
  }
  let triplets = pythagoreanStrings.map(tripletFromStrings);
  return (sum) ? triplets.filter(triplet => triplet.sum() === sum) : triplets;
};

PythagoreanTriplet.prototype.sum = function sum() {
  return this.a + this.b + this.c;
};

PythagoreanTriplet.prototype.product = function product() {
  return this.a * this.b * this.c;
};

PythagoreanTriplet.prototype.isPythagorean = function isPythagorean() {
  return square(this.a) + square(this.b) === square(this.c);
};

function square(number) {
  return number * number;
}

function isNatural(number) {
  return !(/[.]/).test(number.toString());
}

function numberSort(a,b) {
  return a - b;
}

function tripletFromStrings(string) {
  let values = string.split(",").map(value => parseInt(value));
  return new PythagoreanTriplet(values[0], values[1], values[2]);
}
