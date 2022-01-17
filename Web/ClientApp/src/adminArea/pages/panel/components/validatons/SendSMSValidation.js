const AdminSendSMSValidation = (data) => {
	let errors = {};
	// let mobileRegex = /^(09)\d{9}$/;
	return new Promise((value) => {
		// if (!data?.mobileNumber || data?.mobileNumber.length < 11) {
		// 	errors['mobileNumber'] = 'شماره موبایل نامعتبر است.';
		// } else if (!mobileRegex.test(data?.mobileNumber)) {
		// 	errors['mobileNumber'] = 'شماره موبایل نامعتبر است.';
		// }

		if (!data?.description || data?.description.length < 1) {
			errors['description'] = 'متن پیام اجباری است.';
		}

		value(errors);
	});
};

export default AdminSendSMSValidation;
