const SignupUserValidation = (data) => {
  let errors = {};
  return new Promise((value) => {
    if (!data?.firstName || data?.firstName.length < 1) {
      errors['firstName'] = 'نام اشتباه است.'
    }
    if (!data?.lastName || data?.lastName.length < 1) {
      errors['lastName'] = 'نام خانوادگی اشتباه است.'
    }

    if (!data?.birthday) {
      errors['birthday'] = 'تاریخ تولد اشتباه است.'
    }

    if (!data?.image || data?.image.length < 1) {
      errors['image'] = 'لطفا عکس مورد نظر را انتخاب کنید.'
    }

    if (!data?.selfiImage || data?.selfiImage.length < 1) {
      errors['selfiImage'] = 'لطفا عکس سلفی خود را انتخاب کنید.'
    }

    if (!data?.address || data?.address.length < 10) {
      errors['address'] = 'آدرس حداقل 10 کارکتر است.'
    }
    value(errors);
  });
};

export default SignupUserValidation;
