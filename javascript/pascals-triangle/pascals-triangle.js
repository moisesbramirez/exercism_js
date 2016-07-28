"use strict";

module.exports = PascalTriangle;

function PascalTriangle(rows) {
  this.rows = generateRows(rows);
  this.lastRow = this.rows[this.rows.length - 1];
}

function generateRows(numberOfRows) {
  let rows = [];
  for(let count = 1; count <= numberOfRows; count++) {
    let row = [1];
    if(count > 1) {
      row = sequence(row, rows[count - 2], count);
    }
    rows.push(row);
  }
  return rows;
}

function sequence(row, previousRow, missingValues) {
  for(let index = 1; index < missingValues; index++) {
    let valueAtIndex = previousRow[index] || 0;
    row.push(previousRow[index - 1] + valueAtIndex);
  }
  return row;
}
