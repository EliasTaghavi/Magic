import React from 'react';
import {useShallowPickerSelector} from "../../store/selectors";

const CompleteProfileAlert = () => {
	const userData = useShallowPickerSelector('user', ['userData']);

	if (!userData?.identityURL && userData?.isStudent) {
		return (
			<div className="w-100 alert alert-warning">
				<p className="font-weight-bold fs16 alert-heading">توجه!</p>
				<p>اطلاعات حساب کاربری شما تکمیل نشده است. در صورت خرید پکیج و عدم تکمیل اطلاعات حساب کاربری در مدت یک هفته،
					مدت زمان استفاده از پکیج به نصف کاهش می یابد.</p>
			</div>
		);
	} else {
		return null;
	}
}

export default CompleteProfileAlert;
