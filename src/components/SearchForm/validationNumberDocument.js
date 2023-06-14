export default function validateInn(testNumberDocument) {
	let error = {};
	let result = false;
	if (!testNumberDocument.length) {
		error.message = 'Обязательное поле';
	} else if (/[^0-9]/.test(testNumberDocument)) {
		error.message = 'Должны быть только цифры';
	} else if (testNumberDocument>1000) {
		error.message = 'Слишком большое число';
	} else {result = true}
	return ({'result': result, 'error':error.message});
}