import React, {useState} from 'react';
import {Modal} from "react-bootstrap";
import {maximumDate} from "../../../../auth/user/loginUser.components";
import DatePicker from "react-modern-calendar-datepicker";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import Loader from "react-loader-spinner";
import RenderSelectMediaModal from "../../../../auth/user/components/renderSelectMediaModal";
import RenderCamera from "../../../../auth/user/components/renderCamera";
import Resizer from "react-image-file-resizer";
import {checkReferralCode, editUserProfile} from "../../../../../api/auth/user";
import * as MainStore from "../../../../../../store/main";
import {toast} from "react-toastify";
import toastOptions from "../../../../../../components/ToastOptions";
import {useDispatch} from "react-redux";
import EditUserValidation from "../../../../../../components/validations/editUser/editUser";
import {useShallowPickerSelector} from "../../../../../../store/selectors";
import RenderProgressBarModal from "../../../../../../components/shared/renderProgressBarModal";
import {dateConvertor} from "../../../../../../components/dateConvertor";
import {imagePreUrl} from "../../../../../api/imagePreUrl";

const EditUserProfileModal = ({onClose, reload}) => {
	const dispatch = useDispatch();
	const userData = useShallowPickerSelector('user', ['userData']);
	const [errors, setErrors] = useState({});
	const [firstName, setFirstName] = useState(userData?.firstName ?? '');
	const [lastName, setLastName] = useState(userData?.lastName ?? '');
	const [birthday, setBirthday] = useState(userData?.birthday ? dateConvertor(userData?.birthday) : '');
	const [address, setAddress] = useState(userData?.address ?? '');
	const [focused, setFocused] = useState('');
	const [selectMediaModal, setSelectMediaModal] = useState('');
	const [image, setImage] = useState('');
	const [selfiImage, setSelfiImage] = useState('');
	const [imagePreviewUrl, setImagePreviewUrl] = useState(imagePreUrl(userData?.identityURL));
	const [selfiImagePreviewUrl, setSelfiImagePreviewUrl] = useState(imagePreUrl(userData?.selfieURL));
	const [referralCode, setReferralCode] = useState('');
	const [referralCodeLoader, setReferralCodeLoader] = useState(false);
	const [resultData, setResultData] = useState('');
	const [camera, setCamera] = useState(false);
	const [btnLoader, setBtnLoader] = useState(false);
	const [progressBarModal, setProgressBarModal] = useState(false);
	const [isStudent, setIsStudent] = useState(userData?.isStudent);

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
							setSelectMediaModal('');
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
							setSelectMediaModal('');
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
							setSelectMediaModal('');
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
							setSelectMediaModal('');
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

	const changeValue = (e) => {
		let target = e.target;
		delete errors[target.name];
		switch (target.name) {
			case 'firstName':
				setFirstName(target.value);
				break;
			case 'lastName':
				setLastName(target.value);
				break;
			case 'address':
				setAddress(target.value);
				break;
			case 'referralCode':
				setResultData('');
				setReferralCode(target.value);
				break;
			default:
				break;
		}
	}

	const checkReferralCodeFn = () => {
		if (referralCode.length > 0) {
			setReferralCodeLoader(true);
			checkReferralCode({code: referralCode})
				.then((response) => {
					let {success, result} = response;
					if (response) {
						if (response === 401) {
							dispatch(MainStore.actions.setLogoutModal({type: 'user', modal: true}));
						} else if (success) {
							setResultData(result);
							setReferralCodeLoader(false);
						} else {
							setResultData('noShop');
							setReferralCodeLoader(false);
						}
					} else {
						toast.error('خطای سرور', toastOptions);
						setReferralCodeLoader(false);
					}
				})
				.catch((e) => {
					toast.error('خطای سرور', toastOptions);
					setReferralCodeLoader(false);
				})
		}
	};

	const validateData = () => {
		let data = {
			firstName,
			lastName,
			birthday,
			image,
			selfiImage,
			address,
			token: userData?.token,
			referralCode,
			TypeId: isStudent,
		}
		EditUserValidation(data)
			.then((response) => {
				if (Object.entries(response).length < 1) {
					sendEditUserData(data);
				} else {
					setErrors(response);
					setBtnLoader(false);
					setProgressBarModal(false);
					toast.error('لطفا اشکالات بالا را رفع نمایید.', toastOptions)
				}
			})
			.catch((e) => {
				setBtnLoader(false);
				setProgressBarModal(false);
				toast.error('خطای سرور', toastOptions)
			})
	}

	const sendEditUserData = (data) => {
		setBtnLoader(true);
		setProgressBarModal(true);
		editUserProfile(data)
			.then((response) => {
				let {success} = response;
				if (response) {
					if (response === 401) {
						dispatch(MainStore.actions.setLogoutModal({type: 'user', modal: true}));
					} else if (success) {
						toast.success('اطلاعات شما با موفقیت ویرایش شد', toastOptions);
						setBtnLoader(false);
						setProgressBarModal(false);
						onClose();
						reload();
						// dispatch(UserStore.actions.updateUserData({firstName, lastName, birthday, address}));
					}
				} else {
					toast.error('خطای سرور', toastOptions);
					setBtnLoader(false);
					setProgressBarModal(false);
				}
			})
			.catch((e) => {
				toast.error('خطای سرور', toastOptions);
				setBtnLoader(false);
				setProgressBarModal(false);
			})
	};

	return (
		<Modal
			size="lg"
			show={true}
			onHide={onClose}>
			<div className="modal-content">
				<div className="modal-header">
					ویرایش حساب کاربری
				</div>
				<div className="modal-body p-4">
					<form autoComplete="off" noValidate={true} className="w-100">
						<div className="w-100">
							<div className="d-flex flex-column align-items-start justify-content-center w-100">
								<label htmlFor="firstName" className={`transition fs14 mb-0 ${focused === 'firstName' ? 'textMain' : 'textThird'}`}>
									نام<span style={{color: 'red'}}>{`\xa0*`}</span>
								</label>
								<input
									id="firstName"
									name="firstName"
									type="text"
									autoFocus={true}
									required={true}
									className={`form-control input ${errors['firstName'] && 'is-invalid'}`}
									value={firstName}
									onChange={changeValue}
									placeholder="..."
									onFocus={focusedFn}
									onBlur={unfocusedFn}
								/>
								<span className="invalid-feedback mt-2 fs14" style={{
									display: errors['firstName'] ? 'block' : 'none',
								}}>{errors['firstName']}</span>
							</div>
							<div className="d-flex flex-column align-items-start justify-content-center w-100 mt-4">
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
							<div className="d-flex flex-column align-items-start justify-content-center w-100 mt-4">
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
							<label htmlFor="address" className={`transition fs14 mt-4 ${focused === 'address' ? 'textMain' : 'textThird'}`}>
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
							<div className="d-flex flex-column align-items-start justify-content-center w-100 mt-4">
								<label htmlFor="selfiImage" className="transition fs14 mb-0 textThird">
									عکس سلفی<span style={{color: 'red'}}>{`\xa0*`}</span>
								</label>
								<div id="selfiImage" className="w-100 d-flex align-items-center justify-content-center rounded p-0 mt-2">
									<button type="button" className="w-100 btn loginUpload outline mt-2" onClick={() => setSelectMediaModal('selfi')}>
										انتخاب
									</button>
									<input type="file" id="getSelfiImage" accept="image/*" className="form-control d-none" onChange={(e) => sendImage(e, 'selfi')}/>
								</div>
								<span className="textThird fs14 mt-2 mr-2">فقط پرونده ها با فرمت عکس را بارگذاری نمایید.</span>
								{errors['selfiImage'] && <span className="mt-2 mr-2 text-danger">{errors['selfiImage']}</span>}
								{selfiImagePreviewUrl && <div className="w-100 d-flex flex-row align-items-start justify-content-start position-relative mt-3">
									<img alt="ezsaze" src={selfiImagePreviewUrl} className="loginImage"/>
									<button type="button" className="removeImageBtnUserLogin" onClick={() => removeImage('selfi')}>
										<FontAwesomeIcon icon={faTimes} color="red"/>
									</button>
								</div>}
							</div>
							<div className="mt-5 cursor d-flex align-items-center mb-4">
								<input id="isStudent" type="checkbox" className="cursor customCheckBox" checked={isStudent} value={isStudent} onChange={(e) => {
									setIsStudent(!isStudent);
								}} />
								<label htmlFor="isStudent" className="pr-2 mb-0 cursor fs14 textThird">
									دانشجو هستم
								</label>
							</div>
							<div className={`d-flex flex-column align-items-start justify-content-start w-100 overflow-hidden transition mt-3`}>
								<label htmlFor="image" className="transition fs14 mb-0 textThird">
									تصویر کارت دانشجویی<span style={{color: 'red'}}>{`\xa0*`}</span>
								</label>
								<div id="image" className="w-100 d-flex align-items-center justify-content-center rounded p-0 mt-2">
									<button type="button" className="w-100 btn loginUpload outline mt-2"
											  onClick={() => setSelectMediaModal('image')}>
										انتخاب
									</button>
									<input type="file" id="getImage" accept="image/*" className="form-control d-none"
											 onChange={(e) => sendImage(e, 'image')}/>
								</div>
								<span className="textThird fs14 mt-2 mr-2">فقط پرونده ها با فرمت عکس را بارگذاری نمایید.</span>
								{errors['image'] && <span className="mt-2 mr-2 text-danger">{errors['image']}</span>}
								{imagePreviewUrl &&
								<div className="w-100 d-flex flex-row align-items-start justify-content-start position-relative mt-3">
									<img alt="ezsaze" src={imagePreviewUrl} className="loginImage"/>
									<button type="button" className="removeImageBtnUserLogin" onClick={() => removeImage('image')}>
										<FontAwesomeIcon icon={faTimes} color="red"/>
									</button>
								</div>}
							</div>
							<div className="w-100 mt-5" style={{height: 1, backgroundColor: '#ff521d55'}} />
							<div className="flex-column align-items-start justify-content-end w-100 my-5">
								<label htmlFor="referralCode" className={`transition fs16 noWrapText mb-0 ${focused === 'referralCode' ? 'textMain' : 'textThird'}`}>
									کد معرف
								</label>
								<div className="w-100 d-flex centered">
									<input
										id="referralCode"
										name="referralCode"
										type="text"
										autoFocus={false}
										required={true}
										className={`form-control input ${resultData && resultData !== 'noShop' ? 'is-valid border-success' : resultData === 'noShop' ? 'is-invalid' : ''}`}
										value={referralCode}
										onChange={changeValue}
										placeholder="..."
										onFocus={focusedFn}
										onBlur={unfocusedFn}
									/>
									<button type="button" className="btn bgMain border-0 text-white fs12 mr-3" onClick={() => checkReferralCodeFn()}>
										{!referralCodeLoader && <span>بررسی</span>}
										{referralCodeLoader && <Loader type="ThreeDots" color='rgba(255, 255, 255, 1)' height={5} width={70} className="loader"/>}
									</button>
								</div>
								{resultData && resultData !== 'noShop' && <p className="fs12 text-success mt-1">{`فروشگاه\xa0${resultData}`}</p>}
								{resultData === 'noShop' && <p className="fs12 text-danger mt-1">کد نامعتبر است</p>}
							</div>
						</div>
					</form>
				</div>
				<div className="modal-footer d-flex align-items-center justify-content-between">
					<button type="submit" className="btn bgMain text-white" onClick={validateData}>
						{!btnLoader && <span>ثبت</span>}
						{btnLoader && <Loader type="ThreeDots" color='rgba(255, 255, 255, 1)' height={8} width={70} className="loader"/>}
					</button>
					<button type="button" className="btn btn-secondary">
						بستن
					</button>
				</div>
			</div>
			{selectMediaModal !== '' && <RenderSelectMediaModal onGallery={() => {
				if (selectMediaModal === 'selfi') {
					return document?.getElementById('getSelfiImage')?.click();
				} else {
					return document?.getElementById('getImage')?.click()
				}
			}} onCamera={() => setCamera(true)} onClose={() => setSelectMediaModal('')} />}
			{camera && <RenderCamera onClose={() => {
				setSelectMediaModal('');
				setCamera(false);
			}}
			 setScreenShot={async (data) => {
				 const blob = await fetch(data).then((res) => res.blob());
				 if (selectMediaModal === 'selfi') {
					 await sendImage({target: {files: [blob]}}, 'selfi')
				 } else {
					 await sendImage({target: {files: [blob]}}, 'image')
				 }
				 setSelectMediaModal('');
				 setCamera(false);
			 }}/>}
			{progressBarModal && <RenderProgressBarModal />}
		</Modal>
	);
}

export default EditUserProfileModal;
