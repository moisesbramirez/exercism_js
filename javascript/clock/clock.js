"use strict";

module.exports = {at:at};

function at(hours, minutes) {
  return new Clock(hours, minutes);
}

function Clock(hours, minutes) {
  this.minutes = parseMinutes(minutes);
  this.hours = parseHours(hours +  addtionalHours(minutes));
}

Clock.prototype.toString = function toString() {
  return `${twoDigitFormat(this.hours)}:${twoDigitFormat(this.minutes)}`;
};

Clock.prototype.equals = function equals(clock) {
  return this.toString() === clock.toString();
};

Clock.prototype.plus = function plus(minutes) {
  this.hours = parseHours(this.hours + addtionalHours(this.minutes + minutes));
  this.minutes = parseMinutes(this.minutes + minutes);
  return this;
};

Clock.prototype.minus = function minus(minutes) {
  this.hours = parseHours(this.hours + addtionalHours(this.minutes - minutes));
  this.minutes = parseMinutes(this.minutes - minutes);
  return this;
};

function parseHours(number) {
  let hours = number % 24;
  if( hours < 0) hours = 24 - Math.abs(hours);
  return hours;
}

function parseMinutes(number) {
  let minutes = number || 0;
  minutes = minutes % 60;
  if( minutes < 0) minutes = 60 - Math.abs(minutes);
  return minutes;
}

function twoDigitFormat(number) {
  return (number < 10) ? "0"+number : number;
}

function addtionalHours(minutes) {
  minutes = minutes || 0;
  return Math.floor(minutes / 60);
}
