let currentInput = '';
let history = [];
let currentOperation = null;

const operations = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a, b) => a / b,
    '**': (a, b) => a ** b,
    'sqrt': (a) => Math.sqrt(a),
};

function appendToDisplay(value) {
    currentInput += value;
    updateDisplay();
}

function operate(operation) {
    if (currentOperation) {
        calculate();
    }
    currentOperation = operation;
    currentInput += ` ${operation} `;
    updateDisplay();
}

function calculate() {
    try {
        const inputArray = currentInput.split(' ');
        const [operand1, operator, operand2] = inputArray;

        if (operator in operations) {
            const result = operations[operator](parseFloat(operand1), parseFloat(operand2));
            history.push(`${currentInput} = ${result}`);
            currentInput = result;
            currentOperation = null;
            updateDisplay();
            updateHistory();
        } else {
            throw new Error('Invalid operator');
        }
    } catch (error) {
        currentInput = 'Error';
        updateDisplay();
    }
}

function reset() {
    currentInput = '';
    currentOperation = null;
    updateDisplay();
}

function undo() {
    if (currentInput.length > 0) {
        currentInput = currentInput.slice(0, -1);
        updateDisplay();
    }
}

function updateDisplay() {
    document.getElementById('display').value = currentInput;
}

function updateHistory() {
    const historyElement = document.getElementById('history');
    historyElement.innerHTML = '';
    for (const entry of history) {
        const entryElement = document.createElement('div');
        entryElement.textContent = entry;
        historyElement.appendChild(entryElement);
    }
}

function clearHistory() {
    history = [];
    updateHistory();
}