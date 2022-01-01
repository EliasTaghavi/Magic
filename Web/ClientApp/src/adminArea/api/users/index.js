import axios from "axios";
import tokenStore from "../../../utils/tokenStore";

export const adminGetAllUsers = (data) => {
	const {index, size, confirmed, mobile} = data;
	const token = tokenStore.getAdminToken();
	console.log(token);
	let headers = {
		'Content-Type': 'application/json',
		'Authorization': `Bearer ${token}`
	};
	let body = JSON.stringify({
		index,
		size,
		metaData: {
			confirmed,
			mobile,
		}
	})

	return axios.post('/api/user/list', body,{headers}).then((res) => {
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
