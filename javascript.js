const add = function(a, b) {
    return round(a + b);
}

const subtract = function(a, b) {
    return round(a - b);
}

const multiply = function(a, b) {
    return round(a * b);
}

const divide = function(a, b) {
    return round(a / b);
}

const ac = function() {
    display.replaceChildren("0");
    num1.length = 0;
    num2.length = 0;
    currentValue.length = 0;
    chosenOperator.length = 0;
    dec.disabled = false;
}

const round = function(num) {
    var multiplier = Math.pow(10, 4);
    return Math.round(num * multiplier) / multiplier;
}

const backspace = function(arr) {
    newArr = arr.pop();
    if(arr.length < 1) {
        arr.push("0");
    }
    return arr;
}

const negative = function(arr) {
    if (arr[0] == "-") {
        newArr = arr.shift();
    } else {
        arr.unshift("-");
    }
    return arr;
}

const decCheck1 = function() {
    if (num1.includes('.')) {
        dec.disabled = true;
    } else {
        dec.disabled = false;
    }
}

const decCheck2 = function() {
    if (num2.includes('.')) {
        dec.disabled = true;
    } else {
        dec.disabled = false;
    }
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
        const neg = event.target.classList.contains("negative");
        const back = event.target.classList.contains("backspace");

        if (event.target.textContent == "AC") {
            return ac();
        }
        if (eq) {
            return equals();
        }
        if (event.target == dec) {
            dec.disabled = true;
        }
        if (op) {
            //Allows default display of '0' to be used as num1
            if (num1.length < 1 && num2.length < 1) {
                num1.push("0");
            }
        }       
        //if already gone through a full calculation
        if (num1.length > 0 && num2.length > 0 && currentValue.length > 0) {
            //if a number is clicked -it gets rid of previous calc.
            if (!op && !eq && !back && !neg) {
                //Reset array values, push new number to num1, & display it
                num1.length = 0;
                num2.length = 0;
                chosenOperator.length = 0;
                currentValue.length = 0;
                num1.push(event.target.textContent);
                display.textContent = event.target.textContent;
            }
            //if an operator is clicked -it keeps the original sum & continues a new calc. off of it 
            if (op) {
                //if op is clicked AND the previous click was also op
                if (chosenOperator.length > 0) {
                    chosenOperator.length = 0;
                }
                //Push new value to chosenOp., enable dec. again, then push original sum as new num1
                chosenOperator.push(event.target.id);
                dec.disabled = false;
                num1.length = 0;
                num2.length = 0;
                num1.push(currentValue[0]);
                currentValue.length = 0;
            }
            //if num1 & op have been chosen, but not num2 (& !another op)
        } else if (num1.length > 0 && chosenOperator.length > 0 && !op) {
            //Add numbers to num2, display new numbers, & reset previous sum (if any)
            if (neg) {
                negative(num2);
                display.textContent = num2.join('');
            }
            if (back) {
                backspace(num2);
                decCheck2();
                display.textContent = num2.join('');
            }
            if (!back && !neg) {
                if(num2[0] == "0") {
                    newAr = num2.shift();
                }
                if(num2[0] == "-" && num2[1] == "0") {
                    num2.splice(1,1);
                    display.textContent = num2.join('');   
                }
                num2.push(event.target.textContent);
                display.textContent = num2.join('');
                currentValue.length = 0;
            }
        } else if (!op) {
            //Add numbers to num1
            if (neg) {
                negative(num1);
                display.textContent = num1.join('');
            }
            if (back) {
                backspace(num1);
                decCheck1();
                display.textContent = num1.join('');
            }
            if (!back && !neg) {
                if(num1[0] == "0") {
                    newAr = num1.shift();
                }
                if(num1[0] == "-" && num1[1] == "0") {
                    num1.splice(1,1);
                    display.textContent = num1.join('');   
                }
                num1.push(event.target.textContent);
                display.textContent = num1.join(''); 
            }
        } else if (op) {
            //Replace old op w/ new op
            if (chosenOperator.length > 0) {
                chosenOperator.length = 0;
            }
            //Add op to chosenOp. & enable dec.
            currentValue.length = 0;
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
         dec.disabled = false;
    } else if (num1.length > 0 && chosenOperator.length > 0) {
         display.textContent = +num1.join('');
         currentValue.push(display.textContent);
    } else if (num1.length < 1) {
         display.textContent = "0";
    } else {
         return "Error in equals.";
    }
}