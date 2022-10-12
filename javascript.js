const add = function(a, b) {
    return a + b;
}

const subtract = function(a, b) {
    return a - b;
}

const multiply = function(a, b) {
    return a * b;
}

const divide = function(a, b) {
    return a / b;
}

const ac = function() {
    display.replaceChildren("0");
    num1.length = 0;
    num2.length = 0;
    currentValue.length = 0;
    chosenOperator.length = 0;
    dec.disabled = false;
}

const buttons = document.querySelectorAll("button");
const dec = document.querySelector("#decimal");

const num1 = new Array();
const num2 = new Array();
const chosenOperator = new Array();
const currentValue = new Array();

const operate = function(operator, a, b) {
    if(operator == 'add') {
        return add(a, b);
    } else if (operator == 'subtract') {
        return subtract(a, b);
    } else if (operator == 'multiply') {
        return multiply(a, b);
    } else if (operator == 'divide') {
        return divide(a, b);
    } else {
        return "Error.";
    }
}

buttons.forEach((button ) => {
    button.addEventListener('click', (event) => {
        const op = event.target.classList.contains("operator");
        const eq = event.target.classList.contains("equals");

        if (event.target.textContent == "AC") {
            return ac();
        }
        if (eq) {
            dec.disabled = false;
            return equals();
        }
        if (event.target == dec) {
            dec.disabled = true;
        }       
        if (num1.length > 0 && num2.length > 0 && currentValue.length > 0) {
            if (!op && !eq) {
                num1.length = 0;
                num2.length = 0;
                currentValue.length = 0;
                num1.push(event.target.textContent);
                display.textContent = event.target.textContent;
            }
            if (op) {
                if (chosenOperator.length > 0) {
                    chosenOperator.length = 0;
                }
                chosenOperator.push(event.target.id);
                dec.disabled = false;
                num1.length = 0;
                num2.length = 0;
                num1.push(currentValue[0]);
            }
        } else if (num1.length > 0 && chosenOperator.length > 0 && !op) {
            num2.push(event.target.textContent);
            display.textContent = num2.join('');
            currentValue.length = 0;
        } else if (!op) {
            num1.push(event.target.textContent);
            display.textContent = num1.join(''); 
        } else if (op) {
            if (chosenOperator.length > 0) {
                chosenOperator.length = 0;
            }
            chosenOperator.push(event.target.id);
            dec.disabled = false;
        } else {
            return "Error.";
        }
    })
})

const equals = function() {
    if (num1.length > 0 && chosenOperator.length > 0 && num2.length > 0) {
         currentValue.length = 0;
         display.textContent = operate(chosenOperator, +num1.join(''), +num2.join(''));
         currentValue.push(operate(chosenOperator, +num1.join(''), +num2.join('')));
    } else if (num1.length > 0 && chosenOperator.length > 0) {
         display.textContent = +num1.join('');
         currentValue.push(display.textContent);
    } else if (num1.length < 1) {
         display.textContent = "0";
    } else {
         return "Error in equals.";
    }
}