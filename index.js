const display = document.getElementById("display");

function appendtodisplay(input) {
  display.value += input;
}

function cancel() {
  display.value = "";
}

function calculate() {
  try {
    let expression = display.value;
    let result = evaluateExpression(expression);
    display.value = result;
    // display.value = eval(display.value);
  } catch (error) {
    display.value = "error";
  }
}

function evaluateExpression(expression) {
  let tokens = expression.split(/(\+|\-|\*|\/)/);

  tokens = tokens.filter((token) => token.trim() !== "");

  let result = parseFloat(tokens[0]);

  for (let i = 1; i < tokens.length; i += 2) {
    let operator = tokens[i];
    let operand = parseFloat(tokens[i + 1]);

    if (isNaN(operand)) {
      throw new Error("Invalid expression");
    }

    switch (operator) {
      case "+":
        result += operand;
        break;
      case "-":
        result -= operand;
        break;
      case "*":
        result *= operand;
        break;
      case "/":
        if (operand === 0) {
          throw new Error("Division by zero");
        }
        result /= operand;
        break;
      default:
        throw new Error("Invalid operator");
    }
  }

  return result;
}
