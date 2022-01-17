import axios from "axios";

export const sendShopLoginSms = (mobileNumber) => {
	let headers = {
		'Content-Type': 'application/json',
	};
	return axios.post('/api/Session/CreateByPhone', JSON.stringify({phone: mobileNumber}), {headers}).then((res) => {
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

export const sendShopLoginCode = ({mobile, code}) => {
	let headers = {
		'Content-Type': 'application/json',
	};
	let rawData = {
		phone: mobile,
		token: code,
	};
	let data = JSON.stringify(rawData);
	return axios.post('/api/shop/VerifyTokenByPhone', data, {headers}).then((res) => {
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
