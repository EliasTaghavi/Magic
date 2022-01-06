import tokenStore from "../../../utils/tokenStore";
import axios from "axios";

export const getActiveUserPck = (packId) => {
	const token = tokenStore.getToken();
	let headers = {
		'Content-Type': 'application/json',
		'Authorization': `Bearer ${token}`
	};
	let body = JSON.stringify({
		packId,
	});

	return axios.post('/api/payment/createInvoice', body,{headers}).then((res) => {
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
