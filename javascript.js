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
}

const buttons = document.querySelectorAll("button");

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
        if (currentValue.length > 0) {
            num1.length = 0;
            num2.length = 0;
            num1.push(currentValue[0]);
        }
        if (num1.length > 0 && chosenOperator.length > 0 && !op) {
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
        } else {
            return "Error.";
        }
    })
})