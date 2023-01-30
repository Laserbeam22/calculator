//BASIC FUNCTIONS

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
    let sum = a / b;
    if (sum == "Infinity" || sum == "-Infinity") {
        const modal = document.querySelector('.modal');
        openModal(modal);
    }
    return round(sum);
}

const allClear = function() {
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

const isDec = function(num) {
    if (num.includes('.')) {
        dec.disabled = true;
    } else {
        dec.disabled = false;
    }
}

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

//GLOBAL CONSTANTS

const buttons = document.querySelectorAll("button");
const dec = document.querySelector("#decimal");

const num1 = new Array();
const num2 = new Array();
const chosenOperator = new Array();
const currentValue = new Array();

//MAIN EVENT LISTENER --contains main logic for calculator

buttons.forEach((button ) => {
    button.addEventListener('click', (e) => {
        const op = e.target.classList.contains("operator");
        const eq = e.target.classList.contains("equals");
        const neg = e.target.classList.contains("negative");
        const back = e.target.classList.contains("backspace");
        const change = document.querySelector("#change");

        if(e.target == change) {
            if(dec.classList.contains("active")) {
                return undoChange();
            } else {
                return changeStyle();
            }
        }
        if (e.target.textContent == "AC") {
            return allClear();
        }
        if (eq) {
            return equals();
        }
        if (e.target == dec) {
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
                num1.push(e.target.textContent);
                display.textContent = e.target.textContent;
            }
            //if an operator is clicked -it keeps the original sum & continues a new calc. off of it 
            if (op) {
                //if op is clicked AND the previous click was also op
                if (chosenOperator.length > 0) {
                    chosenOperator.length = 0;
                }
                //Push new value to chosenOp., enable dec. again, then push original sum as new num1
                chosenOperator.push(e.target.id);
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
                isDec(num2);
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
                num2.push(e.target.textContent);
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
                isDec(num1);
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
                num1.push(e.target.textContent);
                display.textContent = num1.join(''); 
            }
        } else if (op) {
            //Allows continual calculations w/o needing the equals button
            if (chosenOperator.length > 0) {
                equals();
                chosenOperator.length = 0;
                num1.length = 0;
                num2.length = 0;
                num1.push(currentValue[0]);
            }
            //Add op to chosenOp. & enable dec.
            currentValue.length = 0;
            chosenOperator.push(e.target.id);
            dec.disabled = false;
        } else {
            return "Error.";
        }
    })
})

//KEYBOARD SUPPORT

document.addEventListener('keydown', (e) => {
    if(overlay.classList != "active") {
        if(e.key == '+') {document.getElementById('add').click();}
        if(e.key == '-') {document.getElementById('subtract').click();}
        if(e.key == '*') {document.getElementById('multiply').click();}
        if(e.key == "/") {document.getElementById('divide').click();}
        if(e.key == '.') {document.getElementById('decimal').click();}
        if(e.key == 'Escape') {document.getElementById('ac').click();}
        if(e.key == 'Enter') {document.getElementById('equals').click();}
        if(e.key == '–') {document.getElementById('negative').click();}
        if(e.key == 'Backspace') {document.getElementById('backspace').click();}
        if(e.key == '0') {document.getElementById('zero').click();}
        if(e.key == '1') {document.getElementById('one').click();}
        if(e.key == '2') {document.getElementById('two').click();}
        if(e.key == '3') {document.getElementById('three').click();}
        if(e.key == '4') {document.getElementById('four').click();}
        if(e.key == '5') {document.getElementById('five').click();}
        if(e.key == '6') {document.getElementById('six').click();}
        if(e.key == '7') {document.getElementById('seven').click();}
        if(e.key == '8') {document.getElementById('eight').click();}
        if(e.key == '9') {document.getElementById('nine').click();}
    }
    if(overlay.classList == "active") {
        if(e.key == "Escape") {
            document.getElementById("close").click();
        }
    }
})

//STYLE CHANGE FUNCTIONS

const changeStyle = function() {
    document.body.classList.add("active");
    document.querySelector("#container").classList.add("active");
    document.querySelector("#display").classList.add("active");
    document.querySelectorAll(".operator").forEach(op => {
        op.classList.add("active");
    })
    document.querySelectorAll(".number").forEach(button => {
        button.classList.add("active");
    })
    document.querySelector("#negative").classList.add("active");
    document.querySelector("#ac").classList.add("active");
    document.querySelector("#backspace").classList.add("active");
    document.querySelector("#equals").classList.add("active");
    dec.classList.add("active");
}

const undoChange = function() {
    document.body.classList.remove("active");
    document.querySelector("#container").classList.remove("active");
    document.querySelector("#display").classList.remove("active");
    document.querySelectorAll(".operator").forEach(op => {
        op.classList.remove("active");
    })
    document.querySelectorAll(".number").forEach(button => {
        button.classList.remove("active");
    })
    document.querySelector("#negative").classList.remove("active");
    document.querySelector("#ac").classList.remove("active");
    document.querySelector("#backspace").classList.remove("active");
    document.querySelector("#equals").classList.remove("active");
    dec.classList.remove("active");
}

//MODAL SECTION

const closeModalButtons = document.querySelectorAll('[data-close-button]');
const overlay = document.getElementById('overlay');

function openModal(modal) {
    if (modal == null) return
    modal.classList.add('active')
    overlay.classList.add('active')
}

function closeModal(modal) {
    if (modal == null) return
    modal.classList.remove('active')
    overlay.classList.remove('active')
    ac();
}

closeModalButtons.forEach(button => {
    button.addEventListener('click', () => {
      const modal = button.closest('.modal')
      closeModal(modal)
    })
})

overlay.addEventListener('click', () => {
    const modals = document.querySelectorAll('.modal.active')
    modals.forEach(modal => {
      closeModal(modal)
    })
})