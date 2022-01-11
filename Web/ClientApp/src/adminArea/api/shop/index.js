import tokenStore from "../../../utils/tokenStore";
import axios from "axios";

export const SendCreateShopData = (data) => {
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
