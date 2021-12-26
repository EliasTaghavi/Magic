const SignupShopValidation = (data) => {
  let errors = {};
  let onlyNumbersRegex = /^[0-9]+$/;
  return new Promise((value) => {
    if (!data?.shopName || data?.shopName.length < 1) {
      errors['shopName'] = 'نام فروشگاه اشتباه است.'
    }

    if (!data?.shopPhone || !onlyNumbersRegex.test(data?.shopPhone)) {
      errors['shopPhone'] = 'شماره تلفن فروشگاه اشتباه است.'
    }

    if (!data?.shopAddress || data?.shopAddress.length < 10) {
      errors['shopAddress'] = 'آدرس فروشگاه اشتباه است.'
    }

    if (!data?.shopPassword || data?.shopPassword.length < 5) {
      errors['shopPassword'] = 'پسوورد حداقل 5 کاراکتر است.'
    }
    value(errors);
  });
};

export default SignupShopValidation;
