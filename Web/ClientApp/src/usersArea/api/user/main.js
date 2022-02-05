import tokenStore from "../../../utils/tokenStore";
import axios from "axios";

export const getActiveUserPck = () => {
	const token = tokenStore.getUserToken();
	let headers = {
		'Content-Type': 'application/json',
		'Authorization': `Bearer ${token}`
	};

	return axios.get('/api/pack/getCurrent',{headers}).then((res) => {
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

export const getUserQrCode = () => {
	const token = tokenStore.getUserToken();
	let headers = {
		'Content-Type': 'application/json',
		'Authorization': `Bearer ${token}`
	};

	return axios.get('/api/user/getQr',{headers}).then((res) => {
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

export const getDiscountChartData = () => {
	const token = tokenStore.getUserToken();
	let headers = {
		'Content-Type': 'application/json',
		'Authorization': `Bearer ${token}`
	};

	return axios.get('/api/buy/GetBenefit',{headers}).then((res) => {
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
