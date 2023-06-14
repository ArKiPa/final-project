export default function validateInn(inn, error) {
	let result = false;
	if (!inn.length) {
		error.message = 'Обязательное поле';
	} else if (/[^0-9]/.test(inn)) {
		error.message = 'Должны быть только цифры';
	} else if ([10, 12].indexOf(inn.length) === -1) {
		error.message = 'Неправильное количество цифр';
	} else {
		let checkDigit = function (inn, coefficients) {
			let n = 0;
			for (let i in coefficients) {
				n += coefficients[i] * inn[i];
			}
			return parseInt(n % 11 % 10);
		};
		switch (inn.length) {
			case 10:
				let n10 = checkDigit(inn, [2, 4, 10, 3, 5, 9, 4, 6, 8]);
				if (n10 === parseInt(inn[9])) {
					result = true;
				}
				break;
			case 12:
				let n11 = checkDigit(inn, [7, 2, 4, 10, 3, 5, 9, 4, 6, 8]);
				let n12 = checkDigit(inn, [3, 7, 2, 4, 10, 3, 5, 9, 4, 6, 8]);
				if ((n11 === parseInt(inn[10])) && (n12 === parseInt(inn[11]))) {
					result = true;
				}
				break;
		}
		if (!result) {
			error.message = 'Неправильное контрольное число';
		}
	}
	return ({'result': result, 'error':error.message});
}