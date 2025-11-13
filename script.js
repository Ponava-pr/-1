const firstNumber = document.getElementById('firstNumber');
const secondNumber = document.getElementById('secondNumber');
const result = document.getElementById('result');
const opButtons = document.querySelectorAll('.op-btn');

let currentOperator = '+';

function calculate() {
    const num1 = parseFloat(firstNumber.textContent);
    const num2 = parseFloat(secondNumber.textContent);

    if (isNaN(num1) || isNaN(num2)) {
        result.textContent = '';
        return;
    }

    let calculatedResult;

    switch (currentOperator) {
        case '+':
            calculatedResult = num1 + num2;
            break;
        case '-':
            calculatedResult = num1 - num2;
            break;
        case '*':
            calculatedResult = num1 * num2;
            break;
        case '/':
            calculatedResult = num2 !== 0 ? num1 / num2 : 'Ошибка';
            break;
        default:
            calculatedResult = num1 + num2;
    }

    result.textContent =
        calculatedResult === 'Ошибка'
            ? calculatedResult
            : Math.round(calculatedResult * 100) / 100;
}

opButtons.forEach(button => {
    button.addEventListener('click', function () {
        opButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');

        currentOperator = this.textContent;
        calculate();
    });
});

// Редактирование чисел
[firstNumber, secondNumber].forEach(field => {
    field.addEventListener('click', function () {
        this.setAttribute('contenteditable', 'true');
        this.focus();
    });

    field.addEventListener('blur', function () {
        this.setAttribute('contenteditable', 'false');
        calculate();
    });

    field.addEventListener('input', calculate);

    field.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            this.blur();
        }
    });
});
