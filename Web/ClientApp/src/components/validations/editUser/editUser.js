const EditUserValidation = (data) => {
	let errors = {};
	return new Promise((value) => {

		if (data?.address && data?.address.length < 10) {
			errors['address'] = 'آدرس حداقل 10 کارکتر است.'
		}

		if (data?.image && data?.image.size > 4194304) {
			errors['image'] = 'حجم عکس نباید بیشتر از 4 مگابایت باشد.'
		}

		if (data?.selfiImage && data?.selfiImage.size > 4194304) {
			errors['selfiImage'] = 'حجم عکس نباید بیشتر از 4 مگابایت باشد.'
		}

		value(errors);
	});
};

export default EditUserValidation;
