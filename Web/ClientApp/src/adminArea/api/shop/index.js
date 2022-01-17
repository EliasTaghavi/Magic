import tokenStore from "../../../utils/tokenStore";
import axios from "axios";

export const adminGetAllShops = (data) => {
	const {index, size, keyword} = data;
	const token = tokenStore.getAdminToken();
	let headers = {
		'Content-Type': 'application/json',
		'Authorization': `Bearer ${token}`
	};
	let body = JSON.stringify({
		index,
		size,
		sortField: 'createdDate',
		order: 1,
		metaData: {
			keyword: {
				keyword,
			},
		}
	});

	console.log(JSON.parse(body));

	return axios.post('/api/shop/search', body,{headers}).then((res) => {
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

export const deleteShop = (data) => {
	let {id} = data;
	const token = tokenStore.getAdminToken();
	let headers = {
		'Content-Type': 'application/json',
		'Authorization': `Bearer ${token}`
	};

	return axios.post(`/api/shop/delete?id=${id}`, null,{headers}).then((res) => {
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

export const SendCreateShopData = (data) => {
	const {name, phone, ownerFirstName, ownerLastName, ownerMobile, address} = data;
	const token = tokenStore.getAdminToken();
	let headers = {
		'Content-Type': 'application/json',
		'Authorization': `Bearer ${token}`
	};
	let body = JSON.stringify({
		name,
		phone,
		address,
		userMobile: ownerMobile,
		userName: ownerFirstName,
		userSurname: ownerLastName,
	});

	return axios.post('/api/shop/create', body,{headers}).then((res) => {
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
