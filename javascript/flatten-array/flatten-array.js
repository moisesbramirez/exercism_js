"use strict";

module.exports = Flattener;

function Flattener() { }

Flattener.prototype.flatten = function flatten(array) {
  return array.reduce(
    (cumulativeArray, value) => {
      if( !(value instanceof Array) ) {
        if(value !== null) cumulativeArray.push(value);
        return cumulativeArray;
      }
      return cumulativeArray.concat( flatten(value) );
    },[]);
};
