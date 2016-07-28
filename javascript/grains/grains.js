"use strict";
const BigInt = require('./big-integer');

class Grains {
  constructor(){
    this._store = [new BigInt(1)];

    for(let i = 0; i < 63; i++){
      let bigInt = this._store[i].add(this._store[i]);
      this._store.push(bigInt);
    }
  }

  square(number) {
    return this._store[number-1].toString();
  }

  total(){
    let sum = this._store.reduce( (cumulativeTotal, value) =>
      cumulativeTotal.add(value.toString())
    , new BigInt(0));

    return sum.toString();
  }
}

module.exports = Grains;
