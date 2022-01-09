import React, {useCallback, useEffect, useState} from 'react';
import SearchBox from "../components/SearchBox";
import Loader from "react-loader-spinner";
import RenderPageButtons from "../components/RenderPageButtons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEllipsisV} from "@fortawesome/free-solid-svg-icons";
import AdminShopDetailsModal from "./components/adminShopDetailsModal";

const AdminShops = () => {
	const [bigLoader, setBigLoader] = useState(false);
	const [pageSize, setPageSize] = useState(5);
	const [currentPage, setCurrentPage] = useState(1);
	const [pagesNumber, setPagesNumber] = useState([]);
	const [searchValue, setSearchValue] = useState('');
	const [totalCount, setTotalCount] = useState(0);
	const [data, setData] = useState([]);
	const [detailsModal, setDetailsModal] = useState(false);

	const openDetailsModal = (item) => {
		setDetailsModal(item);
	}

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
		// do nothing
	}

	const changePageFn = (newPage) => {
		if (newPage === currentPage || newPage < 1 || newPage > pagesNumber[pagesNumber.length - 1]) {
			// do nothing
		} else {
			setCurrentPage(newPage);
			// getData(newPage);
		}
	};

	const setPageSizeValue = useCallback((e) => {
		let target = e.target;
		setCurrentPage(1);
		setPageSize(target.value);
		getData({currentPage: 1, pageSize: target.value});
	}, []);

	return (
		<div className="card cardPrimary px-3 w-100">
			<div className="card-header bg-transparent d-flex align-items-center justify-content-between">
				<p className="card-title fs22 my-2">لیست فروشگاه ها</p>
			</div>
			<div className="card-body w-100 d-flex flex-column px-3">
				<div className="w-100 d-flex flex-row flex-wrap align-items-center justify-content-end">
					<SearchBox searchValue={searchValue} searchData={searchData} changeValue={changeValue} />
				</div>
				<div className="table-responsive">
					<table className="w-100 mt-5">
						<thead>
						<tr>
							<th style={{minWidth: 120}}>ردیف</th>
							<th style={{minWidth: 120}}>نام فروشگاه</th>
							<th style={{minWidth: 120}}>نام مدیر فروشگاه</th>
							<th style={{minWidth: 120}}>تاریخ عضویت</th>
							<th style={{minWidth: 120}}>جزئیات بیشتر</th>
						</tr>
						</thead>
						<tbody className="w-100">
						{data.length > 0 && data.map((item, index) => {
							return (
								<tr className="customTr">
									<td>{(currentPage - 1) * pageSize + (index + 1)}</td>
									<td>{item?.shopName}</td>
									<td>{item?.shopManager}</td>
									<td>{item?.signupDate}</td>
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
			{detailsModal && <AdminShopDetailsModal item={detailsModal} setOpen={() => setDetailsModal(null)} />}
		</div>
	);
}

export default AdminShops;
