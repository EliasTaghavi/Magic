import React, {useState, useEffect} from 'react';
import Loader from "react-loader-spinner";
import {getRatedShopsList, setMinRate} from "../../../api/rate";
import {toast} from "react-toastify";
import toastOptions from "../../../../components/ToastOptions";
import {generateMedal} from "./component/generateMedal";
import * as MainStore from "../../../../store/main";
import {useDispatch} from "react-redux";

const AdminRate = () => {
	const dispatch = useDispatch();
	const [error, setError] = useState('');
	const [rate, setRate] = useState('');
	const [focused, setFocused] = useState(false);
	const [bigLoader, setBigLoader] = useState(false);
	const [prevRate, setPrevRate] = useState('-');
	const [shops, setShops] = useState([]);
	const [loader, setLoader] = useState(false);

	useEffect(() => {
		getRatedShopsListFn();
	}, []);

	const getRatedShopsListFn = () => {
		setBigLoader(true);
		getRatedShopsList()
			.then((response) => {
				let {success, result: {min, shops}} = response
				if (response) {
					if (response === 401) {
						dispatch(MainStore.actions.setLogoutModal({type: 'admin', modal: true}));
					} else if (success) {
						setPrevRate(min.toString());
						setShops(shops);
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
	};

	const handleValidate = (e) => {
		e.preventDefault();
		if (rate?.length < 1) {
			setError('مقدار نامعتبر است');
		} else {
			let rateToSet = rate;
			setLoader(true);
			setMinRate(rate)
				.then((response) => {
					let {success} = response
					if (response) {
						if (response === 401) {
							dispatch(MainStore.actions.setLogoutModal({type: 'admin', modal: true}));
						} else if (success) {
							setPrevRate(rateToSet);
							setRate('');
							setLoader(false);
							getRatedShopsListFn();
						}
					} else {
						toast.error('خطای سرور', toastOptions);
						setLoader(false);
					}
				})
				.catch((e) => {
					toast.error('خطای سرور', toastOptions);
					setLoader(false);
				})
		}
	}

	return (
		<div className="card cardPrimary px-3 w-100">
			<div className="card-header bg-transparent d-flex align-items-center justify-content-between">
				<p className="card-title fs22 my-2">رتبه بندی</p>
			</div>
			<div className="card-body w-100 d-flex flex-column px-0">
				<p className="text-secondary fs16">تعیین حداقل رتبه بندی به معنی این است که اگر تعداد کاربران معرفی شده از طرف یک فروشگاه، در ماه جاری از حداقل تعیین شده بیشتر خرید کنند، فروشگاه به لیست رتبه بندی وارد شده و با توجه به رتبه، درصدی از مجموع مبالغ خریداری شده کاربران خود را دریافت می کند.</p>
				<div className="w-100 d-flex flex-column flex-lg-row flex-wrap align-items-center justify-content-between">
					<form noValidate={true} autoComplete="off" className="col-12 col-lg-6 px-0" onSubmit={(e) => handleValidate(e)} style={{minWidth: 250, maxWidth: 500}}>
						<div className="w-100 d-flex flex-column align-items-start justify-content-center mt-4 col-12">
							<label htmlFor="rate" className={`transition fs14 mb-0 ${focused ? 'textMain' : 'textThird'}`}>
								حداقل رتبه بندی<span style={{color: 'red'}}>{`\xa0*`}</span>
							</label>
							<div className="w-100 d-flex centered">
								<input
									id="rate"
									name="rate"
									type="number"
									autoFocus={false}
									required={true}
									min={0}
									className={`form-control input ${error.length > 0 && 'is-invalid'}`}
									value={rate}
									onChange={(e) => {
										setError('');
										setRate(e.target.value);
									}}
									placeholder="..."
									onFocus={() => setFocused(true)}
									onBlur={() => setFocused(false)}
								/>
								<button type="submit" className="btn border-0 bgMain text-white mr-2">
									{!loader && <span>ثبت</span>}
									{loader && <Loader type="ThreeDots" color='white' height={7}/>}
								</button>
							</div>
							<span className="invalid-feedback mt-2 fs14" style={{
								display: error?.length > 0 ? 'block' : 'none',
							}}>{error}</span>
							<div className="mt-4 d-flex centered">
								<p className="fs16">حداقل رتبه بندی قبل:</p>
								<p className="fs20 font-weight-bold textMain mx-3">{prevRate}</p>
							</div>
						</div>
					</form>
					<div className="col-12 col-lg-6 table-responsive table-striped mt-3 px-0" style={{minWidth: 250}}>
						<table className="col-12 mt-5">
							<thead>
							<tr className="text-center">
								<th style={{minWidth: 60}}>ردیف</th>
								<th style={{minWidth: 120}}>نام فروشگاه</th>
								<th style={{minWidth: 120}}>تعداد معرفی</th>
								<th style={{minWidth: 120}}>رتبه</th>
							</tr>
							</thead>
							<tbody className="w-100">
							{!bigLoader && shops.length > 0 && shops.map((item, index) => {
								let inRank = item?.count > prevRate && index < 4; // FIXME
								return (
									<tr key={Math.random().toString()} className="customTr text-center">
										<td>{index + 1}</td>
										<td>{item?.name ?? '-----'}</td>
										<td className="fs18 font-weight-bold textMain">{item?.count ?? '-----'}</td>
										<td>{inRank ? generateMedal(index) : '----'}</td>
									</tr>
								);
							})}
							</tbody>
						</table>
						{(shops?.length < 1 && !bigLoader) && <div className="w-100 d-flex centered py-3">
							<span className="text-danger">داده ای وجود ندارد.</span>
						</div>}
						{bigLoader && <div className="w-100 d-flex centered py-3">
							<Loader type="ThreeDots" color='#ff521d' height={8} width={100} className="loader"/>
						</div>}
					</div>
				</div>
			</div>
		</div>
	);
}

export default AdminRate;
