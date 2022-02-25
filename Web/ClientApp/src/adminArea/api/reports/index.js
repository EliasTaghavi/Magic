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
	});

	return axios.post('/api/comment/search', body,{headers}).then((res) => {
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
