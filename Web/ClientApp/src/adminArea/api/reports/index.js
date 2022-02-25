import tokenStore from "../../../utils/tokenStore";
import axios from "axios";

export const getReports = (data) => {
	const {index, size} = data;
	const token = tokenStore.getAdminToken();
	let headers = {
		'Content-Type': 'application/json',
		'Authorization': `Bearer ${token}`
	};

	let body = JSON.stringify({
		index,
		size,
		sortField: '',
		order: 0,
		metaData: {
			text: '',
			userName: '',
			email: ''
		}
	});
	console.log(body);

	return axios.post('/api/comment/search', body,{headers}).then((res) => {
		console.log(res);
		if (res?.data?.code === '401') {
			return 401;
		} else {
			return res.data;
		}
	})
		.catch((error) => {
			console.log(error, error.response);
			if (error.response.status === 401) {
				return 401;
			} else {
				return false;
			}
		})
}
