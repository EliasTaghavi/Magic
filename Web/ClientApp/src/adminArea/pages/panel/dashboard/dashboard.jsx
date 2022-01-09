import React, {useRef, useState, useEffect} from 'react';
import Chart from 'chart.js';
import Loader from 'react-loader-spinner';
import {getAdminNewUsers} from "../../../api/dashboard";
import * as MainStore from "../../../../store/main";
import PageNumberGenerator from "../components/PageNumberGenerator";
import {toast} from "react-toastify";
import toastOptions from "../../../../components/ToastOptions";

const AdminDashboard = () => {
	const node1 = useRef(null);
	const [node1BigLoader, setNode1BigLoader] = useState(false);
	const [newUsersLoader, setNewUsersLoader] = useState(false);
	const [newUsers, setNewUsers] = useState([]);

	useEffect(() => {
		renderEarnChart();
		getNewUsers();
	}, []);

	const getNewUsers = () => {
		getAdminNewUsers()
			.then((response) => {
				console.log(response);
				if (response) {
					if (response === 401) {
						// do nothing FIXME
					}
					// else if (success) {
					// 	setNewUsers(items);
					// 	setNewUsersLoader(false);
					// }
				} else {
					toast.error('خطای سرور', toastOptions);
					setNewUsersLoader(false);
				}
			})
			.catch((error) => {
				toast.error('خطای سرور', toastOptions);
				setNewUsersLoader(false);
			})
	}

	const renderEarnChart = () => {
		// new Chart(node1, {
		// 	type: 'bar',
		// 	data: {
		// 		labels: ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'],
		// 		datasets: this.state.lineChart1.map((item, index) => {
		// 			let bg = index === 0 ? '#3692ed55' : '#ED6D3755';
		// 			let border = index === 0 ? '#3692ed' : '#ED6D37';
		// 			let point = index === 0 ? '#3692ed' : '#ED6D37';
		// 			return {
		// 				label: item.label,
		// 				lineTension: 0,
		// 				data: item.data,
		// 				backgroundColor: bg,
		// 				borderColor: border,
		// 				borderWidth: 2,
		// 				pointBackgroundColor: point,
		// 				pointBorderColor: point,
		// 			}
		// 		}),
		// 	},
		// 	options: {
		// 		maintainAspectRatio: false,
		// 		tooltips: {
		// 			enabled: true,
		// 			mode: 'x',
		// 			intersect: false,
		// 			fontFamily: "arial",
		// 			titleFontFamily: 'Vazir',
		// 			bodyFontFamily: 'Vazir',
		// 			callbacks: {
		// 				label: (tooltipItems, data) => {
		// 					return data.datasets[tooltipItems.datasetIndex].label + '\xa0:\xa0' + tooltipItems.value.toLocaleString('fa-IR').replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' ریال ';
		// 				}
		// 			}
		// 		},
		// 		legend: {
		// 			position: 'bottom',
		// 			labels: {
		// 				fontFamily: 'Vazir'
		// 			}
		// 		},
		// 		scales: {
		// 			xAxes: [{
		// 				type: 'category',
		// 				labels: ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'],
		// 				ticks: {
		// 					fontFamily: 'Vazir',
		// 				},
		// 				gridLines : {
		// 					display : false
		// 				}
		// 			}],
		// 			yAxes: [{
		// 				gridLines: {
		// 					color: "rgba(0, 0, 0, 0)",
		// 				},
		// 				ticks: {
		// 					min: 0,
		// 					callback: (value, index, values) => {
		// 						return value.toLocaleString('fa-IR').replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' ریال ';
		// 					},
		// 					fontFamily: 'Vazir'
		// 				}
		// 			}],
		// 		}
		// 	}
		// });
	}

	return (
		<div className="w-100 d-flex align-items-start justify-content-between">
			<div className="col-6 ml-1 card cardPrimary px-3">
				<div className="card-header bg-transparent">
					<p className="card-title fs22 my-2">درآمد ماهیانه</p>
				</div>
				<div className="w-100 d-flex align-items-start justify-content-start py-5 px-3">
					{node1BigLoader && <div className="w-100 d-flex centered">
						<Loader type="Oval" color='gray' height={40} width={40} className="loader"/>
					</div>}
					{!node1BigLoader && <div className="position-relative pb-3" style={{height: 300}}>
						<canvas className="mt-4" ref={node1}/>
					</div>}
				</div>
			</div>
			<div className="col-6 ml-1 card cardPrimary px-3">
				<div className="card-header bg-transparent">
					<p className="card-title fs22 my-2">جدیدترین کاربران</p>
				</div>
				<div className="w-100 d-flex align-items-start justify-content-start px-3 py-4">
					<div className="table-responsive">
						<table className="w-100">
							<thead>
							<tr>
								<th style={{minWidth: 120}}>ردیف</th>
								<th style={{minWidth: 120}}>نام و نام خانوادگی</th>
								<th style={{minWidth: 120}}>مبلغ تراکنش</th>
								<th style={{minWidth: 120}}>تاریخ</th>
							</tr>
							</thead>
							<tbody className="w-100">
							{newUsers?.length > 0 && newUsers?.map((item, index) => {
								return (
									<tr className="customTr">
										<td>{index + 1}</td>
										<td>{item?.date}</td>
										<td>{item?.price}</td>
										<td>{item?.pckType}</td>
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
	);
}

export default AdminDashboard;
