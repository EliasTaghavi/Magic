import tokenStore from "../../../utils/tokenStore";
import axios from "axios";

export const getUserDetailsInShop = (userId) => {
	const token = tokenStore.getShopToken();
	let headers = {
		'Content-Type': 'application/json',
		'Authorization': `Bearer ${token}`
	};
	let body = JSON.stringify(userId);

	return axios.post('/api/shop/getBuyer', body,{headers}).then((res) => {
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
