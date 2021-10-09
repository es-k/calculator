const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const display = document.querySelector(".display");
const clearButton = document.querySelector(".clear");
const deleteButton = document.querySelector(".delete");
const assignment = document.querySelector(".assignment");

// OPERATIONS //
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;
//------------//

const operation = {
  first: 0,
  second: 0,
  operator: "",
};

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
  if (display.textContent === "0") {
    display.textContent = e.target.textContent;
  } else {
    display.textContent = `${display.textContent}${e.target.textContent}`;
  }
}

function splitOperation() {
  if (operation.operator) {
    const [one, two] = display.textContent.split(`${operation.operator}`);
    const split = { one: one, two: two };
    return split;
  }
}

function displayOperator(e) {
  if (!operation.operator) {
    operation.first = display.textContent;
    operation.operator = e.target.textContent;
    display.textContent = `${display.textContent}${e.target.textContent}`;
  } else {
    operation.second = splitOperation().two;
    displayResult();
    clearOperation();
  }
}

function displayResult() {
  const result = operate(operation.first, operation.second, operation.operator);
  if (result % 1 !== 0) {
    display.textContent = result.toFixed(3);
  } else {
    display.textContent = result;
  }
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
  noLastChar === "" ? display.textContent = "0" : display.textContent = noLastChar;
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

// EVENTS //
numbers.forEach((number) => {
  number.addEventListener("click", displayNumber);
});

operators.forEach((operator) => {
  operator.addEventListener("click", displayOperator);
});

assignment.addEventListener("click", evaluate);

deleteButton.addEventListener("click", deleteChar);

clearButton.addEventListener("click", clear);
// ----- //
