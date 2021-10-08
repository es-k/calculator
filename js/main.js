const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator")
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

const operation = {
  first : 0,
  second : 0,
  operator : "",
}

function displayNumber(e) {
  if (header.textContent === "0"){
    header.textContent = e.target.textContent;
  }
  else{
    header.textContent = `${header.textContent}${e.target.textContent}`;
  }
}

function displayOperator(e){
  if (!operation.operator){
    operation.first = header.textContent;
    operation.operator = e.target.textContent;
    header.textContent = `${header.textContent}${e.target.textContent}`;
  }
  else {
    if ([...header.textContent].includes("*")){
      const [one, two] = header.textContent.split("*");
      operation.second = two;
      header.textContent = operate(operation.first, operation.second, operation.operator);
    }
  }
}

function clearOperation(){
  operation.first = 0;
  operation.second = 0;
  operation.operator = "";
}

function clear(e) {
  header.textContent = "0";
  clearOperation();
}

numbers.forEach((number) => {
  number.addEventListener("click", displayNumber);
});

operators.forEach((operator) => {
  operator.addEventListener("click", displayOperator)
})

clearButton.addEventListener("click", clear);
