/*
  Notes: Input should probably be stored in an array, then can perform chained operations with a loop or
  array method.
  
*/


(function calculator() {
  function operate(num1, num2, operation) {
    let result = 0;
    let operations = {
      add: function(num1, num2) {
        return num1 + num2;
      },
      subtract: function(num1, num2) {
        return num1 - num2;
      },
      multiply: function(num1, num2) {
        return num1 * num2;
      },
      divide: function(num1, num2) {
        if (num2 !== 0){
          return num1 / num2;
        } 
        else {
          return "Error: Oh honey... did you just try and divide by zero? Lolll"
        }
      },
    };

    switch(operation) {
      case "+": 
        result = operations.add(num1, num2);
        break;
      case "-": 
        result = operations.subtract(num1, num2);
        break;
      case "*":
        result = operations.multiply(num1, num2);
        break;
      case "/":
        result = operations.divide(num1, num2);
        break;
      default:
        result = "invalid operation";
    }

    return result;
  }
  
  function updateOutput(input) {
    let output = document.querySelector("#result");
    output.textContent = input;
  }
  
  function numberButton(event) {
    if(event.target.textContent === "+/-") return;
    input += event.target.getAttribute("id");
    updateOutput(input);
  }
  
  function operationButton() {
  
  }

  const numButtons = Array.from(document.querySelectorAll(".number"));
  const opButtons = Array.from(document.querySelectorAll(".operations"));

  let input = "";

  numButtons.forEach(button => {
    button.addEventListener("click", numberButton);
  })

  opButtons.forEach(button => {
    button.addEventListener("click", operationButton);
  });
})();
