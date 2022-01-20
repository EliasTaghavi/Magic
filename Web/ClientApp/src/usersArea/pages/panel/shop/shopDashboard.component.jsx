import React, {useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";
import {getUserDetailsInShop} from "../../../api/shop/scannedUser";
import {toast} from "react-toastify";
import toastOptions from "../../../../components/ToastOptions";
import ScannedUserDetailsModal from "./components/scannedUserDetails";

const ShopDashboard = () => {
	const history = useHistory();
	let userId = history?.location?.pathname?.replace('/shop-panel/', '');
	const [scannedUserDetailsModal, setScannedUserDetailsModal] = useState(false);
	const [currentPck, setCurrentPck] = useState(null);

	useEffect(() => {
		if (userId.length > 0) {
			setScannedUserDetailsModal(true);
			getUserDetails(userId);
		}
	}, []);

	const getUserDetails = (userId) => {
		getUserDetailsInShop(userId)
			.then((response) => {
				console.log(response);
				if (response) {
					let {success, result} = response
					if (response === 401) {
						// do nothing but in another api's should logout from system
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

	return (
		<div>
			<div className="card cardPrimary px-3">
				<div className="card-header bg-transparent">

				</div>
				<div className="w-100 d-flex align-items-start justify-content-start py-5 px-3">

				</div>
			</div>
			{scannedUserDetailsModal && currentPck && <ScannedUserDetailsModal userId={userId ?? null} data={currentPck} onClose={() => setScannedUserDetailsModal(false)} />}
		</div>
	);
}

export default ShopDashboard;
