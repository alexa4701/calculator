/*
  Notes: Input should probably be stored in an array, then can perform chained operations with a loop or
  array method.
  
*/


(function calculator() {
  let input = "";
  let finalInput = [];

  // DOM selectors
  const numButtons = Array.from(document.querySelectorAll(".number"));
  const opButtons = Array.from(document.querySelectorAll(".operation"));
  const equalButton = document.querySelector(".equals");

  // Add event listeners to buttons
  numButtons.forEach(button => {
    button.addEventListener("click", number);
  })

  opButtons.forEach(button => {
    button.addEventListener("click", operation);
  });

  equalButton.addEventListener("click", equal);

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
  
  function updateOutput() {
    let output = document.querySelector("#result");
    output.textContent = input;
  }
  
  function number(event) {
    if(event.target.textContent === "+/-") return;
    if(input.match(/[\/\+\-\*]/g)) {
      finalInput.push(input);
      input = "";
    }
    input += event.target.textContent;
    updateOutput();
  }
  
  function operation(event) {
    if(!input.match(/[\/\+\-\*]/g) && input) {
      finalInput.push(input);
      input = event.target.textContent;
      console.log({finalInput});
      updateOutput();
    }
  }

  function equal() {}
})();
