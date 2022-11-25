const previousOperationText = document.querySelector("#previous");
const currentOperationText = document.querySelector("#current-operation");
const button = document.querySelectorAll("#buttons button");

class calculator {
    constructor(previousOperationText, currentOperationText){
        this.previousOperationText = previousOperationText
        this.currentOperationText = currentOperationText
        this.currentOperation = ""
    }

    // add digit to calculator screen
    addDigit(digit) {
        // check if current operation already a dot
        if(digit === "." && this.currentOperationText.innerText.includes(".")){
            return
        }


        this.currentOperation = digit
        this.updateScreen()
    }
    // Process all calculator operations
    processOperation(operation){    
        // check if current is empy
        if(this.currentOperationText.innerText === "" && operation != "C"){
            //change operation
            if(this.previousOperationText.innerText !== ""){
                this.changeOperation(operation)
            }
            return
        }
        
        
        // Get current and previous value
        let operationValue
        const previous = +this.previousOperationText.innerText.split(" ")[0];
        const current = +this.currentOperationText.innerText;

        switch(operation) {
            case "+":
                operationValue = previous + current
                this.updateScreen(operationValue, operation, current, previous)
                break;
            case "*":
            operationValue = previous * current
            this.updateScreen(operationValue, operation, current, previous)
            break;
            case "/":
                operationValue = previous / current
                this.updateScreen(operationValue, operation, current, previous)
                break;
            case "-":
            operationValue = previous - current
            this.updateScreen(operationValue, operation, current, previous)
            break;
            case "DEL":
            this.processDelOperation()
            break;
            case "CE":
            this.processClearCurrentOperation()
            break;
            case "C":
            this.processCleatOperation()
            break;
            case "=":
            this.processEqualOperator()
            break;
            default:
                return;
        }

    }

    // Change values of calculator screen
    updateScreen(
        operationValue = null, 
        operation = null, 
        current = null, 
        previous = null
        ){


        if( operationValue === null) {
            this.currentOperationText.innerText += this.currentOperation;
        } else {
            // check if value is zero, if it is just and current value
            if(previous === 0){
                operationValue = current
            }

            // Add current value to previous
            this.previousOperationText.innerText = `${operationValue} ${operation}`;
            this.currentOperationText.innerText = "";
        }
    }

    //change math operation
    changeOperation(operation) {
        const mathOperations = ["*", "/", "-", "+"]

        if(!mathOperations.includes(operation)){
            return;
        }

        this.previousOperationText.innerText = this.previousOperationText.innerText.slice(0, -1) + operation;
    }

    // Delet the last digit
    processDelOperation() {
        this.currentOperationText.innerText = this.currentOperationText.innerText.slice(0, -1)
    }

    // Clear current operatio
    processClearCurrentOperation(){
        this.currentOperationText.innerText = "";
    }

    // Clear all operation
    processCleatOperation(){
        this.currentOperationText.innerText = "";
        this.previousOperationText.innerText = "";
    }

    // Process an operation
    processEqualOperator() {
        const operation = previousOperationText.innerText.split(" ")[1];

        this.processOperation(operation)
    }
}

const calc = new calculator(previousOperationText, currentOperationText);

button.forEach((btn) => {
    btn.addEventListener("click", (e) =>{
        const value = e.target.innerText;

        if(+value >= 0 || value === "."){
            calc.addDigit(value)
        } else {
            calc.processOperation(value)
        }
    })
})