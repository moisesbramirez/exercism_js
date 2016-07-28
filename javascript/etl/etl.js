"use strict";

module.exports = ETL;

function ETL() {}

ETL.prototype.transform = function transform(hash) {
  let newHash = {};

  for(let key in hash) {
    hash[key].forEach( value => newHash[value.toLowerCase()] = +key );
  }
  return newHash;
};
