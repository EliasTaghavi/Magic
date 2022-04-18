import React, {useState} from 'react';
import Loader from "react-loader-spinner";
import {Modal} from "react-bootstrap";
import DatePicker from "react-modern-calendar-datepicker";
import {maximumDate} from "../../../../../usersArea/pages/auth/user/loginUser.components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import Resizer from "react-image-file-resizer";
import addExpertValidation from "../../../../validations/addExpertValidation";
import {toast} from "react-toastify";
import toastOptions from "../../../../../components/ToastOptions";
import * as MainStore from "../../../../../store/main";
import {useDispatch} from "react-redux";
import {sendExpertData} from "../../../../api/users";

const AddExpertModal = ({setOpen, refreshList}) => {
	const dispatch = useDispatch();
	const [errors, setErrors] = useState({});
	const [focused, setFocused] = useState('');
	const [loader, setLoader] = useState(false);
	const [name, setName] = useState('');
	const [lastName, setLastName] = useState('');
	const [birthday, setBirthday] = useState('');
	const [mobile, setMobile] = useState('');
	const [password, setPassword] = useState('');
	const [address, setAddress] = useState('');
	const [image, setImage] = useState('');
	const [selfiImage, setSelfiImage] = useState('');
	const [imagePreviewUrl, setImagePreviewUrl] = useState('');
	const [selfiImagePreviewUrl, setSelfiImagePreviewUrl] = useState('');

	const focusedFn = (e) => {
		let target = e.target;
		setFocused(target.name);
	}

	const unfocusedFn = () => {
		setFocused('');
	}

	const selectDay = (data) => {
		delete errors['birthday'];
		setBirthday(data)
	};

	const changeValue = (e) => {
		let target = e.target;
		delete errors[target.name];
		switch (target.name) {
			case 'name':
				setName(target.value);
				break;
			case 'lastName':
				setLastName(target.value);
				break;
			case 'mobile':
				setMobile(target.value);
				break;
			case 'password':
				setPassword(target.value);
				break;
			case 'address':
				setAddress(target.value);
				break;
			default:
				break;
		}
	}

	const sendImage = async (e, type) => {
		let newErrors = errors;
		if (type === 'selfi') {
			if (e.target.files && e.target.files[0]) {
				// if (e.target.files[0].size / 1024 < 500) {
				delete errors['selfiImage'];
				setErrors({...errors, newErrors});

				let reader = new FileReader();
				let data = e.target.files[0];
				let blobName = data?.name ?? `${(Math.random() * 100).toFixed(0).toString()}.jpg`;
				let tempImage = new Image();
				let _URL = window.URL || window.webkitURL;

				tempImage.src = _URL.createObjectURL(data);

				tempImage.onload = () => {
					let width = data.size > 1047576 ? tempImage.width / 5 : tempImage.width;
					let height = data.size > 1047576 ? tempImage.height / 5 : tempImage.height;

					Resizer.imageFileResizer(
						data,
						width,
						height,
						'JPG',
						100,
						0,
						uri => {
							uri.lastModifiedDate = new Date();
							uri.name = blobName;
							reader.readAsDataURL(uri);
							setSelfiImage(uri);
						},
						'blob'
					);
					Resizer.imageFileResizer(
						data,
						width,
						height,
						'JPG',
						100,
						0,
						uri => {
							setSelfiImagePreviewUrl(uri);
						},
						'base64'
					);
				};
			}
		} else {
			if (e.target.files && e.target.files[0]) {
				// if (e.target.files[0].size / 1024 < 500) {
				delete errors['image'];
				setErrors({...errors, newErrors});

				let reader = new FileReader();
				let data = e.target.files[0];
				let blobName = data?.name ?? `${(Math.random() * 100).toFixed(0).toString()}.jpg`;
				let tempImage = new Image();
				let _URL = window.URL || window.webkitURL;

				tempImage.src = _URL.createObjectURL(data);

				tempImage.onload = () => {
					let width = data.size > 1047576 ? tempImage.width / 5 : tempImage.width;
					let height = data.size > 1047576 ? tempImage.height / 5 : tempImage.height;

					Resizer.imageFileResizer(
						data,
						width,
						height,
						'JPG',
						100,
						0,
						uri => {
							uri.lastModifiedDate = new Date();
							uri.name = blobName;
							reader.readAsDataURL(uri);
							setImage(uri);
						},
						'blob'
					);
					Resizer.imageFileResizer(
						data,
						width,
						height,
						'JPG',
						100,
						0,
						uri => {
							setImagePreviewUrl(uri);
						},
						'base64'
					);
				};
			}
		}
	}

	const removeImage = (type) => {
		if (type === 'selfi') {
			setSelfiImagePreviewUrl('');
			setSelfiImage('');
		} else {
			setImagePreviewUrl('');
			setImage('');
		}
	}

	const sendVerification = () => {
		let expertData = {
			name,
			lastName,
			birthday,
			selfiImage,
			address,
			image,
			mobile,
			password,
		};
		addExpertValidation(expertData)
			.then((response) => {
				if (Object.entries(response).length < 1) {
					sendExpertDataFn();
				} else {
					setErrors(response);
					toast.error('لطفا اشکالات بالا را رفع نمایید.', toastOptions)
				}
			})
			.catch(() => {
				toast.error('خطای سرور', toastOptions)
			})
	}

	const sendExpertDataFn = () => {
		setLoader(true);
		let expertData = {
			Name: name,
			Surname: lastName,
			Mobile: mobile,
			Address: address,
			Birthday: `${birthday?.year}/${birthday?.month}/${birthday?.day}`,
			Password: password,
			Selfie: selfiImage,
			Identity: image,
			UserTypeId: '',
		};
		sendExpertData(expertData)
			.then((response) => {
				let {success} = response;
				if (response) {
					if (response === 401) {
						dispatch(MainStore.actions.setLogoutModal({type: 'admin', modal: true}));
					} else if (success) {
						toast.success('کارشناس با موفقیت افزوده شد', toastOptions);
						setOpen(false);
						refreshList(true);
						setLoader(false);
					}
				} else {
					toast.error('خطای سرور', toastOptions);
					setLoader(false);
				}
			})
			.catch((e) => {
				toast.error('خطای سرور', toastOptions);
				setLoader(false);
			});
	}

	return (
		<Modal
			show={true}
			size="lg"
			onHide={() => setOpen(false)}
		>
			<div className="modal-content">
				<div className="modal-header fs16 font-weight-bold d-flex align-items-center justify-content-between">
					افزودن کارشناس جدید
				</div>
				<div className="modal-body d-flex flex-column align-items-start justify-content-start py-4 w-100">
					<div className="w-100 d-flex flex-wrap align-items-center justify-content-between">
						<div className="col-12 col-md-6 d-flex flex-column align-items-start justify-content-center w-100">
							<label htmlFor="name" className={`transition fs14 mb-0 ${focused === 'name' ? 'textMain' : 'textThird'}`}>
								نام<span style={{color: 'red'}}>{`\xa0*`}</span>
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
						<div className="col-12 col-md-6 d-flex flex-column align-items-start justify-content-center w-100 mt-4 mt-md-0">
							<label htmlFor="lastName" className={`transition fs14 mb-0 ${focused === 'lastName' ? 'textMain' : 'textThird'}`}>
								نام خانوادگی<span style={{color: 'red'}}>{`\xa0*`}</span>
							</label>
							<input
								id="lastName"
								name="lastName"
								type="text"
								autoFocus={false}
								required={true}
								className={`form-control input ${errors['lastName'] && 'is-invalid'}`}
								value={lastName}
								onChange={changeValue}
								placeholder="..."
								onFocus={focusedFn}
								onBlur={unfocusedFn}
							/>
							<span className="invalid-feedback mt-2 fs14" style={{
								display: errors['lastName'] ? 'block' : 'none',
							}}>{errors['lastName']}</span>
						</div>
					</div>
					<div className="w-100 d-flex flex-wrap align-items-center justify-content-between">
						<div className="col-12 col-md-6 d-flex flex-column align-items-start justify-content-center w-100 mt-4">
							<label htmlFor="mobile" className={`transition fs14 mb-0 ${focused === 'mobile' ? 'textMain' : 'textThird'}`}>
								شماره موبایل<span style={{color: 'red'}}>{`\xa0*`}</span>
							</label>
							<input
								id="mobile"
								name="mobile"
								type="number"
								autoFocus={false}
								required={true}
								className={`form-control input ${errors['mobile'] && 'is-invalid'}`}
								value={mobile}
								onChange={changeValue}
								placeholder="..."
								onFocus={focusedFn}
								onBlur={unfocusedFn}
							/>
							<span className="invalid-feedback mt-2 fs14" style={{
								display: errors['mobile'] ? 'block' : 'none',
							}}>{errors['mobile']}</span>
						</div>
						<div className="col-12 col-md-6 d-flex flex-column align-items-start justify-content-center w-100 mt-4">
							<label htmlFor="birthday" className={`transition fs14 mb-0 ${focused === 'birthday' ? 'textMain' : 'textThird'}`}>
								تاریخ تولد<span style={{color: 'red'}}>{`\xa0*`}</span>
							</label>
							<DatePicker
								value={birthday}
								onChange={selectDay}
								shouldHighlightWeekends
								calendarClassName="responsive-calendar"
								locale="fa"
								inputPlaceholder="..."
								maximumDate={maximumDate}
								wrapperClassName="w-100"
								inputClassName={`text-right fs16 form-control input ${errors['birthday'] && 'is-invalid'}`}
							/>
							<span className="invalid-feedback mt-2 fs14" style={{
								display: errors['birthday'] ? 'block' : 'none',
							}}>{errors['birthday']}</span>
						</div>
					</div>
					<div className="col-12 col-md-6 d-flex flex-column align-items-start justify-content-center w-100 mt-4">
						<label htmlFor="password" className={`transition fs14 mb-0 ${focused === 'password' ? 'textMain' : 'textThird'}`}>
							کلمه عبور<span style={{color: 'red'}}>{`\xa0*`}</span>
						</label>
						<input
							id="password"
							name="password"
							type="text"
							autoFocus={false}
							required={true}
							className={`form-control input ${errors['password'] && 'is-invalid'}`}
							value={password}
							onChange={changeValue}
							placeholder="..."
							onFocus={focusedFn}
							onBlur={unfocusedFn}
						/>
						<span className="invalid-feedback mt-2 fs14" style={{
							display: errors['password'] ? 'block' : 'none',
						}}>{errors['password']}</span>
					</div>
					<div className="col-12 d-flex flex-column align-items-start justify-content-center w-100 mt-4">
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
					<div className="w-100 d-flex flex-wrap align-items-center justify-content-between">
						<div className="col-12 col-md-6 d-flex flex-column align-items-start justify-content-center w-100 mt-4">
							<label htmlFor="selfiImage" className="transition fs14 mb-0 textThird">
								عکس سلفی<span style={{color: 'red'}}>{`\xa0*`}</span>
							</label>
							{!selfiImagePreviewUrl && <div id="selfiImage"
																	 className="w-100 d-flex align-items-center justify-content-center rounded p-0 mt-2">
								<button type="button" className="w-100 btn loginUpload outline mt-2"
										  onClick={() => document?.getElementById('getSelfiImage')?.click()}>
									انتخاب
								</button>
								<input type="file" id="getSelfiImage" accept="image/*" className="form-control d-none"
										 onChange={(e) => sendImage(e, 'selfi')}/>
							</div>}
							{!selfiImagePreviewUrl && <span className="textThird fs14 mt-2 mr-2">فقط پرونده ها با فرمت عکس را بارگذاری نمایید.</span>}
							{errors['selfiImage'] && <span className="mt-2 mr-2 text-danger">{errors['selfiImage']}</span>}
							{selfiImagePreviewUrl && <div className="w-100 d-flex flex-row align-items-start justify-content-start position-relative mt-3">
								<img alt="ezsaze" src={selfiImagePreviewUrl} className="loginImage"/>
								<button type="button" className="removeImageBtnUserLogin" onClick={() => removeImage('selfi')}>
									<FontAwesomeIcon icon={faTimes} color="red"/>
								</button>
							</div>}
						</div>
						<div className="col-12 col-md-6 d-flex flex-column align-items-start justify-content-center w-100 mt-4">
							<label htmlFor="image" className="transition fs14 mb-0 textThird">
								تصویر کارت دانشجویی<span style={{color: 'red'}}>{`\xa0*`}</span>
							</label>
							{!imagePreviewUrl && <div id="image"
									className="w-100 d-flex align-items-center justify-content-center rounded p-0 mt-2">
								<button type="button" className="w-100 btn loginUpload outline mt-2"
										  onClick={() => document?.getElementById('getImage')?.click()}>
									انتخاب
								</button>
								<input type="file" id="getImage" accept="image/*" className="form-control d-none"
										 onChange={(e) => sendImage(e, 'image')}/>
							</div>}
							{!imagePreviewUrl &&<span className="textThird fs14 mt-2 mr-2">فقط پرونده ها با فرمت عکس را بارگذاری نمایید.</span>}
							{errors['image'] && <span className="mt-2 mr-2 text-danger">{errors['image']}</span>}
							{imagePreviewUrl &&
							<div className="w-100 d-flex flex-row align-items-start justify-content-start position-relative mt-3">
								<img alt="ezsaze" src={imagePreviewUrl} className="loginImage"/>
								<button type="button" className="removeImageBtnUserLogin" onClick={() => removeImage('image')}>
									<FontAwesomeIcon icon={faTimes} color="red"/>
								</button>
							</div>}
						</div>
					</div>
				</div>
				<div className="modal-footer d-flex align-items-center justify-content-between">
					<button type="button" className="btn bgMain border-0 rounded px-3 py-2 text-white ml-1" onClick={sendVerification}>
						{!loader && <span>ثبت</span>}
						{loader && <Loader type="ThreeDots" color='white' height={8}/>}
					</button>
					<button type="button" className="btn btn-secondary border-0 rounded px-3 py-2 text-white" onClick={() => setOpen(false)}>بستن</button>
				</div>
			</div>
		</Modal>
	);
};

export default AddExpertModal;
