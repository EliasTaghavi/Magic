import smsCounter from "./smsCounter";

const SMSMaxChar = (description) => {
	let smsNumber = smsCounter(description);
	if (smsNumber === 1) {
		return '70';
	} else if (smsNumber === 2) {
		return '134';
	} else if (smsNumber >= 3) {
		return (134 + (smsNumber - 2) * 67).toString();
	}
};

export default SMSMaxChar;
