"use strict";

module.exports = CryptoSquare;

function CryptoSquare(message) {
  this.message = message;
}

CryptoSquare.prototype.normalizePlaintext = function normalizePlaintext() {
  return lowerCaseAndNumbers(this.message);
};

CryptoSquare.prototype.size = function size() {
  let string = this.normalizePlaintext();
  return segmentSize(string);
};

CryptoSquare.prototype.plaintextSegments = function() {
  let text = this.normalizePlaintext();
  let size = this.size();
  return textSegments(text, size);
};

CryptoSquare.prototype.ciphertext = function ciphertext() {
  let segments = this.plaintextSegments();

  return segments.reduce(
    (cipher, segment, index) => {
      let insertIndex = index;

      for(let i = 0; i < segment.length; i++) {
        let character = segment.charAt(i);
        cipher = stringInsert(cipher, insertIndex, character);
        insertIndex += index + 1;
      }
      return cipher;
    }, "");
};

function stringInsert(string, index, char) {
  return string.substring(0, index) + char + string.substring(index);
}

function lowerCaseAndNumbers(text) {
  return text.toLowerCase().replace(/[^a-z\d]+/g, "");
}

function segmentSize(string) {
  return Math.ceil( Math.sqrt(string.length) );
}

function textSegments(string, size) {
  let regExp = new RegExp(`(.{1,${size}})`,"g");
  return string.match(regExp);
}
