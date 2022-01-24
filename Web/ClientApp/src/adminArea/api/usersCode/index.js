import tokenStore from "../../../utils/tokenStore";
import axios from "axios";

export const adminGetUsersCode = (data) => {
	const {index, size, searchValue} = data;
	const token = tokenStore.getAdminToken();
	let headers = {
		'Content-Type': 'application/json',
		'Authorization': `Bearer ${token}`
	};
	let body = JSON.stringify({
		index,
		size,
		sortField: 'Id',
		order: 0,
		metaData: {
			keyword: {
				keyword: searchValue
			},
			type: null,
		}
	});

	return axios.post('/api/code/search', body,{headers}).then((res) => {
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
