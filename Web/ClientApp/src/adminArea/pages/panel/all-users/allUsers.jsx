import React, {useState, useCallback, useEffect} from 'react';
import Loader from 'react-loader-spinner';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEllipsisV, faPlus} from "@fortawesome/free-solid-svg-icons";
import UserDetailsModal from "./components/userDetailsModal";
import RenderPageButtons from "../components/RenderPageButtons";
import SearchBox from "../components/SearchBox";
import RejectSmsModal from "./components/rejectSmsModal";
import {adminGetAllUsers} from "../../../api/users";
import {toast} from "react-toastify";
import toastOptions from "../../../../components/ToastOptions";
import PageNumberGenerator from "../components/PageNumberGenerator";
import {theme} from "../../../../components/shared/theme";
import Select from "react-select";
import {useDispatch} from "react-redux";
import * as MainStore from '../../../../store/main';
import generateRolesBadge from "./components/generateRolesBadge";
import AddExpertModal from "./components/AddExpertModal";

const AdminAllUsers = () => {
	const dispatch = useDispatch();
	const [bigLoader, setBigLoader] = useState(false);
	const [pageSize, setPageSize] = useState(5);
	const [currentPage, setCurrentPage] = useState(1);
	const [pagesNumber, setPagesNumber] = useState([]);
	const [searchValue, setSearchValue] = useState('');
	const [totalCount, setTotalCount] = useState(0);
	const [sendSmsModal, setSendSmsModal] = useState(false);
	const [status, setStatus] = useState(null); // 0=false 1=true 2=undefined
	const [data, setData] = useState([]);
	const [detailsModal, setDetailsModal] = useState(null);
	const [addExpertModal, setAddExpertModal] = useState(false);
	const statusTypes = [
		{
			value: null,
			label: 'همه',
		},
		{
			value: 3,
			label: 'تایید شده',
		},
		{
			value: 2,
			label: 'قفل شده',
		},
		{
			value: 5,
			label: 'تایید نشده',
		},
		{
			value: 4,
			label: 'عدم تکمیل اطلاعات',
		},
		{
			value: 6,
			label: 'در انتظار بررسی',
		},
		{
			value: 7,
			label: 'تایید شده توسط ادمین',
		},
	];
	const [value, setValue] = useState(statusTypes[0]);

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
			mobile: data?.searchValue ?? searchValue,
		};
		adminGetAllUsers(filteredData)
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

	const openDetailsModal = (item) => {
		setDetailsModal(item);
	}

	const setPageSizeValue = useCallback(async (e) => {
		let target = e.target;
		setPageSize(target.value);
		setCurrentPage(1);
		getData({currentPage: 1, pageSize: target.value});
	}, []);

	const changePageFn = (newPage) => {
		if (newPage === currentPage || newPage < 1 || newPage > pagesNumber[pagesNumber.length - 1]) {
			// do nothing
		} else {
			setCurrentPage(newPage);
			getData({currentPage: newPage});
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

	const changeStatus = (val) => {
		let {value} = val;
		setStatus(value);
		setValue(val);
		getData({status: value !== null ? value : 'null'});
	}

	const addExpert = () => {
		setAddExpertModal(true);
	}

	return (
		<div className="card cardPrimary px-3 w-100">
			<div className="card-header bg-transparent d-flex align-items-center justify-content-between">
				<p className="card-title fs22 my-2">لیست همه کاربران</p>
			</div>
			<div className="card-body w-100 d-flex flex-column px-3">
				<div className="w-100 d-flex align-items-center justify-content-start">
					<button type="button" className="btn bgMain text-white outline border-0 d-flex centered" onClick={addExpert}>
						<FontAwesomeIcon icon={faPlus} className="ml-2" />
						افزودن کارشناس
					</button>
				</div>
				<div className="w-100 d-flex flex-column-reverse flex-md-row flex-wrap align-items-center justify-content-between">
					<div className="col-12 col-sm-6 col-md-4 col-xl-3 form-group mt-4">
						<Select
							value={value}
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
					<SearchBox searchValue={searchValue} searchData={searchData} changeValue={changeValue} />
				</div>
				<div className="table-responsive table-striped customScrollbar">
					<table className="w-100 mt-5">
						<thead>
						<tr>
							<th style={{minWidth: 120}}>ردیف</th>
							<th style={{minWidth: 120}}>شماره موبایل</th>
							<th style={{minWidth: 120}}>نام</th>
							<th style={{minWidth: 120}}>نام خانوادگی</th>
							<th style={{minWidth: 120}}>نقش کاربر</th>
							<th style={{minWidth: 120}}>وضعیت</th>
							<th style={{minWidth: 120}}>جزئیات بیشتر</th>
						</tr>
						</thead>
						<tbody className="w-100">
						{!bigLoader && data.length > 0 && data.map((item, index) => {
							return (
								<tr key={item?.id} className="customTr">
									<td>{(currentPage - 1) * pageSize + (index + 1)}</td>
									<td>{item?.mobile ?? '-----'}</td>
									<td>{item?.firstName ?? '-----'}</td>
									<td>{item?.lastName ?? '-----'}</td>
									<td>
										<div className="d-flex flex-wrap align-items-center justify-content-start h-100">
											{item?.roles?.length > 0 ? generateRolesBadge(item?.roles) : '-----'}
										</div>
									</td>
									<td>{item?.status === 3 ? (
										<p className="text-success font-weight-bold fs16 p-0 m-0">تایید شده</p>
									) : item?.status === 5 ? (
										<p className="text-danger font-weight-bold fs16 p-0 m-0">تایید نشده</p>
									) : item?.status === 6 ? (
										<p className="text-warning font-weight-bold fs16 p-0 m-0">در انتظار بررسی</p>
									) : item?.status === 2 ? (
										<p className="text-secondary font-weight-bold fs16 p-0 m-0">قفل شده</p>
									) : item?.status === 7 ? (
										<p className="text-success font-weight-bold fs16 p-0 m-0">تایید شده توسط ادمین</p>
									) : (
										<p className="text-info font-weight-bold fs16 p-0 m-0">عدم تکمیل اطلاعات</p>
									)}</td>
									<td>
										<button className="outline btn btn-transparent optionBtn rounded-circle d-flex align-items-center justify-content-center m-0 p-0" style={{width: 40, height: 40}} onClick={() => openDetailsModal(item)}>
											<FontAwesomeIcon icon={faEllipsisV} className="text-secondary" style={{fontSize: 20}}/>
										</button>
									</td>
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
			{detailsModal && <UserDetailsModal item={detailsModal} setOpen={() => setDetailsModal(null)} sendSmsModal={() => setSendSmsModal(true)} refreshTable={() => getData()} />}
			{addExpertModal && <AddExpertModal setOpen={() => setAddExpertModal(false)} refreshList={() => getData()} />}
			{sendSmsModal && <RejectSmsModal item={detailsModal} setOpen={() => {
				setSendSmsModal(false);
			}} refreshTable={() => getData()}
			setAllModalClose={() => {
				setDetailsModal(null);
				setSendSmsModal(false);
			}}/>}
		</div>
	);
}

export default AdminAllUsers;
