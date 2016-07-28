"use strict";
module.exports = Cipher;

function Cipher(key) {
  if((/[A-Z\d]+/g).test(key) || key === "") throw new Error("Bad key");
  this.key = key || "somerandomkeyright";
}

Cipher.prototype.encode = function encode(message) {
 return message.split("").reduce((cipher, value, index) => {
   let characterCode = value.charCodeAt(0);
   let tempCode = characterCode + shiftFactor(this.key, index);
   return cipher += getCharacter(tempCode);
 },"");
};

Cipher.prototype.decode = function encode(cipher) {
 return cipher.split("").reduce((message, value, index) => {
   let characterCode = value.charCodeAt(0);
   let tempCode = characterCode - shiftFactor(this.key, index);
   return message += getCharacter(tempCode);
 },"");
};

function shiftFactor(key, index) {
  return key.charCodeAt(index) - 97;
}

function getCharacter(characterCode) {
  if(characterCode > 122) {
    characterCode = 96 + (characterCode - 122);
  } else if(characterCode < 97) {
    characterCode = 123 - (97 - characterCode);
  }
  return String.fromCharCode(characterCode);
}
