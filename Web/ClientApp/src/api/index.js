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

export const getShopDetails = (shopId) => {
	let headers = {
		'Content-Type': 'application/json',
	};

	return axios.get(`/api/shop/get?id=${shopId}`,{headers}).then((res) => {
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

export const sendReport = (data) => {
	let {email, description} = data;
	let headers = {
		'Content-Type': 'application/json',
	};
	let body =JSON.stringify( {
		email,
		text: description,
	});

	return axios.post(`/api/comment/add`, body, {headers}).then((res) => {
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
