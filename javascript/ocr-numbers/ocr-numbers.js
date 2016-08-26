"use strict";

const PATTERN_MAP = {
  "_ | ||_|":"0",
  "|  |":"1",
  "_  _||_":"2",
  "_  _| _|":"3",
  "|_|  |":"4",
  "_ |_  _|":"5",
  "_ |_ |_|":"6",
  "_   |  |":"7",
  "_ |_||_|":"8",
  "_ |_| _|":"9"
};

module.exports = { convert: convert };

function convert(string) {
  if(isMultiLine(string)) {
    let lines = toLines(string);
    let patterns = patternsFromArray(lines);
    return patterns.map(arr => arr.reduce(numberLookup, "")).join(",");
  }
  let patterns = patternsFromString(string);
  return patterns.reduce(numberLookup,"");
}

function numberLookup(conversion, pattern) {
  conversion += PATTERN_MAP[pattern] || "?";
  return conversion;
}

function toLines(string) {
  let occurance = 0;
  let lines = string.replace(/\n/g, (match) => {
    occurance++;
    return (occurance % 4 === 0)? ".": match;
  });
  return lines.split(".");
}

function patternsFromArray(array) {
  return array.map(string => patternsFromString(string));
}

function patternsFromString(string) {
  let rows = string.split("\n");
  let digitCount = Math.floor(rows[0].length / 3);
  if(digitCount > 1) {
    let partials = rows.map(string => string.match(/.{1,3}/g));
    let digits = stringArrayOfLength(digitCount);
    return flattenArray(partials).
            reduce((digits, partial, index) => {
              digits[index % digitCount] += partial;
              return digits;
            }, digits).
            map(pattern => pattern.trim());
  }
  return [rows.join("").trim()];
}

function stringArrayOfLength(length) {
  let array = [];
  while(length--) {
    array.push("");
  }
  return array;
}

function flattenArray(array) {
  return array.reduce((flat, innerArray) => {
    return flat.concat(innerArray);
  },[]);
}

function isMultiLine(string) {
  let rows = string.match(/\n/g);
  return rows.length > 3;
}
