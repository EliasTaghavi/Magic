import React, {useState} from 'react';
import {useShallowPickerSelector} from "../../../../../store/selectors";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import EditShopPasswordModal from "./components/EditShopPasswordModal";

const ShopAccount = () => {
	const [editShopPassword, setEditShopPassword] = useState(false);
	const shopData = useShallowPickerSelector('user', ['shopData']);
	return (
		<div className="d-flex flex-column centered w-100">
			<div className="card cardPrimary px-3 w-100">
				<div className="card-header bg-transparent d-flex align-items-center justify-content-between">
					<p className="card-title fs22 my-2">حساب کاربری</p>
					<button type="button" className="btn btn-outline-secondary fs14" onClick={() => setEditShopPassword(true)}>
						{/*<span className="d-none d-md-flex">ویرایش حساب کاربری</span>*/}
						<span className="d-flex">ویرایش کلمه عبور</span>
					</button>
				</div>
				<div className="card-body w-100 d-flex flex-column flex-md-row align-items-center align-items-md-start justify-content-start py-5 px-3">
					<div className="userProfileImage">
						<FontAwesomeIcon icon={faUser} className="userIcon textGray"/>
					</div>
					<div className="d-flex flex-column align-items-start justify-content-start mr-4 mt-5 mt-md-3">
						<div className="d-flex flex-column flex-md-row align-items-start justify-content-start">
							<p className="fs18 textThird">نام: </p>
							<p className="fs20 mr-md-3">{shopData?.name}</p>
						</div>
						<div className="d-flex flex-column flex-md-row align-items-start justify-content-start">
							<p className="fs18 textThird">شماره موبایل: </p>
							<p className="fs20 mr-md-3">{shopData?.phone}</p>
						</div>
						<div className="d-flex flex-column flex-md-row align-items-start justify-content-start">
							<p className="fs18 textThird">آدرس: </p>
							<p className="fs20 mr-md-3">{shopData?.address}</p>
						</div>
					</div>
				</div>
			</div>
			{/*{editUserProfile && <EditUserProfileModal onClose={() => setEditUserProfile(false)} />}*/}
			{editShopPassword && <EditShopPasswordModal onClose={() => setEditShopPassword(false)} />}
		</div>
	);
}

export default ShopAccount;
