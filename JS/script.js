// Получаем все переменные из документа
var keys = document.querySelectorAll('#calculator span');
var operators = ['+', '-', 'x', '÷'];
var decimalAdded = false;

// Добавление onclick для всех клавиш и операций
for (var i = 0; i < keys.length; i++) {
	keys[i].onclick = function (e) {
		// Получение значения входных данных и кнопок
		var input = document.querySelector('.screen');
		var inputVal = input.innerHTML;
		var btnVal = this.innerHTML;

		// Добавление значения клавиш (btnValue) к строке ввода и результат
		// Если нажата клавиша clear, всё стирает
		if (btnVal == 'C') {
			input.innerHTML = '';
			decimalAdded = false;
		}

		// Если нажата клавиша eval, вычислить и отобразить результат
		else if (btnVal == '=') {
			var equation = inputVal;
			var lastChar = equation[equation.length - 1];

			// Замените все операторы x и ÷ на * и / соответственно. Сделано с помощью regex и тега 'g', который заменяет все совпадающие символы/подстроки
			equation = equation.replace(/x/g, '*').replace(/÷/g, '/');

			// Проверяет последний символ уравнения. Если это оператор или десятичная дробь, то удаляет его
			if (operators.indexOf(lastChar) > -1 || lastChar == '.')
				equation = equation.replace(/.$/, '');

			if (equation)
				input.innerHTML = eval(equation);

			decimalAdded = false;
		}

		else if (operators.indexOf(btnVal) > -1) {
			// Оператор нажат
			// Получение последнего символа из уравнения
			var lastChar = inputVal[inputVal.length - 1];

			// Добавить оператор только в том случае, если input не пуст и в нём нет оператора
			if (inputVal != '' && operators.indexOf(lastChar) == -1)
				input.innerHTML += btnVal;

			// Разрешить минус, если строка пуста
			else if (inputVal == '' && btnVal == '-')
				input.innerHTML += btnVal;

			// Заменяет последний оператор (если он существует) на только что нажатый оператор
			if (operators.indexOf(lastChar) > -1 && inputVal.length > 1) {
				// Здесь '.' соответствует любому символу, а $ обозначает конец строки, поэтому все, что (в данном случае это будет оператор) находится в конце строки, будет заменено новым оператором
				input.innerHTML = inputVal.replace(/.$/, btnVal);
			}

			decimalAdded = false;
		}

		// Решение проблемы с десятичными дробями с помощью 'decimalAdded', который устанавливается, как только десятичная дробь будет добавлена, и не позволит добавлять больше десятичных дробей, как только он будет установлен. Он будет сбрасываться при нажатии клавиши operator, eval или clear.
		else if (btnVal == '.') {
			if (!decimalAdded) {
				input.innerHTML += btnVal;
				decimalAdded = true;
			}
		}

		// если нажата какая-либо другая клавиша, просто добавляет ее
		else {
			input.innerHTML += btnVal;
		}

		// предотвратить переходы по страницам
		e.preventDefault();
	}
}