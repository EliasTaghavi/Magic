const createPckValidation = (data) => {
	let {name, price, duration} = data;
	let onlyNumbersRegex = /^[0-9]+$/;
	let errors = {};
	return new Promise((value) => {
		if (!name || name?.length < 1) {
			errors['name'] = 'نام اشتباه است.';
		}
		if (!price || !onlyNumbersRegex.test(price)) {
			errors['price'] = 'قیمت اشتباه است.';
		}
		if (!duration || duration?.length < 1) {
			errors['duration'] = 'مدت زمان اشتباه است.';
		}
		value(errors);
	});
};

export default createPckValidation;
