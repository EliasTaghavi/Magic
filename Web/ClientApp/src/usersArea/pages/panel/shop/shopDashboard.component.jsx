import React, {useEffect, useState} from 'react';
import {Link, useHistory} from "react-router-dom";
import {getUserDetailsInShop} from "../../../api/shop/scannedUser";
import {toast} from "react-toastify";
import toastOptions from "../../../../components/ToastOptions";
import ScannedUserDetailsModal from "./components/scannedUserDetails";
import * as MainStore from "../../../../store/main";
import {useDispatch} from "react-redux";
import {getShopDashboardData} from "../../../api/shop";
import Loader from "react-loader-spinner";
import {generateMedal} from "../../../../adminArea/pages/panel/rate/component/generateMedal";

const ShopDashboard = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	let userId = history?.location?.pathname?.replace('/shop-panel', '');
	const [scannedUserDetailsModal, setScannedUserDetailsModal] = useState(false);
	const [currentPck, setCurrentPck] = useState(null);
	const [bigLoader, setBigLoader] = useState(false);
	const [buyers, setBuyer] = useState([]);
	const [shops, setShops] = useState([]);

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
		setBigLoader(true);
		getShopDashboardData()
			.then((response) => {
				console.log(response);
				if (response) {
					let {success, result: {rate: {min, shops}, tenLastBuyer}} = response
					if (response === 401) {
						dispatch(MainStore.actions.setLogoutModal({type: 'user', modal: true}));
					} else if (success) {
						setShops(shops);
						setBuyer(tenLastBuyer);
						setBigLoader(false);
					}
				} else {
					toast.error('خطای سرور', toastOptions);
					setBigLoader(false);
				}
			})
			.catch((error) => {
				console.log(error);
				toast.error('خطای سرور', toastOptions);
				setBigLoader(false);
			})
	}

	return (
		<div className="d-flex flex-column centered">
			<div className="col-12 d-flex flex-column flex-md-row align-items-start justify-content-start px-0">
				<div className="col-12 col-md-5 pl-0 pl-md-1 pr-0 mt-2">
					<div className="w-100 card cardPrimary pb-2" style={{height: 450}}>
						<div className="card-header bg-transparent d-flex align-items-center justify-content-start">
							<p className="card-title cfs22 my-1">رتبه بندی فروشگاه ها</p>
						</div>
						<div className="table-responsive table-striped customScrollbar">
							<table className="table w-100 overflow-auto">
								<thead>
								<tr className="text-center">
									<th style={{minWidth: 50}}>ردیف</th>
									<th style={{minWidth: 120}}>نام فروشگاه</th>
									<th style={{minWidth: 120}}>تعداد معرفی</th>
									<th style={{minWidth: 120}}>رتبه</th>
								</tr>
								</thead>
								<tbody className="w-100">
								{!bigLoader && shops?.length > 0 && shops?.map((item, index) => {
									return (
										<tr key={Math.random().toString()} className="customTr text-center">
											<td>{index + 1}</td>
											<td>{item?.name ?? '-----'}</td>
											<td className="fs18 font-weight-bold textMain">{item?.count ?? '-----'}</td>
											<td>{}</td>
										</tr>
									);
								})}
								</tbody>
							</table>
							{(shops?.length < 1 && !bigLoader) && <div className="w-100 d-flex centered py-3">
								<span className="text-danger">داده ای وجود ندارد.</span>
							</div>}
							{bigLoader && <div className="w-100 d-flex centered py-3">
								<Loader type="ThreeDots" color='#ff521d' height={8} width={100} className="loader"/>
							</div>}
						</div>
					</div>
				</div>
				<div className="col-12 col-md-7 pr-0 pr-md-1 pl-0 mt-2">
					<div className="w-100 card cardPrimary pb-2" style={{height: 450}}>
						<div className="card-header bg-transparent d-flex align-items-center justify-content-start">
							<p className="card-title cfs22 my-1">جدیدترین کاربران</p>
						</div>
						<div className="table-responsive table-striped customScrollbar">
							<table className="table w-100 overflow-auto">
								<thead>
								<tr className="text-center">
									<th style={{minWidth: 50}}>ردیف</th>
									<th style={{minWidth: 170}}>نام و نام خانوادگی</th>
									<th style={{minWidth: 150}}>مبلغ فاکتور</th>
									<th style={{minWidth: 150}}>مبلغ پرداختی</th>
									<th style={{minWidth: 150}}>درصد تخفیف</th>
								</tr>
								</thead>
								<tbody className="w-100">
								{buyers?.length > 0 && buyers?.map((item, index) => {
									return (
										<tr key={item?.key?.toString()} className="customTr text-center">
											<td>{index + 1}</td>
											<td>{(item?.firstName && item?.lastName) ? item?.firstName + '\xa0' + item?.lastName : item?.mobile ?? '-----'}</td>
											<td>{item?.createdData ? item?.createdDate.replace(/\//gm, '\xa0/\xa0') : '-----'}</td>
											<td></td>
											<td className="fs18 font-weight-bold textMain">1</td>
										</tr>
									);
								})}
								</tbody>
							</table>
							{(buyers?.length < 1 && !bigLoader) && <div className="w-100 d-flex centered py-3">
								<span className="text-danger">داده ای وجود ندارد.</span>
							</div>}
							{bigLoader && <div className="w-100 d-flex centered py-3">
								<Loader type="ThreeDots" color='#ff521d' height={8} width={100} className="loader"/>
							</div>}
						</div>
					</div>
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
