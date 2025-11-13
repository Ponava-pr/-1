// Элементы
const firstNumber = document.getElementById('firstNumber');
const secondNumber = document.getElementById('secondNumber');
const result = document.getElementById('result');
const opButtons = document.querySelectorAll('.op-btn');

let currentOperator = '+';

// Основная функция
function calculate() {
    const num1 = parseFloat(firstNumber.textContent);
    const num2 = parseFloat(secondNumber.textContent);

    if (isNaN(num1) || isNaN(num2)) {
        result.textContent = '';
        return;
    }

    let output;

    switch (currentOperator) {
        case '+': output = num1 + num2; break;
        case '-': output = num1 - num2; break;
        case '*': output = num1 * num2; break;
        case '/': output = num2 === 0 ? 'Ошибка' : num1 / num2; break;
        default:  output = num1 + num2;
    }

    result.textContent = output === 'Ошибка'
        ? output
        : Math.round(output * 100) / 100;
}

// Переключение операторов
opButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        opButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentOperator = btn.textContent;
        calculate();
    });
});

// Квадратный корень по клику на результат
result.addEventListener('click', () => {
    const value = parseFloat(result.textContent);
    if (!isNaN(value) && value >= 0) {
        result.textContent = Math.round(Math.sqrt(value) * 100) / 100;
    }
});

// Активация редактирования чисел
[firstNumber, secondNumber].forEach(field => {
    field.addEventListener('click', () => {
        field.setAttribute('contenteditable', 'true');
        field.focus();
    });

    field.addEventListener('blur', () => {
        field.setAttribute('contenteditable', 'false');
        calculate();
    });

    field.addEventListener('input', calculate);

    field.addEventListener('keypress', e => {
        if (e.key === 'Enter') field.blur();
    });
});

