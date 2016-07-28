"use strict";

const HELPER_MAP = {
  "L": "turnLeft",
  "R": "turnRight",
  "A": "advance",
  "north": ["west", "east", [0,1]],
  "east": ["north", "south", [1,0]],
  "south": ["east", "west", [0,-1]],
  "west": ["south", "north", [-1,0]]
};

module.exports = Robot;

function Robot() {}

Robot.prototype.orient = function setBearing(direction) {
  if(!isValidDirection(direction)) throw "Invalid Robot Bearing";
  this.bearing = direction;
};

Robot.prototype.at = function setCoordinates(xCoordinate, yCoordinate) {
  this.coordinates = [xCoordinate, yCoordinate];
};

Robot.prototype.place = function setInitialState(options) {
  this.orient(options.direction);
  this.at(options.x, options.y);
};

Robot.prototype.turnRight = function turnRight() {
  this.bearing = HELPER_MAP[this.bearing][1];
};

Robot.prototype.turnLeft = function turnLeft() {
  this.bearing = HELPER_MAP[this.bearing][0];
};

Robot.prototype.advance = function advance() {
  HELPER_MAP[this.bearing][2].forEach(
    (value, index) => this.coordinates[index] += value);
};

Robot.prototype.instructions = expandCommands;

Robot.prototype.evaluate = function evaluate(string) {
  let commands = expandCommands(string);
  commands.forEach(command => this[command].call(this));
};

function expandCommands(string) {
  return string.split("").map(letter => HELPER_MAP[letter]);
};

function isValidDirection(direction) {
  return /east|west|north|south/.test(direction);
}
