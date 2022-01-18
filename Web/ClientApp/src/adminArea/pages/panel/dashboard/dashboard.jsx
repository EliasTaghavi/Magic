import React, {useRef, useState, useEffect} from 'react';
import Chart from 'chart.js';
import Loader from 'react-loader-spinner';
import {getAdminNewUsers} from "../../../api/dashboard";
import * as MainStore from "../../../../store/main";
import PageNumberGenerator from "../components/PageNumberGenerator";
import {toast} from "react-toastify";
import toastOptions from "../../../../components/ToastOptions";
import {Link} from 'react-router-dom';
import {getAdminLastTransactions, getAdminChartData} from "../../../api/dashboard";
import NumberFormat from "react-number-format";

const AdminDashboard = () => {
	const node1 = useRef(null);
	const [newUsersLoader, setNewUsersLoader] = useState(false);
	const [newUsers, setNewUsers] = useState([]);
	const [transactionsLoader, setTransactionsLoader] = useState(false);
	const [transactions, setTransactions] = useState([]);
	const [chartLoader, setChartLoader] = useState(false);

	useEffect(() => {
		getChartData();
		getNewUsers();
		getTransactions();
	}, []);

	const getNewUsers = () => {
		setNewUsersLoader(true);
		getAdminNewUsers()
			.then((response) => {
				let {success, result: {items}} = response;
				if (response) {
					if (response === 401) {
						// do nothing FIXME
					}
					else if (success) {
						setNewUsers(items);
						setNewUsersLoader(false);
					}
				} else {
					toast.error('خطای سرور', toastOptions);
					setNewUsersLoader(false);
				}
			})
			.catch((e) => {
				console.log(22, e, e.response);
				toast.error('خطای سرور', toastOptions);
				setNewUsersLoader(false);
			})
	}

	const getTransactions = () => {
		setTransactionsLoader(true);
		getAdminLastTransactions()
			.then((response) => {
				let {success, result: {items}} = response;
				if (response) {
					if (response === 401) {
						// do nothing FIXME
					}
					else if (success) {
						setTransactions(items);
						setTransactionsLoader(false);
					}
				} else {
					toast.error('خطای سرور', toastOptions);
					setTransactionsLoader(false);
				}
			})
			.catch((e) => {
				console.log(11, e, e.response);
				toast.error('خطای سرور', toastOptions);
				setTransactionsLoader(false);
			})
	}

	const getChartData = () => {
		setChartLoader(true);
		getAdminChartData()
			.then((response) => {
				console.log(response);
				let {success, result} = response;
				if (response) {
					if (response === 401) {
						// do nothing FIXME
					} else if (success) {
						setChartLoader(false);
						renderEarnChart(result);
					}
				} else {
					toast.error('خطای سرور', toastOptions);
					setChartLoader(false);
				}
			})
			.catch((e) => {
				console.log(33, e, e.response);
				toast.error('خطای سرور', toastOptions);
				setChartLoader(false);
			})
	}

	const renderEarnChart = (result) => {
		const data = {
			labels: result?.label,
			datasets: [{
				label: 'My First Dataset',
				data: result?.data,
				fill: false,
				borderColor: 'rgb(0, 123, 255)',
				tension: 0.1
			}]
		};
		if (node1?.current) {
			new Chart(node1?.current, {
				type: 'line',
				data: data,
				options: {
					legend: {
						display: false,
					},
					maintainAspectRatio: false,
					tooltips: {
						enabled: true,
						position: 'nearest',
						intersect: false,
						fontFamily: "IranSans",
						titleFontFamily: 'IranSans',
						bodyFontFamily: 'IranSans',
						callbacks: {
							label: (tooltipItems, data) => {
								return tooltipItems?.yLabel.toLocaleString('fa-IR').replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' تومان ';
							}
						}
					},
					scales: {
						xAxes: [{
							type: 'category',
							labels: ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'],
							ticks: {
								fontFamily: 'Vazir',
							},
							gridLines : {
								display : false
							}
						}],
						yAxes: [{
							gridLines: {
								color: "rgba(0, 0, 0, 0)",
							},
							ticks: {
								min: 0,
								callback: (value, index, values) => {
									return value.toLocaleString('fa-IR').replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' تومان ';
								},
								fontFamily: 'IranSans'
							}
						}],
					}
				}
			})
		}
	}

	return (
		<div className="w-100 d-flex flex-column align-items-start justify-content-between">
			<div className="col-12 d-flex align-items-start justify-content-start px-0">
				<div className="col-7 pl-1 pr-0">
					<div className="w-100 card cardPrimary px-3" style={{height: 450}}>
						<div className="card-header bg-transparent">
							<p className="card-title fs22 my-1">درآمد ماهیانه</p>
						</div>
						<div className="w-100 d-flex align-items-start justify-content-start py-5 px-3">
							{chartLoader && <div className="w-100 d-flex centered">
								<Loader type="ThreeDots" color='#ff521d' height={8} width={100} className="loader"/>
							</div>}
							{!chartLoader && <div className="position-relative pb-3 w-100" style={{height: 300}}>
								<canvas className="mt-4 w-100" ref={node1}/>
							</div>}
						</div>
					</div>
				</div>
				<div className="col-5 pr-1 pl-0">
					<div className="w-100 card cardPrimary px-3" style={{height: 450}}>
						<div className="card-header bg-transparent d-flex align-items-center justify-content-between">
							<p className="card-title fs22 my-1">رتبه بندی فروشگاه ها</p>
							<Link to="/admin/panel/shops" className="routeBtns">
								همه فروشگاه ها
							</Link>
						</div>
						<div className="w-100 d-flex align-items-start justify-content-start py-5 px-3">

						</div>
					</div>
				</div>
			</div>
			<div className="col-12 d-flex align-items-start justify-content-start mt-2 px-0">
				<div className="col-6 pl-1 pr-0">
					<div className="w-100 card cardPrimary px-3 pb-2" style={{height: 450}}>
						<div className="card-header bg-transparent d-flex align-items-center justify-content-between">
							<p className="card-title fs22 my-1">آخرین تراکنش ها</p>
							<Link to="/admin/panel/transactions" className="routeBtns">
								همه تراکنش ها
							</Link>
						</div>
						<div className="w-100 h-100 d-flex align-items-start justify-content-start py-3 overflow-auto customScrollbar">
							<div className="table-responsive table-striped">
								<table className="w-100">
									<thead>
									<tr>
										<th style={{minWidth: 50}}>ردیف</th>
										<th style={{minWidth: 120}}>نام و نام خانوادگی</th>
										<th style={{minWidth: 120}}>تاریخ</th>
										<th style={{minWidth: 120}}>مبلغ</th>
									</tr>
									</thead>
									<tbody className="w-100">
									{transactions?.length > 0 && transactions?.map((item, index) => {
										return (
											<tr key={item?.id} className="customTr">
												<td>{index + 1}</td>
												<td>{item?.userFullName ?? '-----'}</td>
												<td style={{letterSpacing: 1}}>{item?.payDate ?? '-----'}</td>
												<td className="font-weight-bold">
													<NumberFormat value={item?.price} displayType={'text'} thousandSeparator={true} className="font-weight-bold fontSizePreSmall" /> تومان
												</td>
											</tr>
										);
									})}
									</tbody>
								</table>
								{(transactions?.length < 1 && !transactionsLoader) && <div className="w-100 d-flex centered py-3">
									<span className="text-danger">داده ای وجود ندارد.</span>
								</div>}
								{transactionsLoader && <div className="w-100 d-flex centered py-3">
									<Loader type="ThreeDots" color='#ff521d' height={8} width={100} className="loader"/>
								</div>}
							</div>
						</div>
					</div>
				</div>
				<div className="col-6 pr-1 pl-0">
					<div className="w-100 card cardPrimary px-3 pb-2" style={{height: 450}}>
						<div className="card-header bg-transparent d-flex align-items-center justify-content-between">
							<p className="card-title fs22 my-1">جدیدترین کاربران</p>
							<Link to="/admin/panel/all-users" className="routeBtns">
								همه کاربران
							</Link>
						</div>
						<div className="w-100 h-100 d-flex align-items-start justify-content-start overflow-auto py-3 customScrollbar">
							<div className="table-responsive table-striped">
								<table className="w-100 flex">
									<thead>
									<tr>
										<th style={{minWidth: 50}}>ردیف</th>
										<th style={{minWidth: 120}}>نام و نام خانوادگی</th>
										<th style={{minWidth: 120}}>تاریخ ثبت نام</th>
										<th style={{minWidth: 120}}>وضعیت</th>
									</tr>
									</thead>
									<tbody className="w-100">
									{newUsers?.length > 0 && newUsers?.map((item, index) => {
										return (
											<tr key={item?.id} className="customTr">
												<td>{index + 1}</td>
												<td>{(item?.firstName && item?.lastName) ? item?.firstName + '\xa0' + item?.lastName : item?.mobile ?? '-----'}</td>
												<td style={{letterSpacing: 1}}>{item?.createdData ? item?.createdDate.replace(/\//gm, '\xa0/\xa0') : '-----'}</td>
												<td>{item?.status === 3 ? (
													<p className="text-success font-weight-bold fs16 p-0 m-0">تایید شده</p>
												) : item?.status === 5 ? (
													<p className="text-danger font-weight-bold fs16 p-0 m-0">تایید نشده</p>
												) : item?.status === 6 ? (
													<p className="text-warning font-weight-bold fs16 p-0 m-0">در انتظار بررسی</p>
												) : item?.status === 2 ? (
													<p className="text-secondary font-weight-bold fs16 p-0 m-0">قفل شده</p>
												) : (
													<p className="text-info font-weight-bold fs16 p-0 m-0">عدم تکمیل اطلاعات</p>
												)}</td>
											</tr>
										);
									})}
									</tbody>
								</table>
								{(newUsers?.length < 1 && !newUsersLoader) && <div className="w-100 d-flex centered py-3">
									<span className="text-danger">داده ای وجود ندارد.</span>
								</div>}
								{newUsersLoader && <div className="w-100 d-flex centered py-3">
									<Loader type="ThreeDots" color='#ff521d' height={8} width={100} className="loader"/>
								</div>}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default AdminDashboard;
