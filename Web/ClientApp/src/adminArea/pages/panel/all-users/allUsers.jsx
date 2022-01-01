import React, {useState, useCallback, useEffect} from 'react';
import Loader from 'react-loader-spinner';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEllipsisV} from "@fortawesome/free-solid-svg-icons";
import UserDetailsModal from "./components/userDetailsModal";
import RenderPageButtons from "../components/RenderPageButtons";
import SearchBox from "../components/SearchBox";
import RejectSmsModal from "./components/rejectSmsModal";
import {adminGetAllUsers} from "../../../api/users";
import {toast} from "react-toastify";
import toastOptions from "../../../../components/ToastOptions";
import PageNumberGenerator from "../components/PageNumberGenerator";

const AdminAllUsers = () => {
	const [bigLoader, setBigLoader] = useState(false);
	const [pageSize, setPageSize] = useState(5);
	const [currentPage, setCurrentPage] = useState(1);
	const [pagesNumber, setPagesNumber] = useState([]);
	const [searchValue, setSearchValue] = useState('');
	const [totalCount, setTotalCount] = useState(0);
	const [sendSmsModal, setSendSmsModal] = useState(false);
	const [status, setStatus] = useState(2); // 0=false 1=true 2=undefined
	const [data, setData] = useState([]);
	const [detailsModal, setDetailsModal] = useState(null);

	useEffect(() => {
		getData();
	}, []);

	const getData = (data) => {
		setBigLoader(true);
		let filteredData = {
			index: data?.currentPage ?? currentPage,
			size: data?.pageSize ?? pageSize,
			confirmed: data?.status ?? status,
			mobile: data?.searchValue ?? searchValue,
		};
		adminGetAllUsers(filteredData)
			.then((response) => {
				const {result: {count, items}, success} = response;
				console.log(response);
				if (response) {
					if (response === 401) {
						// do nothing but in another api's should logout from system
					} else if (success) {
						PageNumberGenerator(count, pageSize)
							.then((res) => {
								console.log(res);
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
				console.log(error);
				toast.error('خطای سرور', toastOptions);
				setBigLoader(false);
			});
	}

	const openDetailsModal = (item) => {
		setDetailsModal(item);
	}

	const setPageSizeValue = useCallback((e) => {
		let target = e.target;
		setCurrentPage(1);
		setPageSize(target.value);
		getData({currentPage: 1, pageSize: target.value});
	}, []);

	const changePageFn = (newPage) => {
		if (newPage === currentPage || newPage < 1 || newPage > pagesNumber[pagesNumber.length - 1]) {
			// do nothing
		} else {
			setCurrentPage(newPage);
			// getData(newPage);
		}
	};

	const searchData = (e) => {
		e.preventDefault();
		setCurrentPage(1);
		getData({currentPage: 1});
	};

	const changeValue = useCallback((e) => {
		let target = e.target;
		setSearchValue(target.value);
	}, []);

	const changeStatus = (value) => {
		setStatus(value);
		getData({status: value});
	}

	return (
		<div className="card cardPrimary px-3 w-100">
			<div className="card-header bg-transparent d-flex align-items-center justify-content-between">
				<p className="card-title fs22 my-2">لیست همه کاربران</p>
			</div>
			<div className="card-body w-100 d-flex flex-column px-3">
				<div className="w-100 d-flex flex-row flex-wrap align-items-center justify-content-between">
					<div className="d-flex justify-content-start align-items-center">
						<button type="button" className="bg-transparent border-0 cursor d-flex centered" onClick={() => changeStatus(1)}>
							<div className="radioContainer">
								<div className={`customRadio ${status === 1 ? 'bgMain' : 'bg-transparent'}`}/>
							</div>
							<label className="cursor p-0 m-0 pr-2" htmlFor="verified">تایید شده</label>
						</button>
						<button type="button" className="bg-transparent border-0 cursor d-flex centered mr-3" onClick={() => changeStatus(0)}>
							<div className="radioContainer">
								<div className={`customRadio ${status === 0 ? 'bgMain' : 'bg-transparent'}`}/>
							</div>
							<label className="cursor p-0 m-0 pr-2" htmlFor="rejected">رد شده</label>
						</button>
						<button type="button" className="bg-transparent border-0 cursor d-flex centered mr-3" onClick={() => changeStatus(2)}>
							<div className="radioContainer">
								<div className={`customRadio ${status === 2 ? 'bgMain' : 'bg-transparent'}`}/>
							</div>
							<label className="cursor p-0 m-0 pr-2" htmlFor="undefined">در انتظار</label>
						</button>
					</div>
					<SearchBox searchValue={searchValue} searchData={searchData} changeValue={changeValue} />
				</div>
				<div className="table-responsive">
					<table className="w-100 mt-5">
						<thead>
						<tr>
							<th style={{minWidth: 120}}>ردیف</th>
							<th style={{minWidth: 120}}>شماره موبایل</th>
							<th style={{minWidth: 120}}>نام</th>
							<th style={{minWidth: 120}}>نام خانوادگی</th>
							<th style={{minWidth: 120}}>وضعیت</th>
							<th style={{minWidth: 120}}>جزئیات بیشتر</th>
						</tr>
						</thead>
						<tbody className="w-100">
						{bigLoader && <tr>
							<td colSpan={6}>
								<Loader type="ThreeDots" color='#ff521d' height={8} width={100} className="loader"/>
							</td>
						</tr>}
						{data.length > 0 && data.map((item, index) => {
							return (
								<tr className="customTr">
									<td>{(currentPage - 1) * pageSize + (index + 1)}</td>
									<td>{item?.mobile}</td>
									<td>{item?.firstName}</td>
									<td>{item?.lastName}</td>
									<td>{item?.status ? (
										<p className="text-success font-weight-bold fs16 p-0 m-0">تایید شده</p>
									) : (
										<p className="text-danger font-weight-bold fs16 p-0 m-0">تایید نشده</p>
									)}</td>
									<td>
										<button className="outline btn btn-transparent optionBtn rounded-circle d-flex align-items-center justify-content-center m-0 p-0" style={{width: 40, height: 40}} onClick={() => openDetailsModal(item)}>
											<FontAwesomeIcon icon={faEllipsisV} className="text-secondary" style={{fontSize: 20}}/>
										</button>
									</td>
								</tr>
							);
						})}
						{(data?.length < 1 && !bigLoader) && <tr>
							<td colSpan={8}>
								<span className="text-danger">داده ای وجود ندارد.</span>
							</td>
						</tr>}
						</tbody>
					</table>
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
			{detailsModal && <UserDetailsModal item={detailsModal} setOpen={() => setDetailsModal(null)} sendSmsModal={() => setSendSmsModal(true)} />}
			{sendSmsModal && <RejectSmsModal item={detailsModal} setOpen={() => setSendSmsModal(false)} />}
		</div>
	);
}

export default AdminAllUsers;
