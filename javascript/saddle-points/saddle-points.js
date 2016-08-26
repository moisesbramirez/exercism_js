"use strict";

module.exports = Matrix;

function Matrix(matrix) {
  this.rows = extractRows(matrix);
  this.columns = extractColumns(matrix, this.rows[0].length);
  this.saddlePoints = saddlePoints(this.rows, this.columns);
}

function saddlePoints(rows, columns) {
  return rows.reduce((points, row, rowIndex) => {
    let indexes = potentialColumns(row, Math.max(...row));
    indexes.forEach((columnIndex) => {
      let column = columns[columnIndex];
      let minInColumn = Math.min(...column);
      if(column[rowIndex] === minInColumn)
        points.push([rowIndex, columnIndex]);
    });
    return points;
  },[]);
}

function potentialColumns(row, max) {
  return row.reduce((indexes, value, index) =>{
    if(value === max) indexes.push(index);
    return indexes;
  },[]);
}

function extractRows(matrix) {
  return matrix.split("\n").
                map(row => row.split(" ")).
                map(row => row.map(toInteger));
}

function extractColumns(matrix, rowLength) {
  let values = toValues(matrix);
  let intoColumns = intoColumnsOfLength(rowLength);
  return values.reduce(intoColumns, collectionOfArrays([], rowLength));
}

function intoColumnsOfLength(length) {
  return function(columns, value, index) {
    columns[index % length].push(value) ;
    return columns;
  }
}

function collectionOfArrays(array, length) {
  while(length--) {
    array.push([]);
  }
  return array;
}

function toValues(matrix) {
  return matrix.split(/\s|\n/g).map(toInteger);
}

function toInteger(value) {
  return parseInt(value);
}
