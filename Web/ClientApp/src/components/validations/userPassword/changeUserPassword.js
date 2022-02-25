const ChangeUserPasswordValidation = (data) => {
	let errors = {};
	let {prevPassword, newPassword, repeatNewPassword} = data;
	return new Promise((value) => {

		if (!prevPassword || prevPassword.length !== 5) {
			errors['prevPassword'] = 'کلمه عبور قبلی اشتباه است.'
		}

		if (!newPassword || newPassword.length !== 5) {
			errors['newPassword'] = 'کلمه عبور جدید اشتباه است.'
		}

		if (!repeatNewPassword || repeatNewPassword.length !== 5) {
			errors['repeatNewPassword'] = 'تکرار کلمه عبور جدید اشتباه است.'
		}

		if (newPassword !== repeatNewPassword) {
			errors['repeatNewPassword'] = 'کلمه عبور جدید، با تکرار آن مشابه نیست.'
		}

		value(errors);
	});
};

export default ChangeUserPasswordValidation;
