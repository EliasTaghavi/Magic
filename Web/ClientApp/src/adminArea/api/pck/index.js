import tokenStore from "../../../utils/tokenStore";
import axios from "axios";

export const sendAddPckData = (data) => {
	const {dayCount, title, price, description} = data;
	const token = tokenStore.getAdminToken();
	let headers = {
		'Content-Type': 'application/json',
		'Authorization': `Bearer ${token}`
	};
	let body = JSON.stringify({
		dayCount,
		title,
		price,
		description,
	});

	return axios.post('/api/pack/create', body,{headers}).then((res) => {
		return res.data;
	})
		.catch((error) => {
			if (error.response.status === 401) {
				return 401;
			} else {
				return false;
			}
		})
}

export const adminGetAllPcks = (data) => {
	const {index, size, title} = data;
	const token = tokenStore.getAdminToken();
	let headers = {
		'Content-Type': 'application/json',
		'Authorization': `Bearer ${token}`
	};
	let body = JSON.stringify({
		index,
		size,
		metaData: {
			title,
		}
	});

	return axios.post('/api/pack/list', body,{headers}).then((res) => {
		return res.data;
	})
		.catch((error) => {
			if (error.response.status === 401) {
				return 401;
			} else {
				return false;
			}
		})
}
