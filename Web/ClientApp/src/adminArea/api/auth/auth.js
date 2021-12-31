import axios from "axios";

export const sendAdminLogin = (fData) => {
	let {userName, password} = fData;
	let headers = {
		'Content-Type': 'application/json',
	};
	let rawData = {
		username: userName,
		password: password,
	};
	let data = JSON.stringify(rawData);
	return axios.post('/api/Session/createByUP', data, {headers}).then((res) => {
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
