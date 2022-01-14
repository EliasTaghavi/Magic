import React, {useState, useEffect} from 'react';
import Loader from "react-loader-spinner";
import {getRatedShopsList} from "../../../api/rate";

const AdminRate = () => {
	const [errors, setErrors] = useState({});
	const [rate, setRate] = useState({});
	const [focused, setFocused] = useState(false);
	const [bigLoader, setBigLoader] = useState(false);
	const [data, setData] = useState([]);

	useEffect(() => {
		getRatedShopsListFn();
	}, []);

	const getRatedShopsListFn = () => {
		getRatedShopsList()
			.then((response) => {
				console.log(response);
			})
			.catch((error) => {
				console.log(error, error.response);
			})
	};

	const handleValidate = (e) => {
		e.preventDefault();
	}

	return (
		<div className="card cardPrimary px-3 w-100">
			<div className="card-header bg-transparent d-flex align-items-center justify-content-between">
				<p className="card-title fs22 my-2">رتبه بندی</p>
			</div>
			<div className="card-body w-100 d-flex flex-column px-3">
				<p className="text-secondary fs16">تعیین حداقل رتبه بندی به معنی این است که اگر تعداد کاربران معرفی شده از طرف یک فروشگاه، در ماه جاری از حداقل تعیین شده بیشتر خرید کنند، فروشگاه به لیست رتبه بندی وارد شده و با توجه به رتبه، درصدی از مجموع مبالغ خریداری شده کاربران خود را دریافت می کند.</p>
				<form noValidate={true} autoComplete="off" onSubmit={(e) => handleValidate(e)}>
					<div className="d-flex flex-column align-items-start justify-content-center mt-4 col-12 col-md-3">
						<label htmlFor="rate" className={`transition fs14 mb-0 ${focused ? 'textMain' : 'textThird'}`}>
							حداقل رتبه بندی<span style={{color: 'red'}}>{`\xa0*`}</span>
						</label>
						<div className="w-100 d-flex flex-column flex-md-row centered">
							<input
								id="rate"
								name="rate"
								type="number"
								autoFocus={false}
								required={true}
								min={0}
								className={`form-control input ${errors['rate'] && 'is-invalid'}`}
								value={rate}
								onChange={(e) => setRate(e.target.value)}
								placeholder="..."
								onFocus={() => setFocused(true)}
								onBlur={() => setFocused(false)}
							/>
							<button type="button" className="btn border-0 bgMain text-white mr-2">
								ثبت
							</button>
						</div>
						<span className="invalid-feedback mt-2 fs14" style={{
							display: errors['rate'] ? 'block' : 'none',
						}}>{errors['rate']}</span>
					</div>
				</form>
				<div className="table-responsive table-striped mt-3">
					<table className="col-12 col-md-5 mt-5">
						<thead>
						<tr>
							<th style={{minWidth: 60}}>ردیف</th>
							<th style={{minWidth: 120}}>نام فروشگاه</th>
							<th style={{minWidth: 120}}>تعداد معرفی</th>
						</tr>
						</thead>
						<tbody className="w-100">
						{!bigLoader && data.length > 0 && data.map((item, index) => {
							return (
								<tr key={item?.id} className="customTr">
									<td>{index}</td>
									<td>{item?.name ?? '-----'}</td>
									<td>{item?.rate ?? '-----'}</td>
								</tr>
							);
						})}
						</tbody>
					</table>
					{(data?.length < 1 && !bigLoader) && <div className="col-12 col-md-5 d-flex centered py-3">
						<span className="text-danger">داده ای وجود ندارد.</span>
					</div>}
					{bigLoader && <div className="col-12 col-md-5 d-flex centered py-3">
						<Loader type="ThreeDots" color='#ff521d' height={8} width={100} className="loader"/>
					</div>}
				</div>
			</div>
		</div>
	);
}

export default AdminRate;
