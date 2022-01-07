import tokenStore from "../../../../utils/tokenStore";
import axios from "axios";

export const getPcksData = () => {
	const token = tokenStore.getUserToken();
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

export const sendBuyDetails = (packId) => {
	console.log(packId);
	const token = tokenStore.getUserToken();
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
