import React, {useCallback, useEffect, useState} from 'react';
import SearchBox from "../components/SearchBox";
import Loader from "react-loader-spinner";
import RenderPageButtons from "../components/RenderPageButtons";
import {getAdminTransactions} from "../../../api/transactions";
import Select from "react-select";
import {theme} from "../../../../components/shared/theme";
import DatePicker from "react-modern-calendar-datepicker";
import * as MainStore from "../../../../store/main";
import PageNumberGenerator from "../components/PageNumberGenerator";
import {toast} from "react-toastify";
import toastOptions from "../../../../components/ToastOptions";
import {useDispatch} from "react-redux";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";

const AdminTransactions = () => {
	const dispatch = useDispatch();
	const [bigLoader, setBigLoader] = useState(false);
	const [pageSize, setPageSize] = useState(5);
	const [currentPage, setCurrentPage] = useState(1);
	const [pagesNumber, setPagesNumber] = useState([]);
	const [searchValue, setSearchValue] = useState('');
	const [totalCount, setTotalCount] = useState(0);
	const [data, setData] = useState([]);
	const [errors] = useState({});
	const [status, setStatus] = useState(null); // 0=false 1=true 2=undefined
	const [from, setFrom] = useState('');
	const [to, setTo] = useState('');
	const statusTypes = [
		{
			value: null,
			label: 'همه',
		},
		{
			value: true,
			label: 'پرداخت شده',
		},
		{
			value: false,
			label: 'پرداخت نشده',
		},
	];

	const searchData = (e) => {
		e.preventDefault();
		setCurrentPage(1);
		getData({currentPage: 1});
	};

	const changeValue = useCallback((e) => {
		let target = e.target;
		setSearchValue(target.value);
	}, []);

	useEffect(() => {
		getData();
	}, []);

	const getData = (data) => {
		setBigLoader(true);
		let lastStatus = data?.status ?? status;
		let filteredData = {
			index: data?.currentPage ?? currentPage,
			size: data?.pageSize ?? pageSize,
			status: lastStatus === 'null' ? null : lastStatus,
			keyword: data?.searchValue ?? searchValue,
			from: data?.from ?? from,
			to: data?.to ?? to,
		};
		getAdminTransactions(filteredData)
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
			})
	}

	const changePageFn = (newPage) => {
		if (newPage === currentPage || newPage < 1 || newPage > pagesNumber[pagesNumber.length - 1]) {
			// do nothing
		} else {
			setCurrentPage(newPage);
			getData({currentPage: newPage});
		}
	};

	const setPageSizeValue = useCallback((e) => {
		let target = e.target;
		setCurrentPage(1);
		setPageSize(target.value);
		getData({currentPage: 1, pageSize: target.value});
	}, []);

	const changeStatus = (val) => {
		let {value} = val;
		setStatus(value);
		getData({status: value !== null ? value : 'null'});
	}

	const selectDay = (type, data) => {
		delete errors[type];
		switch (type) {
			case 'from':
				setFrom(data);
				getData({from: data});
				break;
			case 'to':
				setTo(data);
				getData({to: data});
				break;
			default:
				break;
		}
	};

	return (
		<div className="card cardPrimary px-3 w-100">
			<div className="card-header bg-transparent d-flex align-items-center justify-content-between">
				<p className="card-title fs22 my-2">لیست تراکنش ها</p>
			</div>
			<div className="card-body w-100 d-flex flex-column px-3">
				<div className="w-100 d-flex flex-column-reverse flex-md-row flex-wrap align-items-center justify-content-between">
					<div className="flex form-group mt-4 d-flex flex-column flex-md-row align-items-start justify-content-start">
						<div className="col-12 col-sm-6 col-md-4 col-xl-3" style={{maxWidth: 280}}>
							<Select
								defaultValue={statusTypes[0]}
								options={statusTypes}
								isClearable={false}
								isRtl={true}
								isMulti={false}
								isSearchable={false}
								maxMenuHeight={200}
								placeholder=""
								onChange={(value) => changeStatus(value)}
								styles={theme.customStyles}/>
						</div>
						<div className="col-12 col-sm-6 col-md-4 col-xl-3" style={{maxWidth: 280}}>
							<DatePicker
								value={from}
								onChange={(value) => selectDay('from', value)}
								shouldHighlightWeekends
								calendarClassName="responsive-calendar"
								locale="fa"
								inputPlaceholder="از تاریخ..."
								wrapperClassName="w-100"
								inputClassName={`w-100 text-right fs16 form-control input ${errors['from'] && 'is-invalid'}`}
							/>
							{from && <button type="button" className="btn bg-transparent position-absolute"
										style={{left: 0, zIndex: 100}} onClick={() => selectDay('from', '')}>
								<FontAwesomeIcon icon={faTimes} className="textGray fs16"/>
							</button>}
						</div>
						<div className="col-12 col-sm-6 col-md-4 col-xl-3 position-relative" style={{maxWidth: 280}}>
							<DatePicker
								value={to}
								onChange={(value) => selectDay('to', value)}
								shouldHighlightWeekends
								calendarClassName="responsive-calendar"
								locale="fa"
								inputPlaceholder="تا تاریخ..."
								wrapperClassName="w-100"
								inputClassName={`w-100 text-right fs16 form-control mr-3 input ${errors['to'] && 'is-invalid'}`}
							/>
							{to && <button type="button" className="btn bg-transparent position-absolute"
										style={{left: 0, zIndex: 100}} onClick={() => selectDay('to', '')}>
								<FontAwesomeIcon icon={faTimes} className="textGray fs16"/>
							</button>}
						</div>
					</div>
					<SearchBox searchValue={searchValue} searchData={searchData} changeValue={changeValue} />
				</div>
				<div className="table-responsive table-striped customScrollbar">
					<table className="w-100 mt-5">
						<thead>
						<tr>
							<th style={{minWidth: 120}}>ردیف</th>
							<th style={{minWidth: 120}}>تاریخ تراکنش</th>
							<th style={{minWidth: 120}}>مبلغ تراکنش</th>
							<th style={{minWidth: 120}}>نوع پکیج</th>
							<th style={{minWidth: 120}}>شماره موبایل</th>
							<th style={{minWidth: 120}}>وضعیت</th>
						</tr>
						</thead>
						<tbody className="w-100">
						{!bigLoader && data.length > 0 && data.map((item, index) => {
							return (
								<tr key={item?.id} className="customTr">
									<td>{(currentPage - 1) * pageSize + (index + 1)}</td>
									<td>{item?.payDate}</td>
									<td>{item?.price}</td>
									<td>{item?.packTitle}</td>
									<td>{item?.userMobile}</td>
									<td>{item?.status === true ? (
										<p className="font-weight-bold text-success">پرداخت شده</p>
									) : (
										<p className="font-weight-bold text-danger">پرداخت نشده</p>
									)}</td>
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
		</div>
	);
}

export default AdminTransactions;
