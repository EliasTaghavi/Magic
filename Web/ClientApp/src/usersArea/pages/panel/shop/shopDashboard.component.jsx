import React, {useEffect, useRef, useState} from 'react';
import {useHistory} from "react-router-dom";
import {getUserDetailsInShop} from "../../../api/shop/scannedUser";
import {toast} from "react-toastify";
import toastOptions from "../../../../components/ToastOptions";
import ScannedUserDetailsModal from "./components/scannedUserDetails";
import * as MainStore from "../../../../store/main";
import {useDispatch} from "react-redux";
import {getShopDashboardData, getChartData} from "../../../api/shop";
import Loader from "react-loader-spinner";
import Chart from 'chart.js';
import NumberFormat from "react-number-format";

const ShopDashboard = () => {
	const history = useHistory();
	const node1 = useRef(null);
	const dispatch = useDispatch();
	let userId = history?.location?.pathname?.replace('/shop-panel', '');
	const [scannedUserDetailsModal, setScannedUserDetailsModal] = useState(false);
	const [currentPck, setCurrentPck] = useState(null);
	const [bigLoader, setBigLoader] = useState(false);
	const [chartLoader, setChartLoader] = useState(0); // 0=false 1=true 2=noData
	const [buyers, setBuyer] = useState([]);
	const [shops, setShops] = useState([]);
	const [chartData, setChartData] = useState(null);

	useEffect(() => {
		if (userId?.length > 0) {
			setScannedUserDetailsModal(true);
			let newUserId = userId.replace(/^\//gm, '');
			getUserDetails(newUserId);
		}
		getData();
		getChartDataFn();
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
				if (response) {
					let {success, result: {rate: {shops}, tenLastBuyer}} = response
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
			.catch(() => {
				toast.error('خطای سرور', toastOptions);
				setBigLoader(false);
			})
	}

	const getChartDataFn = () => {
		setChartLoader(1);
		getChartData()
			.then((response) => {
				console.log(response);
				if (response) {
					let {success, result} = response
					if (response === 401) {
						dispatch(MainStore.actions.setLogoutModal({type: 'user', modal: true}));
					} else if (success) {
						setChartData(result);
						renderChart(result);
						setChartLoader(0);
					}
				} else {
					toast.error('خطای سرور', toastOptions);
					setChartLoader(2);
				}
			})
			.catch((e) => {
				console.log(e);
				toast.error('خطای سرور', toastOptions);
				setChartLoader(2);
			})
	}

	const renderChart = (data) => {
		console.log(data);
		new Chart(node1, {
			type: 'bar',
			data: {
				labels: ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'],
				datasets: data?.sell?.map((item, index) => {
					let bg = index === 0 ? '#3692ed55' : '#ED6D3755';
					let border = index === 0 ? '#3692ed' : '#ED6D37';
					let point = index === 0 ? '#3692ed' : '#ED6D37';
					return {
						label: item.label,
						lineTension: 0,
						data: item.data,
						backgroundColor: bg,
						borderColor: border,
						borderWidth: 2,
						pointBackgroundColor: point,
						pointBorderColor: point,
					}
				}),
			},
			options: {
				maintainAspectRatio: false,
				tooltips: {
					enabled: true,
					mode: 'x',
					intersect: false,
					fontFamily: "arial",
					titleFontFamily: 'Vazir',
					bodyFontFamily: 'Vazir',
					callbacks: {
						label: (tooltipItems, data) => {
							return data.datasets[tooltipItems.datasetIndex].label + '\xa0:\xa0' + tooltipItems.value.toLocaleString('fa-IR').replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' ریال ';
						}
					}
				},
				legend: {
					position: 'bottom',
					labels: {
						fontFamily: 'Vazir'
					}
				},
				scales: {
					xAxes: [{
						type: 'category',
						labels: ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'],
						ticks: {
							fontFamily: 'Vazir',
						},
						gridLines: {
							display: false
						}
					}],
					yAxes: [{
						gridLines: {
							color: "rgba(0, 0, 0, 0)",
						},
						ticks: {
							min: 0,
							callback: (value, index, values) => {
								return value.toLocaleString('fa-IR').replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' ریال ';
							},
							fontFamily: 'Vazir'
						}
					}],
				}
			}
		});
	};

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
									<th style={{minWidth: 120}}>تعداد معرفی و فروش</th>
								</tr>
								</thead>
								<tbody className="w-100">
								{!bigLoader && shops?.length > 0 && shops?.map((item, index) => {
									return (
										<tr key={Math.random().toString()} className="customTr text-center">
											<td>{index + 1}</td>
											<td>{item?.name ?? '-----'}</td>
											<td className="fs18 font-weight-bold textMain">{item?.count ?? '-----'}</td>
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
							<p className="card-title cfs22 my-1">جدیدترین مشتریان</p>
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
										<tr key={item?.id?.toString()} className="customTr text-center">
											<td>{index + 1}</td>
											<td>{item?.userName ?? '-----'}</td>
											<td>{item?.fullPrice ?
												<span><NumberFormat value={item?.fullPrice} displayType={'text'}
																		  thousandSeparator={true}/>{'\xa0تومان'}</span>
												: '-----'}</td>
											<td>{item?.afterDiscount ?
												<span><NumberFormat value={item?.afterDiscount} displayType={'text'}
																		  thousandSeparator={true}/>{'\xa0تومان'}</span>
												: '-----'}</td>
											<td className="fs18 font-weight-bold textMain">{`%${item?.discount}` ?? '-----'}</td>
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
			<div className="col-12 mt-2 px-0">
				<div className="w-100 card cardPrimary">
					<div className="card-header bg-transparent">
						<p className="card-title fs22 my-2">آمار و اطلاعات خریدها</p>
					</div>
					<div className="d-flex flex-column-reverse flex-lg-row align-items-center justify-content-between h-100">
						<div className="flex position-relative px-3 py-4 w-100 mt-4 mt-lg-0" style={{height: 400}}>
							<canvas className="w-100 h-100" ref={node1}/>
						</div>
						{chartLoader === 2 && <div className="w-100 d-flex centered py-3">
							<span className="text-danger">داده ای وجود ندارد.</span>
						</div>}
						{chartLoader === 1 && <div className="w-100 d-flex centered py-3">
							<Loader type="ThreeDots" color='#ff521d' height={8} width={100} className="loader"/>
						</div>}
					</div>
				</div>
			</div>
			{scannedUserDetailsModal && currentPck &&
			<ScannedUserDetailsModal userId={userId ?? null} data={currentPck} onClose={() => {
				setScannedUserDetailsModal(false);
				history.replace('/shop-panel');
			}}/>}
		</div>
	);
}

export default ShopDashboard;
