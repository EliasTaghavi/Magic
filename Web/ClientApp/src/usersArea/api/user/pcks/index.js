import tokenStore from "../../../../utils/tokenStore";
import axios from "axios";

export const getPcksData = () => {
	const token = tokenStore.getToken();
	let headers = {
		'Content-Type': 'application/json',
		'Authorization': `Bearer ${token}`
	};
	let body = JSON.stringify({
		index: 1,
		size: 10,
		metaData: {
			title: '',
		}
	});

	return axios.post('/api/pack/list', body,{headers}).then((res) => {
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
