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
}

const operate = function(operator, a, b) {
    if(operator == add) {
        return add(a, b);
    } else if (operator == subtract) {
        return subtract(a, b);
    } else if (operator == multiply) {
        return multiply(a, b);
    } else if (operator == divide) {
        return divide(a, b);
    } else {
        return "Error. Please choose one of the following: add, subtract, multiply, or divide";
    }

}
const buttons = document.querySelectorAll("button");

const num1 = new Array()
const num2 = new Array();