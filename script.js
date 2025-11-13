// Элементы
const firstNumber = document.getElementById('firstNumber');
const secondNumber = document.getElementById('secondNumber');
const result = document.getElementById('result');
const opButtons = document.querySelectorAll('.op-btn');

let currentOperator = '+';

// Функция вычисления
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

// Обработчики операторов
opButtons.forEach(button => {
    button.addEventListener('click', function () {
        opButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');

        currentOperator = this.textContent;
        calculate();
    });
});

result.addEventListener('click', function () {
    const currentResult = parseFloat(this.textContent);
    if (!isNaN(currentResult) && currentResult >= 0) {
        const sqrtResult = Math.sqrt(currentResult);
        this.textContent = Math.round(sqrtResult * 100) / 100;
    }
});

// Редактирование чисел
firstNumber.addEventListener('click', function () {
    this.setAttribute('contenteditable', 'true');
    this.focus();
});

secondNumber.addEventListener('click', function () {
    this.setAttribute('contenteditable', 'true');
    this.focus();
});

// Пересчёт
firstNumber.addEventListener('blur', function () {
    this.setAttribute('contenteditable', 'false');
    calculate();
});

secondNumber.addEventListener('blur', function () {
    this.setAttribute('contenteditable', 'false');
    calculate();
});

firstNumber.addEventListener('input', calculate);
secondNumber.addEventListener('input', calculate);

// Выход из редактирования
[firstNumber, secondNumber].forEach(field => {
    field.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            this.blur();
        }
    });
});
