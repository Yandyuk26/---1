const display = document.getElementById('display');
const buttons = document.querySelectorAll('button');

let currentValue = '';
let operator = '';
let previousValue = '';

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.dataset.value;
        const action = button.dataset.action;

        if (value) {
            currentValue += value;
            display.value = currentValue;
        } else if (action) {
            switch (action) {
                case 'add':
                case 'subtract':
                case 'multiply':
                case 'divide':
                    if (currentValue) {
                        previousValue = currentValue;
                        currentValue = '';
                        operator = action;
                    }
                    break;
                case 'equals':
                    if (currentValue && previousValue) {
                        currentValue = calculate(previousValue, currentValue, operator);
                        display.value = currentValue;
                        operator = '';
                        previousValue = '';
                    }
                    break;
                case 'clear':
                    currentValue = '';
                    previousValue = '';
                    operator = '';
                    display.value = '';
                    break;
            }
        }
    });
});

function calculate(a, b, operator) {
    a = parseFloat(a);
    b = parseFloat(b);

    switch (operator) {
        case 'add':
            return (a + b).toString();
        case 'subtract':
            return (a - b).toString();
        case 'multiply':
            return (a * b).toString();
        case 'divide':
            return b !== 0 ? (a / b).toString() : 'Error';
        default:
            return '';
    }
}
