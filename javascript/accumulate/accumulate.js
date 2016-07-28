"use strict";

module.exports = function accumulate(collection, operation) {
  let result = [];
  for(let i = 0; i < collection.length; i++ ) {
    result[i] = operation.call(null, collection[i]);
  }
  return result;
};
