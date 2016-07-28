"use strict";

module.exports = {
  empty: BufferEmptyException,
  full: BufferFullException
};

function BufferEmptyException(message) {
  this.name = "BufferEmptyException";
  this.message = message;
  this.toString = () => this.name + ": " + this.message;
}

function BufferFullException(message) {
  this.name = "BufferFullException";
  this.message = message;
  this.toString = () => this.name + ": " + this.message;
}
