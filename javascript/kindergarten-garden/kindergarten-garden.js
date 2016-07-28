"use strict";

const PLANT_MAP = {
  "C" : "clover",
  "G" : "grass",
  "R" : "radishes",
  "V" : "violets"
};

const DEFAULT_STUDENTS = [
  "alice", "bob", "charlie", "david",
  "eve", "fred", "ginny", "harriet",
  "ileana", "joseph", "kincaid", "larry"];

module.exports = Garden;

function Garden(garden, students) {
  let context = this;
  let botanists = students ?
    students.sort().map(name => name.toLowerCase()) : DEFAULT_STUDENTS;
  botanists.forEach((name, index) => context[name] = getPlants(garden, index));
}

function getPlants(garden, index) {
  let minIndex = (index * 2);
  let plants = garden.split("\n").reduce(
    (studentPlants, row) => {
      return studentPlants += row.substring(minIndex, minIndex + 2);
    },"");
  return plants.split("").map( letter => PLANT_MAP[letter] );
}
