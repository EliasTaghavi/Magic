import axios from "axios";
import tokenStore from "../../../utils/tokenStore";

export const adminGetAllUsers = (data) => {
	const {index, size, status, mobile} = data;
	const token = tokenStore.getAdminToken();
	let headers = {
		'Content-Type': 'application/json',
		'Authorization': `Bearer ${token}`
	};
	let body = JSON.stringify({
		index,
		size,
		metaData: {
			status,
			mobile,
		}
	});

	return axios.post('/api/user/list', body,{headers}).then((res) => {
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

export const sendLockUserData = (userId) => {
	const token = tokenStore.getAdminToken();
	let headers = {
		'Content-Type': 'application/json',
		'Authorization': `Bearer ${token}`
	};

	return axios.post(`/api/user/lock?id=${userId}`, null,{headers}).then((res) => {
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
};

export const verifyUser = (userId) => {
	const token = tokenStore.getAdminToken();
	let headers = {
		'Content-Type': 'application/json',
		'Authorization': `Bearer ${token}`
	};
	let body = JSON.stringify({
		// index,
		// size,
		// metaData: {
		// 	status,
		// 	mobile,
		// }
	});

	return axios.post('/api/user/list', body,{headers}).then((res) => {
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
};

export const rejectUser = (userId, message) => {
	const token = tokenStore.getAdminToken();
	let headers = {
		'Content-Type': 'application/json',
		'Authorization': `Bearer ${token}`
	};
	let body = JSON.stringify({
		// index,
		// size,
		// metaData: {
		// 	status,
		// 	mobile,
		// }
	});

	return axios.post('/api/user/list', body,{headers}).then((res) => {
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
};
