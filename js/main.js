// ELEMENTS //
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
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

assignment.addEventListener("click", evaluate);

deleteButton.addEventListener("click", deleteChar);

signal.addEventListener("click", changeSign);

clearButton.addEventListener("click", clear);
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
    default: return;
  }
}

function displayNumber(e) {
  display.textContent === "0"
    ? (display.textContent = e.target.textContent)
    : (display.textContent = `${display.textContent}${e.target.textContent}`);
}

function splitOperation() {
  if (operation.operator) {
    const [one, two] = display.textContent.split(`${operation.operator}`);
    const split = { one: one, two: two };
    return split;
  }
}

const isLastCharOperator = () => {
  const index = display.textContent.length - 1;
  return display.textContent.charAt(index) === operation.operator;
};

function displayOperator(e) {
  if (!operation.operator) {
    operation.first = display.textContent;
    operation.operator = e.target.textContent;
    display.textContent = `${operation.first}${e.target.textContent}`;
  } else if (!isLastCharOperator()) {
    operation.second = splitOperation().two;
    displayResult();
    clearOperation();
    operation.first = display.textContent;
    operation.operator = e.target.textContent;
    display.textContent = `${operation.first}${e.target.textContent}`;
  }
}

function displayResult() {
  const result = operate(operation.first, operation.second, operation.operator);
  result % 1 === 0
    ? (display.textContent = result)
    : (display.textContent = result.toFixed(3));
}

function evaluate() {
  if (operation.first && operation.operator) {
    operation.second = splitOperation().two;
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

const isNegative = (string) => (string.charAt(0) === "-" ? true : false);
const makeNegative = (string) => `-${string}`;
const makePositive = (string) => string.slice(1);

//prettier-ignore
function changeSign() {
  const str = display.textContent;
  if (!operation.operator) {
    isNegative(str)
      ? (display.textContent = makePositive(str))
      : (display.textContent = makeNegative(str));
  } else {
    const [one, two] = Object.values(splitOperation());
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
