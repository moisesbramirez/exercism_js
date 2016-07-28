"use strict";

module.exports = Binary;

function Binary(string) {
  this.string = string;
}

Binary.prototype.toDecimal = function toDecimal() {
  if( !(/^[10]+$/g).test(this.string) ) return 0;
  let length = this.string.length;
  return this.string.split("").reduce(
    (sum, value) => sum += value * Math.pow(2,--length) , 0);
};
