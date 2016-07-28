"use strict";

module.exports = Handshake;

const COMMAND_MAP = {
  1: "wink", 10: "double blink",
  100: "close your eyes", 1000: "jump" };

function Handshake(decimal) {
  if(!isNumber(decimal)) throw new Error("Handshake must be a number");
  this.binaryArray = getBinary(decimal);
}

Handshake.prototype.commands = function commands() {
  return this.binaryArray.reverse().reduce(
    (handshake, digit, index) => {
      let key = digit * Math.pow(10, index);
      let gesture = COMMAND_MAP[key] || false;
      if(key === 10000) return handshake.reverse();
      if(gesture) handshake.push(gesture);
      return handshake;
    },[]);
};

function getBinary(decimal) {
  let digits = []
  while(decimal >= 1) {
    digits.unshift(decimal % 2);
    decimal = Math.floor(decimal / 2);
  }
  return digits;
}

function isNumber(input) {
  return typeof input ===  "number";
}
