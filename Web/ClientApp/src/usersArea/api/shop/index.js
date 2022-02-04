import tokenStore from "../../../utils/tokenStore";
import axios from "axios";

export const getShopDashboardData = () => {
	const token = tokenStore.getShopToken();
	let headers = {
		'Content-Type': 'application/json',
		'Authorization': `Bearer ${token}`
	};

	return axios.get('api/Buy/GetShopStatistics',{headers}).then((res) => {
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
