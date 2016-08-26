"use strict";

const TEEN_INDEXES = [12, 13, 14, 15, 16, 17, 18];

module.exports = function meetupDay(year, month, day, search) {
  let calMonth = new Month(year, month);
  let operations = {
    "teenth": () => calMonth.teenth(day),
    "1st": () => calMonth.nth(day, 0),
    "2nd": () => calMonth.nth(day, 1),
    "3rd": () => calMonth.nth(day, 2),
    "4th": () => calMonth.nth(day, 3),
    "5th": () => calMonth.nth(day, 4),
    "last": () => calMonth.last(day)
  };
  return operations[search].call();
};

function Month(year, month) {
  this.dates = datesInMonth(year, month);
}

Month.prototype.teenth = function teenth(day) {
  let index =  TEEN_INDEXES.find( index => {
    let date = this.dates[index];
    return day === Intl.DateTimeFormat("en-US", {weekday: "long"}).
                    format(date);
  });
  return this.dates[index];
};

Month.prototype.nth = function first(day, nth) {
  let date = findDates(day, this.dates)[nth];
  if(!date) throw new Error();
  return date;
};

Month.prototype.last = function last(day) {
  return findDates(day, this.dates).pop();
};

function findDates(weekday, dates) {
  return dates.filter( date => {
    return weekday === Intl.DateTimeFormat("en-US", {weekday: "long"}).
                    format(date);
  });
}

function datesInMonth(year, month) {
  let testMonth = Intl.DateTimeFormat("en-US", {month: "short"}).
                format(new Date(year, month));
  let regExp = new RegExp(testMonth);
  let dates = [];
  for(let i = 1; i < 32; i++) {
    let date = new Date(year, month, i);
    if( regExp.test(date.toString()) ) dates.push(date);
  }
  return dates;
}
