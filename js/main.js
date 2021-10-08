const numbers = document.querySelectorAll(".number");
const header = document.querySelector("h1");
const clearButton = document.querySelector(".clear");

// OPERATIONS //
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;
//------------//

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

function display(e) {
  const number = e.target.textContent;
  if (header.textContent.length <= 14)
    if (header.textContent === "0") {
      header.textContent = number;
    } else {
      header.textContent = `${header.textContent}${number}`;
    }
}

function clear(e) {
  header.textContent = "0";
}

numbers.forEach((number) => {
  number.addEventListener("click", display);
});

clearButton.addEventListener("click", clear);
