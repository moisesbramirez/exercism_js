"use strict";
const GIGA = 1E12; //in milliseconds

function Gigasecond(givenDate) {
  this.givenDate = givenDate;
}

Gigasecond.prototype.date = function date(){
  return new Date( this.givenDate.getTime() + GIGA );
};

module.exports = Gigasecond;
