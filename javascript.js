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
}

const operate = function(chosenOperator, num1, num2) {
    const a = num1.join('');
    const b = num2.join(''); 

    if(chosenOperator == add) {
        return add(a, b);
    } else if (chosenOperator == subtract) {
        return subtract(a, b);
    } else if (chosenOperator == multiply) {
        return multiply(a, b);
    } else if (chosenOperator == divide) {
        return divide(a, b);
    } else {
        return "Error. Please choose one of the following: add, subtract, multiply, or divide";
    }

}
const buttons = document.querySelectorAll("button");

const num1 = new Array();
const num2 = new Array();
const chosenOperator = new Array();
const currentValue = new Array();

buttons.forEach((button ) => {
    button.addEventListener('click', (event) => {
        if (event.target.textContent == "AC") {
            return ac();
        }
        if (!event.target.classList.contains("operator")) {
            num1.push(event.target.textContent);
            display.textContent = num1.join(''); 
        }
        if (event.target.classList.contains("operator")) {
            if (chosenOperator.length > 0){
                chosenOperator.length = 0;
            }
            chosenOperator.push(event.target.id);
        }
    })
})