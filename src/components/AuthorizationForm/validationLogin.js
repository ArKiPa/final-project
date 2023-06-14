export default function validateInn(login) {
	let error = {};
	let result = false;
	if (!login.length) {
		error.message = 'Обязательное поле';
	} else if (String(login).charAt(0) === '+') {
		login = -(-String(login).substr(1));
		if (/[^0-9]/.test(login)) {
			error.message = 'Должны быть только цифры';
		} else if (String(login).length<11) {
			error.message = 'Слишком мало цифр';
		} else if (String(login).length>11) {
			error.message = 'Слишком много цифр';
		} else {result = true}
	} else {result = true}
	return ({'result': result, 'error':error.message});	
}