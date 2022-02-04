import axios from "axios";

export const getShopList = () => {
	let headers = {
		'Content-Type': 'application/json',
	};

	return axios.get('/api/shop/list',{headers}).then((res) => {
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
