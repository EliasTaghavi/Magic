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
	const {name, phone, ownerFirstName, ownerLastName, ownerMobile, discount, address, refCode, password} = data;
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
		LatestOff: discount,
		refcode: refCode,
		password,
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

export const editDiscount = (data) => {
	const {newDiscount, shopId} = data;
	const token = tokenStore.getAdminToken();
	let headers = {
		'Content-Type': 'application/json',
		'Authorization': `Bearer ${token}`
	};
	let body = JSON.stringify({
		shopId,
		percentage: newDiscount,
	});

	return axios.post('/api/shop/updateOff', body,{headers}).then((res) => {
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

export const sendShopImage = (data) => {
	let {shopId, files, deleted} = data;
	const token = tokenStore.getAdminToken();
	let headers = {
		'Content-Type': 'multipart/form-data',
		'Authorization': 'Bearer ' + token,
	};
	let formData = new FormData();


	for (let i = 0; i < files.length; i++) {
		formData.append('Files', files[i]);
	}

	for (let i = 0; i < deleted.length; i++) {
		formData.append('Deleted', deleted[i]);
	}

	if (shopId) {
		formData.append('ShopId', shopId);
	}

	return axios.post('/api/shop/addPhotos', formData, {headers}).then((res) => {
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

export const deleteShopImage = (data) => {
	const token = tokenStore.getAdminToken();
	let headers = {
		'Content-Type': 'application/json',
		'Authorization': 'Bearer ' + token,
	};
	let body = JSON.stringify({
		photoId: data.replace(/(.png)|(.jpg)|(.jpeg)/gm, ''),
	});



	return axios.post('/api/shop/deletePhoto', body, {headers}).then((res) => {
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
