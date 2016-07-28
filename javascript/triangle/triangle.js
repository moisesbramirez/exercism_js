"use strict";

module.exports = Triangle;

function Triangle(side1, side2, side3) {
  this.side1 = side1;
  this.side2 = side2;
  this.side3 = side3;
}

Triangle.prototype.kind = function kind() {
  validateSides(this.side1, this.side2, this.side3);
  if(isEquilateral(this.side1,this.side2,this.side3)) return "equilateral";
  if(isIsoceles(this.side1,this.side2,this.side3)) return "isosceles";
  if(isScalene(this.side1,this.side2,this.side3)) return "scalene"
};

function isEquilateral(a, b, c) {
  return (a === b && a === c && b === c);
}

function isIsoceles(a, b, c) {
  return (a === b || a === c || b === c);
}

function isScalene(a, b, c) {
  return !isIsoceles(a,b,c);
}

function validateSides(a, b, c) {
  if(a + b <= c || a + c <= b || b + c <= a ) {
    throw new Error("Triangle cannot exist");
  }
}
