const PageNumberGenerator = (totalCount, pageSize) => {
	if (totalCount === 0) {
		totalCount = 1;
	}
	return new Promise(result => {
		console.log(12, totalCount, pageSize, pageSize >= totalCount);
		let value;
		if (pageSize >= totalCount) {
			result([1]);
		} else {
			if (totalCount % pageSize === 0) {
				value = totalCount / pageSize;
				generateNumbers(value)
					.then((response) => {
						console.log(1, response, value);
						result(response);
					})
			} else {
				value =  totalCount / pageSize + 1;
				generateNumbers(value)
					.then((response) => {
						console.log(2, response);
						result(response);
					})
			}
		}
	})
};

const generateNumbers = (value) => {
	return new Promise((result) => {
		let numbers = [];
		for (let i = 1; i <= value; i++) {
			numbers = [...numbers, i];
		}
		result(numbers);
	})
};

export default PageNumberGenerator;
