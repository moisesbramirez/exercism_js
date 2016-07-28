"use strict";

module.exports = Octal;

function Octal(string) {
  this.octalString = validString(string);

  function validString(string) {
    return (/^[0-7]+$/g).test(string)? string : "0";
  }
}

Octal.prototype.toDecimal = function toDecimal() {
  let octalArray = this.octalString.
                    split("").
                    reverse().
                    map( value => parseInt(value) );
  return octalArray.reduce( (sum, value, index) => {
    return sum += value * Math.pow(8,index);
  }, 0);
};
