"use strict";

const BRACKET_MAP= {
  "[": "]",
  "{": "}",
  "(": ")"
};

module.exports = function bracketsAreClosed(string) {
  let expectations = [];
  let areClosed = string.split("").every( bracket => {
    let closing = BRACKET_MAP[bracket];
    if(closing) {
      expectations.push(closing);
      return true;
    } else {
      let expected = expectations.pop();
      return (bracket === expected)? true: false;
    }
  });
  return !expectations.length && areClosed;
};
