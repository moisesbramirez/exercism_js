"use strict";

module.exports = Leap;

function Leap(year){
  this.year = year;
};

Leap.prototype.isLeap = function isLeap() {
  return this.year % 4 === 0 && ( !(this.year % 100 === 0) || this.year % 400 === 0 );
};
