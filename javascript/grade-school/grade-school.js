"use strict";

module.exports = GradeSchool;

function GradeSchool() {
  this._roster = {};
}

GradeSchool.prototype.roster = function roster() {
  return this._roster;
};

GradeSchool.prototype.add = function add(name, grade) {
  if( !this._roster[grade] ) {
    this._roster[grade] = [name];
    return;
  }
  let nameWasInserted = this._roster[grade].some((currentName,index,array) => {
    if( name <= currentName ) {
      array.splice(index,0,name);
      return true;
    }
  });
  if( !nameWasInserted ) this._roster[grade].push(name);
  return;
};

GradeSchool.prototype.grade = function(grade) {
  return this._roster[grade] || [];
};
