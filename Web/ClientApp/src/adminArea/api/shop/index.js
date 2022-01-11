import tokenStore from "../../../utils/tokenStore";
import axios from "axios";

export const SendCreateShopData = (data) => {
	const {name, phone, ownerFirstName, ownerLastName, ownerMobile, address} = data;
	const token = tokenStore.getAdminToken();
	let headers = {
		'Content-Type': 'application/json',
		'Authorization': `Bearer ${token}`
	};
	let body = JSON.stringify({
		name,
		phone,
		address,
		userMobile: ownerMobile,
		userName: ownerFirstName,
		userSurname: ownerLastName,
	});

	return axios.post('/api/shop/create', body,{headers}).then((res) => {
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
