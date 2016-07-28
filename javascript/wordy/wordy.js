"use strict";

const OPERATIONS = {
  "plus": (result, number) => result += number,
  "minus": (result, number) => result -= number,
  "multiplied": (result, number) => result *= number,
  "divided" : (result, number) => result /= number
};

module.exports = { WordProblem: WordProblem, ArgumentError: ArgumentError };

function WordProblem(question) {
  this.question = question;
}

WordProblem.prototype.answer = function answer() {
  let operands = getOperands(this.question);
  let operations = getOperations(this.question);
  if( !operations.length || operands.length < 2 ) throw new ArgumentError();
  return operands.reduce(
    (result, operand, index) => {
      return (index === 0) ?
        OPERATIONS.plus.call(null, result, operand):
        OPERATIONS[operations[index - 1]].call(null, result, operand);
    });
};

function ArgumentError() {
  this.message = "Invalid arguments";
  this.name = "Argument Error";
}

function getOperands(question) {
  return question.split(" ").reduce(
    (numbers, string) => {
      if((/\d/).test(string)) {
        string = string.replace((/\?$/),"");
        numbers.push(parseInt(string));
      }
      return numbers;
    },[]);
}

function getOperations(question) {
  return question.split(" ").reduce(
    (operations, string) => {
      if((/plus|minus|multiplied|divided/).test(string)) {
        operations.push(string);
      }
      return operations
    },[]);
}
