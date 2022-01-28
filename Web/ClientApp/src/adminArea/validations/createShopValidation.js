const CreateShopValidation = (data) => {
	let {name, phone, ownerFirstName, ownerLastName, ownerMobile, discount, address, refCode} = data;
	let onlyNumbersRegex = /^[0-9]+$/;
	let onlyFloatNumber = /^-?\d*(\.\d+)?$/;
	let mobileRegex = /^(09)\d{9}$/;
	let errors = {};
	return new Promise((value) => {
		if (!name || name?.length < 1) {
			errors['name'] = 'نام اشتباه است.';
		}
		if (!phone || !onlyNumbersRegex.test(phone)) {
			errors['phone'] = 'شماره تماس اشتباه است.';
		}
		if (!ownerFirstName || ownerFirstName?.length < 1) {
			errors['ownerFirstName'] = 'نام صاحب فروشگاه اشتباه است.';
		}
		if (!ownerLastName || ownerLastName?.length < 1) {
			errors['ownerLastName'] = 'نام خانوادگی صاحب فروشگاه اشتباه است.';
		}
		if (!ownerMobile || !mobileRegex.test(ownerMobile)) {
			errors['ownerMobile'] = 'شماره موبایل صاحب فروشگاه اشتباه است.';
		}
		if (!ownerMobile || !mobileRegex.test(ownerMobile)) {
			errors['ownerMobile'] = 'شماره موبایل صاحب فروشگاه اشتباه است.';
		}
		if (!discount || discount.length < 1 || !onlyFloatNumber.test(discount)) {
			errors['discount'] = 'تخفیف اشتباه است.';
		}
		if (!address || address?.length < 1) {
			errors['address'] = 'آدرس فروشگاه اشتباه است.';
		}
		if (!refCode || refCode?.length < 1) {
			errors['refCode'] = 'کد معرف فروشگاه اشتباه است.';
		}
		value(errors);
	});
};

export default CreateShopValidation;
