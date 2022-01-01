import axios from "axios";
import tokenStore from "../../../utils/tokenStore";

export const adminGetAllUsers = () => {
	const token = tokenStore.getAdminToken();
	console.log(token);
	let headers = {
		'Content-Type': 'application/json',
		'Authorization': `Bearer ${token}`
	};

	return axios.get('/api/user/list', {headers}).then((res) => {
		console.log(res);
		return res.data;
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
