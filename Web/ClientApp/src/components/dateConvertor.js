export const dateConvertor = (date) => {
	let splittedDate = date?.split('/');
	console.log(splittedDate);
	if (date) {
		return {
			day: Number(splittedDate[2]),
			month: Number(splittedDate[1]),
			year: Number(splittedDate[0]),
		}
	} else {
		return '';
	}
}
