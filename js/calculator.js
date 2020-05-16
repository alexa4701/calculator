(function calculator() {
  let input = "";
  let finalInput = [];
  let resultFlag = false;

  // DOM selectors
  const numButtons = Array.from(document.querySelectorAll(".number"));
  const opButtons = Array.from(document.querySelectorAll(".operation"));
  const decimalButton = document.querySelector(".decimal");
  const equalButton = document.querySelector(".equals");
  const clearButton = document.querySelector(".clear");
  const output = document.querySelector("#result");


  // Add event listeners to buttons
  numButtons.forEach(button => {
    button.addEventListener("click", number);
  })

  opButtons.forEach(button => {
    button.addEventListener("click", operation);
  });

  equalButton.addEventListener("click", equal);

  decimalButton.addEventListener("click", decimal);

  clearButton.addEventListener("click", clear);

  // Updates the calculator screen
  function updateOutput(str) {
    output.textContent = str;
  }
  
  // Handles number button events
  function number(event) {
    resultFlag = false;
    if(input.match(/[\/\+\-\*]/g)) {
      input = "";
    }
    input += event.target.textContent;
    updateOutput(input);
  }

  // Handles decimal button events
  function decimal(event) {
    if(!input) {
      input += (0 + event.target.textContent);
      updateOutput(input);
    }
    else if(input.indexOf(".") === -1) {
      input += event.target.textContent;
      updateOutput(input);
    }
  }
  
  // Handles operation button events
  function operation(event) {
    // If equal button was just pressed, use result as first value
    if(resultFlag) {
      resultFlag = false;
      input = output.textContent
    }
    // if input is not an operation sign and not empty
    if(!input.match(/[\/\+\-\*]/g) && input) {
      finalInput.push(input);
      input = event.target.textContent;
      updateOutput(input);
      finalInput.push(input);
    }
  }

  // Handles equal button events
  function equal() {
    if (input.match(/[\/\+\-\*]/g)) {
      finalInput.pop();
    }
    else {
      finalInput.push(output.textContent);
    }
    
    let result = operate(finalInput);
    console.log({result});
    if(result % Math.floor(result) !== 0) {
      result = Number(result).toFixed(2);
    }
    updateOutput(result);
    finalInput = [];
    input = "";
    resultFlag = true;
  }

  function clear() {
    finalInput = [];
    input = "";
    resultFlag = false;
    updateOutput("0");
  }

  // Performs the operations in the finalInput array
  function operate() {
    let result = 0;
    let operations = {
      addAndSubtract: function(array) {
        index = 0;
        while(array.some(item => item === "+" || item === "-")) {
          // If + or - is found, add/subtract last item and next item, replace all 3 items with result. Reset index.
          if(array[index] === "+") {
            result = Number(array[index - 1]) + Number(array[index + 1]);
            array.splice(index - 1, 3, result);
            index = 0;
          }
          else if(array[index] === "-") {
            result = Number(array[index - 1]) - Number(array[index + 1]);
            array.splice(index - 1, 3, result);
            index = 0;
          }
          index++;
        }
        return array;
      },
      multiplyAndDivide: function(array) {
        let index = 0;
        while(array.some(item => item === "*" || item === "/")) {
          // If * or / is found, multiply/divide last item and next item, replace all 3 items with result. Reset index.
          if(array[index] === "*") {
            result = Number(array[index - 1]) * Number(array[index + 1]);
            array.splice(index - 1, 3, result);
            index = 0;
          }
          if(array[index] === "/") {
            if(array[index + 1] == 0) {
              result = "Error, divide by zero";
            }
            else {
              result = Number(array[index - 1]) / Number(array[index + 1]);
            }
            array.splice(index - 1, 3, result);
            index = 0;
          }
          // If not found, next item.
          index++;
        }
        return array;
      },
    };

    console.log(finalInput);
    // PEMDAS
    finalInput = operations.multiplyAndDivide(finalInput);
    finalInput = operations.addAndSubtract(finalInput);

    return finalInput.pop();
  }
})();
