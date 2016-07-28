"use strict";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let instances = 0;

module.exports = RobotName;

function RobotName() {
  this.name = generateName();
}

RobotName.prototype.reset = function newName(){
  this.name = generateName();
};

function generateName() {
  if(instances >= 676E3) {
    throw new Error("Exceeded possible unique names.")
  }
  let name = fistLetter(instances) + secondLetter(instances) + numericPiece(instances);
  instances++;
  return name;
}

function fistLetter(number) {
  let index = Math.floor(number/26E3);
  return ALPHABET[index];
}

function secondLetter(number) {
  let index = Math.floor( (number % 26E3)/1E3 );
  return ALPHABET[index];
}

function numericPiece(number) {
  let lastThree = (number % 1E3);
  if(lastThree > 99) { return lastThree.toString(); }
  return (lastThree > 9) ? "0" + lastThree : "00" + lastThree;
}
