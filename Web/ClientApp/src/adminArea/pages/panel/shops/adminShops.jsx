import React, {useCallback, useEffect, useState} from 'react';
import SearchBox from "../components/SearchBox";
import Loader from "react-loader-spinner";
import RenderPageButtons from "../components/RenderPageButtons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faTrash, faEdit, faCheck, faTimes} from "@fortawesome/free-solid-svg-icons";
import CreateShopModal from "./components/createShopModal";
import {adminGetAllShops, deleteShop, editDiscount} from "../../../api/shop";
import PageNumberGenerator from "../components/PageNumberGenerator";
import {toast} from "react-toastify";
import toastOptions from "../../../../components/ToastOptions";
import {OverlayTrigger, Tooltip} from "react-bootstrap";
import DeleteItemModal from "../../../../components/shared/deleteItemModal";
import * as MainStore from "../../../../store/main";
import {useDispatch} from "react-redux";

const AdminShops = () => {
	const dispatch = useDispatch();
	const [bigLoader, setBigLoader] = useState(false);
	const [pageSize, setPageSize] = useState(5);
	const [currentPage, setCurrentPage] = useState(1);
	const [pagesNumber, setPagesNumber] = useState([]);
	const [searchValue, setSearchValue] = useState('');
	const [totalCount, setTotalCount] = useState(0);
	const [data, setData] = useState([]);
	const [deleteItemModal, setDeleteItemModal] = useState(null);
	const [createShopModal, setCreateShopModal] = useState(false);
	const [discountEditEnable, setDiscountEditEnable] = useState(undefined);
	const [discount, setDiscount] = useState('');
	const [discountError, setDiscountError] = useState(false);
	const [submitDiscountLoader, setSubmitDiscountLoader] = useState(false);

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
			keyword: data?.searchValue ?? searchValue,
		};
		adminGetAllShops(filteredData)
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
		deleteShop(deleteItemModal)
			.then((response) => {
				console.log(response);
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
			.catch((e) => {
				console.log(e, e.response);
				toast.error('خطای سرور', toastOptions);
				setDeleteItemModal(null);
			});
	};

	const validateDiscount = () => {
		let onlyFloatNumber = /^-?\d*(\.\d+)?$/;
		if (!discount || discount.length < 1 || !onlyFloatNumber.test(discount)) {
			setDiscountError(true);
		} else {
			setSubmitDiscountLoader(true);
			let data = {
				shopId: discountEditEnable?.id,
				newDiscount: discount,
			}
			editDiscount(data)
				.then((response) => {
					let {success} = response
					if (response) {
						if (response === 401) {
							dispatch(MainStore.actions.setLogoutModal({type: 'admin', modal: true}));
						} else if (success) {
							setDiscount('');
							setDiscountEditEnable(undefined);
							getData();
							setSubmitDiscountLoader(false);
							toast.success('آیتم مورد نظر با موفقیت آپدیت شد', toastOptions);
						}
					} else {
						toast.error('خطای سرور', toastOptions);
						setSubmitDiscountLoader(false);
					}
				})
				.catch(() => {
					toast.error('خطای سرور', toastOptions);
					setSubmitDiscountLoader(false);
				});
		}
	}

	return (
		<div className="card cardPrimary px-3 w-100">
			<div className="card-header bg-transparent d-flex align-items-center justify-content-between">
				<p className="card-title fs22 my-2">لیست فروشگاه ها</p>
			</div>
			<div className="card-body w-100 d-flex flex-column px-3">
				<div className="w-100 d-flex flex-row flex-wrap align-items-center justify-content-between">
					<button type="button" className="btn bgMain text-white d-flex centered" onClick={() => setCreateShopModal(true)}>
						<FontAwesomeIcon icon={faPlus} className="fs18 text-white ml-2" />
						<span>ایجاد فروشگاه</span>
					</button>
					<SearchBox searchValue={searchValue} searchData={searchData} changeValue={changeValue} />
				</div>
				<div className="table-responsive table-striped">
					<table className="w-100 mt-5">
						<thead>
						<tr>
							<th style={{minWidth: 60}}>ردیف</th>
							<th style={{minWidth: 120}}>نام فروشگاه</th>
							<th style={{minWidth: 120}}>تلفن تماس</th>
							<th style={{minWidth: 120}}>نام مدیر</th>
							<th style={{minWidth: 120}}>شماره تماس مدیر</th>
							<th style={{minWidth: 120}}>تاریخ عضویت</th>
							<th style={{minWidth: 120}}>آدرس</th>
							<th style={{minWidth: 120}}>درصد تخفیف</th>
							<th style={{minWidth: 120}}>کد معرف</th>
							<th style={{minWidth: 120}}>عملیات</th>
						</tr>
						</thead>
						<tbody className="w-100">
						{!bigLoader && data.length > 0 && data.map((item, index) => {
							return (
								<tr key={item?.id} className="customTr">
									<td>{(currentPage - 1) * pageSize + (index + 1)}</td>
									<td>{item?.name ?? '-----'}</td>
									<td>{item?.phone ?? '-----'}</td>
									<td>{item?.userFullName?.trim().length > 0 ? item?.userFullName : '-----'}</td>
									<td>{item?.userMobile ?? '-----'}</td>
									<td>{item?.createdDate ?? '-----'}</td>
									<td>{item?.address ?? '-----'}</td>
									<td className="discount">
										<div className="d-flex align-items-center justify-content-start">
											{discountEditEnable?.id !== item?.id && <p className="fs18 m-0">{`${item?.latestOff}%`}</p>}
											{discountEditEnable?.id === item?.id && (
												<input
													id="discount"
													name="discount"
													type="text"
													autoFocus={true}
													required={true}
													className={`form-control input ${discountError && 'is-invalid'}`}
													value={discount}
													onChange={(e) => {
														setDiscountError(false);
														setDiscount(e.target.value);
													}}
													placeholder="..."
												/>
											)}
											{(discountEditEnable?.id !== item?.id) && <OverlayTrigger
												placement='left'
												overlay={
													<Tooltip id={`tooltip-top`} style={{fontFamily: 'Vazir'}}>
														ویرایش
													</Tooltip>
												}>
												<button type="button" className="btn btn-transparent outline" onClick={() => {
													setDiscount(item?.latestOff);
													setDiscountEditEnable(item);
												}}>
													<FontAwesomeIcon icon={faEdit} className="fs14 text-secondary" />
												</button>
											</OverlayTrigger>}
											{(discountEditEnable?.id === item?.id) && <OverlayTrigger
												placement='left'
												overlay={
													<Tooltip id={`tooltip-top`} style={{fontFamily: 'Vazir'}}>
														تایید
													</Tooltip>
												}>
												<button type="submit" className="btn btn-transparent outline" onClick={() => validateDiscount()}>
													{!submitDiscountLoader && <FontAwesomeIcon icon={faCheck} className="text-success"/>}
													{submitDiscountLoader && <Loader type="ThreeDots" color='#ff521d' height={6} width={20} className="loader"/>}
												</button>
											</OverlayTrigger>}
											{(discountEditEnable?.id === item?.id) && <OverlayTrigger
												placement='left'
												overlay={
													<Tooltip id={`tooltip-top`} style={{fontFamily: 'Vazir'}}>
														انصراف
													</Tooltip>
												}>
												<button type="submit" className="btn btn-transparent outline" disabled={submitDiscountLoader} onClick={() => {
													setDiscount('');
													setDiscountEditEnable(undefined);
												}}>
													<FontAwesomeIcon icon={faTimes} className="text-danger" />
												</button>
											</OverlayTrigger>}
										</div>
									</td>
									<td>{item?.refCode ?? '-----'}</td>
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
			{createShopModal && <CreateShopModal setOpen={() => setCreateShopModal(false)} refreshData={() => getData()} />}
			{deleteItemModal && <DeleteItemModal item={{type: 'فروشگاه', name: deleteItemModal?.name ?? '-----'}} setOpen={() => setDeleteItemModal(null)} deleteItem={deleteItem} />}
		</div>
	);
}

export default AdminShops;
