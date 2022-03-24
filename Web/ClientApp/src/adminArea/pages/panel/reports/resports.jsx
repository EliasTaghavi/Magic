import React, {useCallback, useEffect, useState} from 'react';
import Loader from "react-loader-spinner";
import * as MainStore from "../../../../store/main";
import PageNumberGenerator from "../components/PageNumberGenerator";
import {toast} from "react-toastify";
import toastOptions from "../../../../components/ToastOptions";
import {getReports} from "../../../api/reports";
import {useDispatch} from "react-redux";
import RenderPageButtons from "../components/RenderPageButtons";

const Reports = () => {
	const dispatch = useDispatch();
	const [bigLoader, setBigLoader] = useState(false);
	const [data, setData] = useState(undefined);
	const [pageSize, setPageSize] = useState(5);
	const [currentPage, setCurrentPage] = useState(1);
	const [pagesNumber, setPagesNumber] = useState([]);
	const [totalCount, setTotalCount] = useState(0);

	useEffect(() => {
		getReportsFn();
	}, []);

	const getReportsFn = (d) => {
		setBigLoader(true);
		let filteredData = {
			index: d?.currentPage ?? currentPage,
			size: d?.pageSize ?? pageSize,
		};
		getReports(filteredData)
			.then((response) => {
				const {result: {count, items}, success} = response;
				if (response) {
					if (response === 401) {
						dispatch(MainStore.actions.setLogoutModal({type: 'admin', modal: true}));
					} else if (success) {
						PageNumberGenerator(count, data?.pageSize ?? pageSize)
							.then((res) => {
								setPagesNumber(res);
							});
						setTotalCount(count);
						setData(items);
						setBigLoader(false);
					}
				} else {
					toast.error('خطای سرور', toastOptions);
					setBigLoader(false);
				}
			})
			.catch((error) => {
				toast.error('خطای سرور', toastOptions);
				setBigLoader(false);
			});
	}

	const changePageFn = (newPage) => {
		if (newPage === currentPage || newPage < 1 || newPage > pagesNumber[pagesNumber.length - 1]) {
			// do nothing
		} else {
			setCurrentPage(newPage);
			getReportsFn({currentPage: newPage});
		}
	};

	const setPageSizeValue = useCallback(async (e) => {
		let target = e.target;
		setPageSize(target.value);
		setCurrentPage(1);
		getReportsFn({currentPage: 1, pageSize: target.value});
	}, []);

	return (
		<div className="card cardPrimary px-3 w-100">
			<div className="card-header bg-transparent d-flex align-items-center justify-content-between">
				<p className="card-title fs22 my-2">نظرات کاربران</p>
			</div>
			<div className="card-body w-100 d-flex flex-column px-3">
				<div className="table-responsive table-striped customScrollbar">
					<table className="w-100 mt-3">
						<thead>
							<tr>
								<th style={{minWidth: 50}}>ردیف</th>
								<th style={{minWidth: 120}}>تاریخ</th>
								<th style={{minWidth: 120}}>نام کاربر</th>
								<th style={{minWidth: 120}}>ایمیل</th>
								<th style={{minWidth: 120}}>متن پیام</th>
							</tr>
						</thead>
						<tbody className="w-100">
							{!bigLoader && data?.length > 0 && data.map((item, index) => {
								return (
									<tr key={item?.id} className="customTr">
										<td>{index + 1}</td>
										<td>{item?.addDate ?? '-----'}</td>
										<td>{item?.userName ?? '-----'}</td>
										<td>{item?.email ?? '-----'}</td>
										<td>{item?.text ?? '-----'}</td>
									</tr>
								);
							})}
						</tbody>
					</table>
					{(data?.length < 1 && !bigLoader) && <div className="w-100 d-flex centered py-3">
						<span className="text-danger">داده ای وجود ندارد.</span>
					</div>}
					{bigLoader && <div className="w-100 d-flex centered py-3">
						<Loader type="ThreeDots" color='#ff521d' height={8} width={100} className="loader"/>
					</div>}
				</div>
			</div>
			<hr className="w-100" />
			<div className="w-100 bg-white p-3 pb-0 d-flex flex-column align-items-center justify-content-start flex-md-row align-items-md-center justify-content-md-between">
				<RenderPageButtons disabledArrowButtons={data?.length < 1} pagesNumber={pagesNumber} currentPage={currentPage} changePage={(value) => changePageFn(value)} />
				<div className="d-block mt-3 my-md-0">
					<select className="filterDropDown outline" defaultValue="5" onChange={setPageSizeValue}>
						<option value="5">5</option>
						<option value="10">10</option>
						<option value="15">15</option>
					</select>
				</div>
				<span className="mt-3 mt-md-0">{`(\xa0${totalCount}\xa0آیتم\xa0)`}</span>
			</div>
		</div>
	);
}

export default Reports;
