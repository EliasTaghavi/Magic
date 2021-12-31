const LoginAdminValidation = ({userName, password}) => {
	let errors = {};
	return new Promise((value) => {
		if (!userName || userName.length < 1) {
			errors['userName'] = 'نام کاربری اشتباه است.';
		}
		if (!password || password.length < 5) {
			errors['password'] = 'کلمه عبور اشتباه است.';
		}
		value(errors);
	});
};

export default LoginAdminValidation;
