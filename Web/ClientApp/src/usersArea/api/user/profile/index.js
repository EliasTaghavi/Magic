import tokenStore from "../../../../utils/tokenStore";
import axios from "axios";

export const getUserDetails = () => {
	const token = tokenStore.getUserToken();
	let headers = {
		'Content-Type': 'application/json',
		'Authorization': `Bearer ${token}`
	};

	return axios.get('/api/user/profileDetails',{headers}).then((res) => {
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
