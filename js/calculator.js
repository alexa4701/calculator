"use strict";

const CalculateModule = (function () {
  const addAndSubtract = function (array) {
    let result = 0;
    let index = 0;
    while (array.some(item => item === "+" || item === "-")) {
      // If + or - is found, add/subtract last item and next item, replace all 3 items with result. Reset index.
      if (array[index] === "+") {
        result = Number(array[index - 1]) + Number(array[index + 1]);
        array.splice(index - 1, 3, result);
        index = 0;
      }
      else if (array[index] === "-") {
        result = Number(array[index - 1]) - Number(array[index + 1]);
        array.splice(index - 1, 3, result);
        index = 0;
      }
      index++;
    }
    return array;
  };
  const multiplyAndDivide = function (array) {
    let result = 0;
    let index = 0;
    while (array.some(item => item === "*" || item === "/")) {
      // If * or / is found, multiply/divide last item and next item, replace all 3 items with result. Reset index.
      if (array[index] === "*") {
        result = Number(array[index - 1]) * Number(array[index + 1]);
        array.splice(index - 1, 3, result);
        index = 0;
      }
      if (array[index] === "/") {
        if (array[index + 1] == 0) {
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
  };

  return {
    operate: function (finalInput) {
      finalInput = multiplyAndDivide(finalInput);
      finalInput = addAndSubtract(finalInput);

      return finalInput.pop();
    },
  }
})();

const UIModule = (function () {
  let input = "";
  let finalInput = [];
  let resultFlag = false;
  let zeroFlag = false;

  // DOM selectors
  const elements = {
    numButtons: Array.from(document.querySelectorAll(".number")),
    opButtons: Array.from(document.querySelectorAll(".operation")),
    decimalButton: document.querySelector(".decimal"),
    equalButton: document.querySelector(".equals"),
    clearButton: document.querySelector(".clear"),
    backButton: document.querySelector(".back"),
    output: document.querySelector("#result"),
  }

  // Updates the calculator screen
  const updateOutput = function (str) {
    if (str.length > 18) {
      str = "Error, too long :(";
      resultFlag = false;
    }
    elements.output.textContent = str;
  }

  // Handles number button events
  const number = function (event) {
    resultFlag = false;
    if (input.match(/[\/\+\-\*]/g)) {
      input = "";
    }
    if (input.length <= 18) {
      input += event.target.textContent;
      updateOutput(input);
    }
  }

  // Handles decimal button events
  const decimal = function (event) {
    if (!input) {
      input += (0 + event.target.textContent);
      updateOutput(input);
    }
    else if (input.indexOf(".") === -1) {
      input += event.target.textContent;
      updateOutput(input);
    }
  }

  // Handles operation button events
  const operation = function (event) {
    // If equal button was just pressed, use result as first value
    if (resultFlag) {
      resultFlag = false;
      input = elements.output.textContent
    }
    // if input is not an operation sign and not empty
    if (input.match(/[\d]/g) && input) {
      finalInput.push(input);
      input = event.target.textContent;
      updateOutput(input);
      finalInput.push(input);
    }
  }

  // Handles <- button events
  const back = function () {
    input = input.substring(0, input.length - 1);
    updateOutput(input);
  }

  // Handles C button events
  const clear = function () {
    finalInput = [];
    input = "";
    resultFlag = false;
    updateOutput("0");
  }

  // Handles equal button events
  const equal = function () {
    if (input.match(/[\/\+\-\*]/g)) {
      finalInput.pop();
    }
    else {
      finalInput.push(elements.output.textContent);
    }

    let result = CalculateModule.operate(finalInput);

    // If result is a float, round to 2 places
    if (result % Math.floor(result) !== 0) {
      result = Number(result).toFixed(2);
    }
    resultFlag = true;
    finalInput = [];
    input = "";
    if (zeroFlag) {
      updateOutput("Divided by zero :/");
      zeroFlag = false;
    }
    else {
      updateOutput(result.toString());
    }
  };

  // Add event listeners to buttons
  elements.numButtons.forEach(button => {
    button.addEventListener("click", number);
  })
  elements.opButtons.forEach(button => {
    button.addEventListener("click", operation);
  });
  elements.equalButton.addEventListener("click", equal);
  elements.decimalButton.addEventListener("click", decimal);
  elements.clearButton.addEventListener("click", clear);
  elements.backButton.addEventListener("click", back);
})();
