class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }
    clear(){
        this.previousOperand = '';
        this.currentOperand = '';
        this.operator = undefined;
    }
    appendNumber(number){
        if(number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand.toString() + number;
    }
    chooseOperator(operator){
        if(this.currentOperand === '') return;
        if(this.previousOperand !== ''){
            this.compute();
        }
        this.operator = operator;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }
    changeSign(number){
        this.currentOperand = -(this.currentOperand);
    }
    compute(){
        let result;
        let previous = parseFloat(this.previousOperand);
        let current = parseFloat(this.currentOperand);
        if(isNaN(previous) || isNaN(current)) return;
        switch(this.operator){
            case '+':
                result = previous + current;
                break;
            case '-':
                result = previous - current;
                break;
            case '*':
                result = previous * current;
                break;
            case '/':
                result = previous / current;
                break;
            case '%':
                result = previous % current;
                break;
            default:
                return;
        }
        this.previousOperand = '';
        this.currentOperand = result;
        this.operator = undefined;
    }
    updateDisplay(){
        this.currentOperandTextElement.innerText = this.currentOperand;
        if(this.operator != null){
            this.previousOperandTextElement.innerText = `${this.previousOperand} ${this.operator}`;
        }
    }
}

const numberButtons = document.querySelectorAll("[data-number");
const operatorButtons = document.querySelectorAll("[data-operator]");
const equalsButton = document.querySelector("[data-equals]");
const changeSignButton = document.querySelector("[data-change-sign]");
const allClearButton = document.querySelector("[data-all-clear]");
const previousOperandTextElement = document.querySelector("[data-previous-operand]");
const currentOperandTextElement = document.querySelector("[data-current-operand]");

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})
operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperator(button.innerText);
        calculator.updateDisplay();
    })
})
equalsButton.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
})
allClearButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
})
changeSignButton.addEventListener('click', button => {
    calculator.changeSign();
    calculator.updateDisplay();
})