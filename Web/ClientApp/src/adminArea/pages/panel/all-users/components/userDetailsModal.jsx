import React, {useState, useEffect} from 'react';
import {Modal} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import '../../../../admin.css';
import {imagePreUrl} from "../../../../../usersArea/api/imagePreUrl";
import Switch from 'react-switch';
import {sendLockUserData} from "../../../../api/users";
import Loader from "react-loader-spinner";
import {toast} from "react-toastify";
import toastOptions from "../../../../../components/ToastOptions";
import {confirmUser, getUserJobType} from "../../../../api/users";
import Select from "react-select";
import {theme} from "../../../../../components/shared/theme";
import makeAnimated from "react-select/animated/dist/react-select.esm";

const animatedComponents = makeAnimated();

const UserDetailsModal = ({item, setOpen, sendSmsModal, refreshTable}) => {
	console.log(item);
	const prevItem = item;
	const [loader, setLoader] = useState(false);
	const [locked, setLocked] = useState(item?.status === 2);
	const [lockLoader, setLockLoader] = useState(false);
	const [statusType, setStatusType] = useState({label: 'انتخاب کنید...', value: null});
	const [statusError, setStatusError] = useState(false);
	const [statusTypes, setStatusTypes] = useState([]);
	const [statusTypesLoader, setStatusTypesLoader] = useState(false);

	useEffect(() => {
		getUserJobTypeFn();
	}, []);

	const getUserJobTypeFn = () => {
		setStatusTypesLoader(true);
		getUserJobType()
			.then((response) => {
				console.log(response);
				const {result, success} = response;
				if (response) {
					if (response === 401) {
						// do nothing
					} else if (success) {
						let newResult = result.map((item) => {
							return {
								label: item.value,
								value: item.key,
							}
						});
						newResult = [{label: 'انتخاب کنید...', value: null}, ...newResult];
						let val = (item?.typeId && newResult?.length > 0) ? newResult?.filter((i) => i.value === item?.typeId)[0] : {label: 'انتخاب کنید...', value: null};
						setStatusType(val);
						setStatusTypes(newResult);
						setStatusTypesLoader(false);
					}
				} else {
					toast.error('خطای سرور', toastOptions);
					setStatusTypesLoader(false);
				}
			})
			.catch(() => {
				toast.error('خطای سرور', toastOptions);
				setStatusTypesLoader(false);
			})
	};

	const sendVerification = (state) => {
		if (state) {
			if (statusType?.value === null) {
				setStatusError(true);
			} else {
				setLoader(true);
				confirmUser(item?.id, statusType)
					.then((response) => {
						let {success} = response;
						if (response) {
							if (response === 401) {
								// do nothing
							} else if (success) {
								setOpen(false);
								setLoader(false);
								refreshTable();
								toast.success('وضعیت کاربر با موفقیت تغییر یافت', toastOptions);
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
			}
		} else {
			sendSmsModal(true);
		}
	};

	const sendLockFn = () => {
		setLockLoader(true);
		sendLockUserData(item?.id)
			.then((response) => {
				let {success} = response;
				if (response) {
					if (response === 401) {
						// do nothing
					} else if (success) {
						if (prevItem?.status === 2) {
							item.status = 3;
						} else {
							item.status = 2;
						}
						refreshTable();
						setLocked(!locked);
						setLockLoader(false);
						toast.success('وضعیت کاربر با موفقیت تغییر یافت', toastOptions);
					}
				} else {
					toast.error('خطای سرور', toastOptions);
					setLockLoader(false);
				}
			})
			.catch(() => {
				toast.error('خطای سرور', toastOptions);
				setLockLoader(false);
			})
	}

	const changeStatus = (val) => {
		setStatusError(false);
		setStatusType(val);
	}

	return (
		<Modal
			show={true}
			size="lg"
			onHide={() => setOpen(false)}
		>
			<div className="modal-content">
				<div className="modal-header fs16 font-weight-bold d-flex align-items-center justify-content-between">
					<p className="p-0 m-0">مشخصات کاربر</p>
					<div className="d-flex centered">
						{(item?.status === 2 || item?.status === 3) && <div className="position-relative d-flex centered p-1">
							<Switch
								className="ml-3"
								handleDiameter={22}
								boxShadow="0px 1px 5px rgba(0, 0, 0, 0.9)"
								activeBoxShadow="0px 0px 1px 10px rgba(255, 255, 255, 0.2)"
								width={45}
								height={24}
								onColor="#28a745"
								onHandleColor='#ffffff'
								onChange={() => sendLockFn()}
								checked={!locked}
							/>
							{lockLoader && <div className="position-absolute d-flex centered"
													  style={{
														  zIndex: 2,
														  top: 0,
														  right: 0,
														  left: 0,
														  backgroundColor: '#ffffffdd',
														  height: '100%'
													  }}>
								<Loader type="ThreeDots" color='#ff521d' height={8}/>
							</div>}
						</div>}
						{item?.status === 3 ? (
							<p className="text-success font-weight-bold fs16 p-0 m-0">تایید شده</p>
						) : item?.status === 5 ? (
							<p className="text-danger font-weight-bold fs16 p-0 m-0">تایید نشده</p>
						) : item?.status === 6 ? (
							<p className="text-warning font-weight-bold fs16 p-0 m-0">در انتظار بررسی</p>
						) : item?.status === 2 ? (
							<p className="text-secondary font-weight-bold fs16 p-0 m-0">قفل شده</p>
						) : (
							<p className="text-info font-weight-bold fs16 p-0 m-0">عدم تکمیل اطلاعات</p>
						)}
					</div>
				</div>
				<div className="modal-body d-flex flex-column align-items-start justify-content-start pt-5 w-100">
					<div className="d-flex flex-column align-items-start justify-content-start flex-md-row w-100">
						<div className="mr-3 w-100">
							<div className="d-flex flex-column flex-md-row align-items-start justify-content-start">
								<p className="fs16 textThird">نام: </p>
								<p className="fs18 mr-md-3">{item?.firstName ?? '-----'}</p>
							</div>
							<div className="d-flex flex-column flex-md-row align-items-start justify-content-start">
								<p className="fs16 textThird">نام خانوادگی: </p>
								<p className="fs18 mr-md-3">{item?.lastName ?? '-----'}</p>
							</div>
							<div className="d-flex flex-column flex-md-row align-items-start justify-content-start">
								<p className="fs16 textThird">موبایل: </p>
								<p className="fs18 mr-md-3">{item?.mobile ?? '-----'}</p>
							</div>
							<div className="d-flex flex-column flex-md-row align-items-start justify-content-start">
								<p className="fs16 textThird">تاریخ تولد: </p>
								<p className="fs18 mr-md-3">{item?.birthday ?? '-----'}</p>
							</div>
							<div className="d-flex flex-column flex-md-row align-items-start justify-content-start">
								<p className="fs16 textThird">آدرس: </p>
								<p className="fs18 mr-md-3">{item?.address ?? '-----'}</p>
							</div>
							<div className="w-100 d-flex flex-column align-items-start justify-content-start">
								<div className="w-100 d-flex flex-column flex-md-row align-items-start justify-content-start align-items-md-center">
									<p className="m-0 fs16 textThird">نوع شغل: </p>
									<div className="col-12 col-md-6 position-relative">
										<Select
											value={statusType}
											options={statusTypes}
											isClearable={false}
											components={animatedComponents}
											isRtl={true}
											isMulti={false}
											isSearchable={false}
											maxMenuHeight={200}
											placeholder=""
											onChange={(value) => changeStatus(value)}
											styles={theme.customStyles}/>
										{statusTypesLoader && <div className="position-absolute h-100 d-flex centered" style={{zIndex: 10, top: 0, left: 0, right: 0, backgroundColor: '#ffffffcc'}}>
											<Loader type="ThreeDots" color='#ff521d' height={8}/>
										</div>}
									</div>
								</div>
								{statusError && <p className="text-danger">لطفا نوع شغل را مشخص کنید</p>}
							</div>
						</div>
					</div>
					<div className="w-100 d-flex flex-wrap align-items-start justify-content-start mt-5">
						<div style={{flex: 1}} className="d-flex flex-column align-items-start justify-content-start">
							<p className="mt-3">عکس سلفی:</p>
							<div className="adminUserImages">
								{item?.selfieURL && <img alt="magicoff.ir" src={imagePreUrl(item?.selfieURL)} className="adminUserImages"/>}
								{!item?.selfieURL && <FontAwesomeIcon icon={faUser} className="fs30 textGray"/>}
							</div>
						</div>
						<div style={{flex: 1}} className="d-flex flex-column align-items-start justify-content-start">
							<p className="mt-3">عکس تاییدیه شغلی:</p>
							<div className="adminUserImages">
								{item?.identityURL && <img alt="magicoff.ir" src={imagePreUrl(item?.identityURL)} className="adminUserImages"/>}
								{!item?.identityURL && <FontAwesomeIcon icon={faUser} className="fs30 textGray"/>}
							</div>
						</div>
					</div>
				</div>
				<div className={`modal-footer d-flex align-items-center ${(item?.status === 5 || item?.status === 6) ? 'justify-content-between' : 'justify-content-end'}`}>
					<div className="d-flex flex-wrap align-items-start justify-content-start">
						{(item?.status === 5 || item?.status === 6) && <button type="button" className="btn btn-success border-0 rounded px-3 py-2 text-white ml-1"
									onClick={() => sendVerification(true)}>
							{!loader && <span>تایید</span>}
							{loader && <Loader type="ThreeDots" color='white' height={8}/>}
						</button>}
						{item?.status === 6 && <button type="button" className="btn btn-danger border-0 rounded px-3 py-2 text-white mr-1"
									onClick={() => sendVerification(false)}>
							<span>رد کردن</span>
						</button>}
					</div>
					<button type="button" className="btn btn-secondary border-0 rounded px-3 py-2 text-white" onClick={() => setOpen(false)}>بستن</button>
				</div>
			</div>
		</Modal>
	);
};

export default UserDetailsModal;
