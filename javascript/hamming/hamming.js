"use strict";

module.exports =  Hamming;

function Hamming() {

}

Hamming.prototype.compute = function compute(str1, str2) {
  if(str1.length !== str2.length) {
    throw new Error('DNA strands must be of equal length.');
  }
  let diffs = 0;
  let iter = str1.length;
  while(iter--) {
    if(str1[iter] !== str2[iter]) diffs++;
  }
  return diffs;
};
