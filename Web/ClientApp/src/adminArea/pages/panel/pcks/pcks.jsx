import React, {useCallback, useEffect, useState} from 'react';
import SearchBox from "../components/SearchBox";
import Loader from "react-loader-spinner";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faTrash} from "@fortawesome/free-solid-svg-icons";
import RenderPageButtons from "../components/RenderPageButtons";
import NewPckModal from "./components/newPckModal";
import {adminGetAllPcks, deletePck} from "../../../api/pck";
import PageNumberGenerator from "../components/PageNumberGenerator";
import {toast} from "react-toastify";
import toastOptions from "../../../../components/ToastOptions";
import NumberFormat from "react-number-format";
import DeleteItemModal from "../../../../components/shared/deleteItemModal";
import {OverlayTrigger, Tooltip} from "react-bootstrap";
import * as MainStore from "../../../../store/main";
import {useDispatch} from "react-redux";

const AdminPcks = () => {
	const dispatch = useDispatch();
	const [bigLoader, setBigLoader] = useState(false);
	const [pageSize, setPageSize] = useState(5);
	const [currentPage, setCurrentPage] = useState(1);
	const [pagesNumber, setPagesNumber] = useState([]);
	const [searchValue, setSearchValue] = useState('');
	const [totalCount, setTotalCount] = useState(0);
	const [data, setData] = useState([]);
	const [newPckModal, setNewPckModal] = useState(false);
	const [deleteItemModal, setDeleteItemModal] = useState(null);

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
		let filteredData = {
			index: data?.currentPage ?? currentPage,
			size: data?.pageSize ?? pageSize,
			title: data?.searchValue ?? searchValue,
		};
		adminGetAllPcks(filteredData)
			.then((response) => {
				let {success, result: {count, items}} = response
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
			getData({currentPage: newPage});
		}
	};

	const setPageSizeValue = useCallback((e) => {
		let target = e.target;
		setCurrentPage(1);
		setPageSize(target.value);
		getData({currentPage: 1, pageSize: target.value});
	}, []);

	const deleteItem = () => {
		deletePck(deleteItemModal)
			.then((response) => {
				let {success} = response
				if (response) {
					if (response === 401) {
						dispatch(MainStore.actions.setLogoutModal({type: 'admin', modal: true}));
					} else if (success) {
						toast.success('آیتم با موفقیت حذف شد', toastOptions);
						getData();
						setDeleteItemModal(null);
					}
				} else {
					toast.error('خطای سرور', toastOptions);
					setDeleteItemModal(null);
				}
			})
			.catch((error) => {
				toast.error('خطای سرور', toastOptions);
				setDeleteItemModal(null);
			});
	};

	return (
		<div className="card cardPrimary px-3 w-100">
			<div className="card-header bg-transparent d-flex align-items-center justify-content-between">
				<p className="card-title fs22 my-2">لیست پکیج ها</p>
			</div>
			<div className="card-body w-100 d-flex flex-column px-3">
				<div className="w-100 d-flex flex-row flex-wrap align-items-center justify-content-between">
					<button type="button" className="btn bgMain text-white outline border-0 d-flex centered" onClick={() => setNewPckModal(true)}>
						<FontAwesomeIcon icon={faPlus} className="ml-2" />
						افزودن پکیج
					</button>
					<SearchBox searchValue={searchValue} searchData={searchData} changeValue={changeValue} />
				</div>
				<div className="table-responsive table-striped">
					<table className="w-100 mt-5">
						<thead>
							<tr>
								<th style={{minWidth: 120}}>ردیف</th>
								<th style={{minWidth: 120}}>نام پکیج</th>
								<th style={{minWidth: 120}}>قیمت</th>
								<th style={{minWidth: 120}}>مدت زمان</th>
								<th style={{minWidth: 120}}>توضیحات</th>
								<th style={{minWidth: 120}}>عملیات</th>
							</tr>
						</thead>
						<tbody className="w-100">
						{!bigLoader && data.length > 0 && data.map((item, index) => {
							return (
								<tr key={item?.id} className="customTr">
									<td className="py-3">{(currentPage - 1) * pageSize + (index + 1)}</td>
									<td>{item?.title ?? '-----'}</td>
									<td>{item?.price ? <NumberFormat value={item?.price} displayType={'text'} thousandSeparator={true} className="fontSizePreSmall" /> : '-----'}</td>
									<td>{item?.dayCount ?? '-----'}</td>
									<td>{item?.description?.length > 0 ? item?.description : '-----'}</td>
									<td>
										<OverlayTrigger
											key='details'
											placement='left'
											overlay={
												<Tooltip id={`tooltip-top`} style={{fontFamily: 'Vazir', fontSize: 14}}>
													حذف
												</Tooltip>
											}>
											<button type="button" className="btn bg-transparent border-0 outline" onClick={() => setDeleteItemModal(item)}>
												<FontAwesomeIcon icon={faTrash} className="text-danger fs18" />
											</button>
										</OverlayTrigger>
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
			{newPckModal && <NewPckModal setOpen={() => setNewPckModal(null)} refreshList={() => getData()} />}
			{deleteItemModal && <DeleteItemModal item={{type: 'پکیج', name: deleteItemModal?.title}} setOpen={() => setDeleteItemModal(null)} deleteItem={deleteItem} />}
		</div>
	);
}

export default AdminPcks;
