import tokenStore from "../../../../utils/tokenStore";
import axios from "axios";
import moment from "moment-jalaali";

export const getUserTransactions = (data) => {
	let {index, size, status, keyword, from, to} = data;
	const token = tokenStore.getUserToken();
	let headers = {
		'Content-Type': 'application/json',
		'Authorization': `Bearer ${token}`
	};
	let body = JSON.stringify({
		index,
		size,
		SortField : 'PayDate',
		Order : 1,
		metaData: {
			status,
			keyword: {
				keyword,
			},
			fromToPayDate: {
				from: from ? moment(`${from?.year}/${from?.month}/${from?.day}`, 'jYYYY/jMM/jDD').format('YYYY/MM/DD') : null,
				to: to ? moment(`${to?.year}/${to?.month}/${to?.day}`, 'jYYYY/jMM/jDD').format('YYYY/MM/DD') : null,
			}
		}
	});

	return axios.post('/api/payment/searchUser', body,{headers}).then((res) => {
		console.log(res);
		if (res?.data?.code === '401') {
			return 401;
		} else {
			return res.data;
		}
	})
		.catch((error) => {
			console.log(error);
			if (error.response.status === 401) {
				return 401;
			} else {
				return false;
			}
		})
}
