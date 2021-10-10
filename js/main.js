"use strict";

// ELEMENTS //
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const period = document.querySelector(".period");
const display = document.querySelector(".display");
const clearButton = document.querySelector(".clear");
const deleteButton = document.querySelector(".delete");
const signal = document.querySelector(".signal");
const assignment = document.querySelector(".assignment");
// -------- //

// EVENTS //
numbers.forEach((number) => {
  number.addEventListener("click", displayNumber);
});

operators.forEach((operator) => {
  operator.addEventListener("click", displayOperator);
});

period.addEventListener("click", displayPeriod);

assignment.addEventListener("click", assign);

deleteButton.addEventListener("click", deleteChar);

signal.addEventListener("click", changeSignal);

clearButton.addEventListener("click", clear);

window.addEventListener("keydown", handleKeyboard);
// ----- //

const operation = {
  first: 0,
  second: 0,
  operator: "",
};

const add = (a, b) => parseFloat(a) + parseFloat(b);
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

//prettier-ignore
function operate(a, b, operator) {
  switch (operator) {
    case "+": return add(a, b);
    case "-": return subtract(a, b);
    case "*": return multiply(a, b);
    case "/": return divide(a, b);
  }
}

function displayNumber(e) {
  const number = e.target.textContent;
  display.textContent === "0"
    ? (display.textContent = number)
    : (display.textContent = `${display.textContent}${number}`);
}

const getSecondNumber = () =>
  display.textContent.replace(`${operation.first}${operation.operator}`, "");

function isLastCharOperator() {
  const index = display.textContent.length - 1;
  return display.textContent.charAt(index) === operation.operator;
}

function displayOperator(e) {
  const operator = e.target.textContent;
  if (!operation.operator) {
    operation.first = display.textContent;
    operation.operator = operator;
    display.textContent = `${operation.first}${operator}`;
  } else if (!isLastCharOperator()) {
    operation.second = getSecondNumber();
    displayResult();
    clearOperation();
    operation.first = display.textContent;
    operation.operator = operator;
    display.textContent = `${operation.first}${operator}`;
  }
}

function displayResult() {
  const result = operate(operation.first, operation.second, operation.operator);
  result % 1 === 0
    ? (display.textContent = result)
    : (display.textContent = result.toFixed(3));
}

const hasPeriod = (string) => string.includes(".");
const addPeriod = () => (display.textContent = display.textContent.concat("."));

function displayPeriod() {
  if (!operation.operator && !hasPeriod(display.textContent)) {
    addPeriod();
  } else if (!hasPeriod(getSecondNumber())) {
    addPeriod();
  }
}

function assign() {
  if (operation.first && operation.operator) {
    operation.second = getSecondNumber();
    displayResult();
    clearOperation();
  }
}

function deleteChar() {
  const str = display.textContent;
  const lastChar = str.charAt(str.length - 1);
  if (lastChar === operation.operator) operation.operator = "";
  const noLastChar = str.slice(0, -1);
  noLastChar === ""
    ? (display.textContent = "0")
    : (display.textContent = noLastChar);
}

const isNegative = (string) => string.charAt(0) === "-";
const makeNegative = (string) => `-${string}`;
const makePositive = (string) => string.slice(1);

//prettier-ignore
function changeSignal() {
  const str = display.textContent;
  if (!operation.operator) {
    isNegative(str)
      ? (display.textContent = makePositive(str))
      : (display.textContent = makeNegative(str));
  } else {
    const two = getSecondNumber();
    isNegative(two)
      ? (display.textContent = `${one}${operation.operator}${makePositive(two)}`)
      : (display.textContent = `${one}${operation.operator}${makeNegative(two)}`);
  }
}

function clearOperation() {
  operation.first = 0;
  operation.second = 0;
  operation.operator = "";
}

function clear() {
  display.textContent = "0";
  clearOperation();
}

//prettier-ignore
function handleKeyboard(e) {
  const key = document.querySelector(`button[data-key="${e.key}"]`);
  if (key) { 
    const event = { target: key };
    switch(key.className) {
      case "number": displayNumber(event); break;
      case "operator": displayOperator(event); break;
      case "period": displayPeriod(); break;
      case "assignment": assign(); break;
      case "delete": deleteChar(); break;
      case "clear": clear(); break;
    }
  }
}
