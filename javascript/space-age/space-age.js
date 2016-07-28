"use strict";
const SECONDS_IN_EARTH_DAY = 86400;

module.exports = SpaceAge;

function SpaceAge(seconds) {
  this.seconds = seconds;
}

SpaceAge.prototype.onEarth = function onEarth() {
  return toYears(this.seconds, 365.2564);
};

SpaceAge.prototype.onMercury = function onMercury() {
  return toYears(this.seconds, 87.969);
};

SpaceAge.prototype.onVenus = function onVenus() {
  return toYears(this.seconds, 224.7);
};

SpaceAge.prototype.onMars = function onMars() {
  return toYears(this.seconds, 687);
};

SpaceAge.prototype.onJupiter = function onJupiter() {
  return toYears(this.seconds, 4332.59);
};

SpaceAge.prototype.onSaturn = function onSaturn() {
  return toYears(this.seconds, 10759);
};

SpaceAge.prototype.onUranus = function onUranus() {
  return toYears(this.seconds, 30688.5);
};

SpaceAge.prototype.onNeptune = function onNeptune() {
  return toYears(this.seconds, 60182);
};

function toYears(seconds, orbitalPeriod) {
  let yearSeconds = orbitalPeriod * SECONDS_IN_EARTH_DAY;
  return +(seconds / yearSeconds).toFixed(2);
}
