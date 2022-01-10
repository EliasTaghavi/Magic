import tokenStore from "../../../utils/tokenStore";
import axios from "axios";

export const getAdminTransactions = (data) => {
	let {index, size, status, keyword, from, to} = data;
	const token = tokenStore.getAdminToken();
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
				from,
				to,
			}
		}
	});
	console.log(JSON.parse(body));

	return axios.post('/api/payment/search', body,{headers}).then((res) => {
		if (res?.data?.code === '401') {
			return 401;
		} else {
			return res.data;
		}
	})
		.catch((error) => {
			if (error.response.status === 401) {
				return 401;
			} else {
				return false;
			}
		})
}
