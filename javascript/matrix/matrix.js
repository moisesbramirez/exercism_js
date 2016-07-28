"use strict";

module.exports = Matrix;

function Matrix(string){
  this.rows = setRows(string);
  this.columns = setColumns(this.rows);
}

function setRows(string) {
  return string.split("\n").map(
    rowString => rowString.split(" ").map(
      value => parseInt(value)));
};

function setColumns(rows) {
  return rows.reduce(
    (columns, row, rowIndex) => {
      row.forEach((value, valueIndex) => {
        return rowIndex ? columns[valueIndex].push(value):
          columns.push([value]);
      });
      return columns;
    },[]);
}
