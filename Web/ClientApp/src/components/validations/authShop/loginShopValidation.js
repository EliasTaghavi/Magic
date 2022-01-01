const LoginShopValidation = (data) => {
  let errors = {};
  let mobileRegex = /^(09)\d{9}$/;
  let onlyNumbersRegex = /^[0-9]+$/;
  return new Promise((value) => {
    if (data?.step === 1) {
      if (!data?.mobile || !mobileRegex.test(data?.mobile?.trim())) {
        errors['mobile'] = 'شماره موبایل اشتباه است.'
      }
    } else if (data?.step === 2) {
      if (!data?.code || data?.code.length !== 4 || !onlyNumbersRegex.test(data?.code)) {
        errors['code'] = 'کد وارد شده اشتباه است.'
      }
    } else {
      // FIXME
    }
    value(errors);
  });
};

export default LoginShopValidation;
