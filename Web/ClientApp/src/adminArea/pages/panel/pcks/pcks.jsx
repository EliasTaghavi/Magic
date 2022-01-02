import React, {useCallback, useEffect, useState} from 'react';
import SearchBox from "../components/SearchBox";
import Loader from "react-loader-spinner";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import RenderPageButtons from "../components/RenderPageButtons";
import NewPckModal from "./components/newPckModal";

const AdminPcks = () => {
	const [bigLoader, setBigLoader] = useState(false);
	const [pageSize, setPageSize] = useState(5);
	const [currentPage, setCurrentPage] = useState(1);
	const [pagesNumber, setPagesNumber] = useState([]);
	const [searchValue, setSearchValue] = useState('');
	const [totalCount, setTotalCount] = useState(0);
	const [data, setData] = useState([]);
	const [newPckModal, setNewPckModal] = useState(false);

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
				<div className="table-responsive">
					<table className="w-100 mt-5">
						<thead>
						<tr>
							<th style={{minWidth: 120}}>ردیف</th>
							<th style={{minWidth: 120}}>نام پکیج</th>
							<th style={{minWidth: 120}}>قیمت</th>
							<th style={{minWidth: 120}}>مدت زمان</th>
							<th style={{minWidth: 120}}>توضیحات</th>
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
									<td>{item?.name}</td>
									<td>{item?.price}</td>
									<td>{item?.duration}</td>
									<td>{item?.description}</td>
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
			{newPckModal && <NewPckModal setOpen={() => setNewPckModal(null)} />}
		</div>
	);
}

export default AdminPcks;
