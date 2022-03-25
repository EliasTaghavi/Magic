const addExpertValidation = (data) => {
	let {
		name,
		lastName,
		birthday,
		selfiImage,
		address,
		image,
		mobile,
		password,
	} = data;
	let mobileRegex = /^(09)\d{9}$/;
	let errors = {};
	return new Promise((value) => {
		if (!name || name?.length < 1) {
			errors['name'] = 'نام اشتباه است.'
		}
		if (!lastName || lastName?.length < 1) {
			errors['lastName'] = 'نام خانوادگی اشتباه است.'
		}

		if (!birthday) {
			errors['birthday'] = 'تاریخ تولد اشتباه است.'
		}

		if (!selfiImage || selfiImage?.length < 1) {
			errors['selfiImage'] = 'لطفا عکس سلفی را انتخاب کنید.'
		}

		if (!image || image?.length < 1) {
			errors['image'] = 'لطفا عکس مدرک را انتخاب کنید.'
		}

		if (!address || address.length < 10) {
			errors['address'] = 'آدرس حداقل 10 کارکتر است.'
		}

		if (image?.size > 4194304) {
			errors['image'] = 'حجم عکس نباید بیشتر از 4 مگابایت باشد.'
		}

		if (selfiImage?.size > 4194304) {
			errors['selfiImage'] = 'حجم عکس نباید بیشتر از 4 مگابایت باشد.'
		}

		if (!password && password?.length < 5) {
			errors['password'] = 'کلمه عبور حداقل 5 کاراکتر است.'
		}

		if (!mobile || !mobileRegex.test(mobile?.trim())) {
			errors['mobile'] = 'شماره موبایل اشتباه است.'
		}

		value(errors);
	});
};

export default addExpertValidation;
