import React, {useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";
import {getUserDetailsInShop} from "../../../api/shop/scannedUser";
import {toast} from "react-toastify";
import toastOptions from "../../../../components/ToastOptions";
import ScannedUserDetailsModal from "./components/scannedUserDetails";
import * as MainStore from "../../../../store/main";
import {useDispatch} from "react-redux";
import {getShopDashboardData} from "../../../api/shop";

const ShopDashboard = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	let userId = history?.location?.pathname?.replace('/shop-panel', '');
	const [scannedUserDetailsModal, setScannedUserDetailsModal] = useState(false);
	const [currentPck, setCurrentPck] = useState(null);

	useEffect(() => {
		if (userId?.length > 0) {
			setScannedUserDetailsModal(true);
			let newUserId = userId.replace(/^\//gm, '');
			getUserDetails(newUserId);
		}
		getData();
	}, []);

	const getUserDetails = (userId) => {
		getUserDetailsInShop(userId)
			.then((response) => {
				if (response) {
					let {success, result} = response
					if (response === 401) {
						dispatch(MainStore.actions.setLogoutModal({type: 'user', modal: true}));
					} else if (success) {
						setCurrentPck(result);
					}
				} else {
					toast.error('خطای سرور', toastOptions);
				}
			})
			.catch((error) => {
				toast.error('خطای سرور', toastOptions);
			})
	};

	const getData = () => {
		getShopDashboardData()
			.then((response) => {
				console.log(response);
			})
			.catch((error) => {
				console.log(error);
			})
	}

	return (
		<div className="d-flex flex-column centered">
			<div className="col-12 card cardPrimary px-3">
				<div className="card-header bg-transparent">

				</div>
				<div className="w-100 d-flex align-items-start justify-content-start py-5 px-3">

				</div>
			</div>
			{scannedUserDetailsModal && currentPck && <ScannedUserDetailsModal userId={userId ?? null} data={currentPck} onClose={() => {
				setScannedUserDetailsModal(false);
				history.replace('/shop-panel');
			}} />}
		</div>
	);
}

export default ShopDashboard;
