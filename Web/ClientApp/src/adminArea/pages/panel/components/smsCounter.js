const smsCounter = (description) => {
	let length = description.length;
	if (length <= 70) {
		return 1;
	} else if (length < 135) {
		return 2;
	} else if (length < 202) {
		return 3;
	} else {
		return Math.ceil((length - 201) / 67) + 3;
	}
};

export default smsCounter;
