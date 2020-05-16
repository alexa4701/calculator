(function calculator() {
  let input = "";
  let finalInput = [];
  let resultFlag = false;
  let zeroFlag = false;

  // DOM selectors
  const numButtons = Array.from(document.querySelectorAll(".number"));
  const opButtons = Array.from(document.querySelectorAll(".operation"));
  const decimalButton = document.querySelector(".decimal");
  const equalButton = document.querySelector(".equals");
  const clearButton = document.querySelector(".clear");
  const backButton = document.querySelector(".back");
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

  backButton.addEventListener("click", back);

  // Updates the calculator screen
  function updateOutput(str) {
    if(str.length > 18){
      str = "Error, too long :(";
      resultFlag = false;
    }
    output.textContent = str;
  }
  
  // Handles number button events
  function number(event) {
    resultFlag = false;
    if(input.match(/[\/\+\-\*]/g)) {
      input = "";
    }
    if(input.length <= 18){
      input += event.target.textContent;
      updateOutput(input);
    }
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
    if(input.match(/[\d]/g) && input) {
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

    // If result is a float, round to 2 places
    if(result % Math.floor(result) !== 0) {
      result = Number(result).toFixed(2);
    }
    resultFlag = true;
    finalInput = [];
    input = "";
    if(zeroFlag) {
      updateOutput("Divided by zero :/");
      zeroFlag = false;
    }
    else {
      updateOutput(result.toString());
    }
  }

  // Handles <- button events
  function back() {
    input = input.substring(0,input.length - 1);
    updateOutput(input);
  }

  // Handles C button events
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
      // Performs the adding and subtracting parts of the array.
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
      // Performs the multiplying and dividing parts of the array.
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
              result = 0;
              zeroFlag = true;
            }
            else {
              result = Number(array[index - 1]) / Number(array[index + 1]);
            }
            array.splice(index - 1, 3, result);
            index = 0;
          }
          index++;
        }
        return array;
      },
    };

    finalInput = operations.multiplyAndDivide(finalInput);
    finalInput = operations.addAndSubtract(finalInput);

    return finalInput.pop();
  }
})();
