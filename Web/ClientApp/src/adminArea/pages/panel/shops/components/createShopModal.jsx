import React, {useState} from 'react';
import {Modal} from "react-bootstrap";
import Loader from "react-loader-spinner";
import {toast} from "react-toastify";
import toastOptions from "../../../../../components/ToastOptions";
import CreateShopValidation from "../../../../validations/createShopValidation";
import {SendCreateShopData} from "../../../../api/shop";

const CreateShopModal = ({refreshData, setOpen}) => {
	const [errors, setErrors] = useState({});
	const [name, setName] = useState('');
	const [phone, setPhone] = useState('');
	const [ownerFirstName, setOwnerFirstName] = useState('');
	const [ownerLastName, setOwnerLastName] = useState('');
	const [ownerMobile, setOwnerMobile] = useState('');
	const [address, setAddress] = useState('');
	const [focused, setFocused] = useState('');
	const [loader, setLoader] = useState(false);

	const focusedFn = (e) => {
		let target = e.target;
		setFocused(target.name);
	}

	const unfocusedFn = () => {
		setFocused('');
	}

	const changeValue = (e) => {
		let target = e.target;
		delete errors[target.name];
		switch (target.name) {
			case 'name':
				setName(target.value);
				break;
			case 'phone':
				setPhone(target.value);
				break;
			case 'ownerFirstName':
				setOwnerFirstName(target.value);
				break;
			case 'ownerLastName':
				setOwnerLastName(target.value);
				break;
			case 'ownerMobile':
				setOwnerMobile(target.value);
				break;
			case 'address':
				setAddress(target.value);
				break;
			default:
				break;
		}
	}

	const handleValidate = (e) => {
		e.preventDefault();
		let data = {
			name,
			phone,
			ownerFirstName,
			ownerLastName,
			ownerMobile,
			address,
		}
		CreateShopValidation(data)
			.then((response) => {
				if (Object.entries(response).length < 1) {
					sendData();
				} else {
					setErrors(response);
					toast.error('لطفا اشکالات بالا را رفع نمایید', toastOptions)
				}
			})
			.catch(() => {
				toast.error('خطای سرور', toastOptions)
			})
	}

	const sendData = () => {
		setLoader(true);
		let data = {
			name,
			phone,
			ownerFirstName,
			ownerLastName,
			ownerMobile,
			address,
		};
		SendCreateShopData(data)
			.then((response) => {
				let {success} = response
				if (response) {
					if (response === 401) {
						// do nothing but in another api's should logout from system
					} else if (success) {
						refreshData();
						setOpen();
						setLoader(false);
					}
				} else {
					toast.error('خطای سرور', toastOptions);
					setLoader(false);
				}
			})
			.catch(() => {
				toast.error('خطای سرور', toastOptions);
				setLoader(false);
			})
	};

	return (
		<Modal
			show={true}
			size="lg"
			onHide={() => setOpen(false)}
		>
			<div className="modal-content">
				<div className="modal-header fs16 font-weight-bold">
					افزودن فروشگاه جدید
				</div>
				<form noValidate={true} autoComplete="off" onSubmit={(e) => handleValidate(e)}>
					<div className="modal-body d-flex flex-wrap align-items-start justify-content-start pt-5">
						<div className="d-flex flex-column align-items-start justify-content-center col-12 col-md-6">
							<label htmlFor="name" className={`transition fs14 mb-0 ${focused === 'name' ? 'textMain' : 'textThird'}`}>
								نام فروشگاه<span style={{color: 'red'}}>{`\xa0*`}</span>
							</label>
							<input
								id="name"
								name="name"
								type="text"
								autoFocus={false}
								required={true}
								className={`form-control input ${errors['name'] && 'is-invalid'}`}
								value={name}
								onChange={changeValue}
								placeholder="..."
								onFocus={focusedFn}
								onBlur={unfocusedFn}
							/>
							<span className="invalid-feedback mt-2 fs14" style={{
								display: errors['name'] ? 'block' : 'none',
							}}>{errors['name']}</span>
						</div>
						<div className="d-flex flex-column align-items-start justify-content-center col-12 col-md-6 mt-4 mt-md-0">
							<label htmlFor="phone" className={`transition fs14 mb-0 ${focused === 'phone' ? 'textMain' : 'textThird'}`}>
								شماره تماس<span style={{color: 'red'}}>{`\xa0*`}</span>
							</label>
							<input
								id="phone"
								name="phone"
								type="text"
								autoFocus={false}
								required={true}
								className={`form-control input ${errors['phone'] && 'is-invalid'}`}
								value={phone}
								onChange={changeValue}
								placeholder="..."
								onFocus={focusedFn}
								onBlur={unfocusedFn}
							/>
							<span className="invalid-feedback mt-2 fs14" style={{
								display: errors['phone'] ? 'block' : 'none',
							}}>{errors['phone']}</span>
						</div>
						<div className="d-flex flex-column align-items-start justify-content-center col-12 col-md-6 mt-4">
							<label htmlFor="ownerFirstName" className={`transition fs14 mb-0 ${focused === 'ownerFirstName' ? 'textMain' : 'textThird'}`}>
								نام صاحب فروشگاه<span style={{color: 'red'}}>{`\xa0*`}</span>
							</label>
							<input
								id="ownerFirstName"
								name="ownerFirstName"
								type="text"
								autoFocus={false}
								required={true}
								className={`form-control input ${errors['ownerFirstName'] && 'is-invalid'}`}
								value={ownerFirstName}
								onChange={changeValue}
								placeholder="..."
								onFocus={focusedFn}
								onBlur={unfocusedFn}
							/>
							<span className="invalid-feedback mt-2 fs14" style={{
								display: errors['ownerFirstName'] ? 'block' : 'none',
							}}>{errors['ownerFirstName']}</span>
						</div>
						<div className="d-flex flex-column align-items-start justify-content-center col-12 col-md-6 mt-4">
							<label htmlFor="ownerLastName" className={`transition fs14 mb-0 ${focused === 'ownerLastName' ? 'textMain' : 'textThird'}`}>
								نام خانوادگی صاحب فروشگاه<span style={{color: 'red'}}>{`\xa0*`}</span>
							</label>
							<input
								id="ownerLastName"
								name="ownerLastName"
								type="text"
								autoFocus={false}
								required={true}
								className={`form-control input ${errors['ownerLastName'] && 'is-invalid'}`}
								value={ownerLastName}
								onChange={changeValue}
								placeholder="..."
								onFocus={focusedFn}
								onBlur={unfocusedFn}
							/>
							<span className="invalid-feedback mt-2 fs14" style={{
								display: errors['ownerLastName'] ? 'block' : 'none',
							}}>{errors['ownerLastName']}</span>
						</div>
						<div className="d-flex flex-column align-items-start justify-content-center col-12 col-md-6 mt-4">
							<label htmlFor="ownerMobile" className={`transition fs14 ${focused === 'ownerMobile' ? 'textMain' : 'textThird'}`}>
								شماره موبایل صاحب فروشگاه<span style={{color: 'red'}}>{`\xa0*`}</span>
							</label>
							<input
								id="ownerMobile"
								name="ownerMobile"
								type="text"
								autoFocus={false}
								required={true}
								className={`form-control input ${errors['ownerMobile'] && 'is-invalid'}`}
								value={ownerMobile}
								onChange={changeValue}
								placeholder="..."
								onFocus={focusedFn}
								onBlur={unfocusedFn}
							/>
							<span className="invalid-feedback mt-2 fs14" style={{
								display: errors['ownerMobile'] ? 'block' : 'none',
							}}>{errors['ownerMobile']}</span>
						</div>
						<div className="d-flex flex-column align-items-start justify-content-center col-12 mt-4">
							<label htmlFor="address" className={`transition fs14 ${focused === 'address' ? 'textMain' : 'textThird'}`}>
								آدرس<span style={{color: 'red'}}>{`\xa0*`}</span>
							</label>
							<textarea
								id="address"
								name="address"
								autoFocus={false}
								required={true}
								value={address}
								className={`form-control text-right addressBox ${errors['address'] && 'is-invalid'}`}
								onChange={changeValue}
								placeholder="..."
								onFocus={focusedFn}
								onBlur={unfocusedFn}
							/>
							<span className="invalid-feedback mt-2 fs14" style={{
								display: errors['address'] ? 'block' : 'none',
							}}>{errors['address']}</span>
						</div>
					</div>
					<div className="modal-footer d-flex justify-content-between align-items-center mt-3">
						<button type="submit" className="btn bgMain border-0 rounded px-3 py-2 text-white ml-1">
							{!loader && <span>ثبت</span>}
							{loader && <Loader type="ThreeDots" color='#ffffff' height={8} width={100} className="loader"/>}
						</button>
						<button type="button" className="btn btn-secondary border-0 rounded px-3 py-2 text-white" onClick={() => setOpen(false)}>بستن</button>
					</div>
				</form>
			</div>
		</Modal>
	);
}

export default CreateShopModal;
