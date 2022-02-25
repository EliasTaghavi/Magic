const ChangeUserPasswordValidation = (data) => {
	let errors = {};
	let {prevPassword, newPassword, repeatNewPassword} = data;
	return new Promise((value) => {

		if (!prevPassword) {
			errors['prevPassword'] = 'کلمه عبور قبلی اشتباه است.'
		}

		if (!newPassword) {
			errors['newPassword'] = 'کلمه عبور جدید اشتباه است.'
		}

		if (!repeatNewPassword) {
			errors['repeatNewPassword'] = 'تکرار کلمه عبور جدید اشتباه است.'
		}

		if (newPassword !== repeatNewPassword) {
			errors['repeatNewPassword'] = 'کلمه عبور جدید، با تکرار آن مشابه نیست.'
		}

		value(errors);
	});
};

export default ChangeUserPasswordValidation;
