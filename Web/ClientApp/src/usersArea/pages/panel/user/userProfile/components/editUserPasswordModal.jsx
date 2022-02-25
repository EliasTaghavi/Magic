import {Modal} from "react-bootstrap";
import React, {useState} from 'react';
import {toast} from "react-toastify";
import toastOptions from "../../../../../../components/ToastOptions";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEyeSlash, faEye} from "@fortawesome/free-solid-svg-icons";
import Loader from "react-loader-spinner";
import ChangeUserPasswordValidation from "../../../../../../components/validations/userPassword/changeUserPassword";
import * as MainStore from '../../../../../../store/main';
import {useDispatch} from "react-redux";
import {SendChangeUserPasswordData} from "../../../../../api/user/main";

const EditUserPasswordModal = ({onClose}) => {
	const dispatch = useDispatch();
	const [loader, setLoader] = useState(false);
	const [focused, setFocused] = useState('');
	const [errors, setErrors] = useState({});
	const [prevPassword, setPrevPassword] = useState('');
	const [prevPasswordVisible, setPrevPasswordVisible] = useState(false);
	const [newPassword, setNewPassword] = useState('');
	const [newPasswordVisible, setNewPasswordVisible] = useState(false);
	const [repeatNewPassword, setRepeatNewPassword] = useState('');
	const [repeatNewPasswordVisible, setRepeatNewPasswordVisible] = useState(false);

	const changeValue = (e) => {
		let target = e.target;
		delete errors[target.name];
		switch (target.name) {
			case 'prevPassword':
				setPrevPassword(target.value);
				break;
			case 'newPassword':
				setNewPassword(target.value);
				break;
			case 'repeatNewPassword':
				setRepeatNewPassword(target.value);
				break;
			default:
				break;
		}
	}

	const handleValidate = (e) => {
		e.preventDefault();
		let data = {
			prevPassword,
			newPassword,
			repeatNewPassword,
		}
		ChangeUserPasswordValidation(data)
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
			prevPassword,
			newPassword,
		};
		SendChangeUserPasswordData(data)
			.then((response) => {
				let {success, result} = response;
				console.log(response);
				if (response) {
					if (response === 401) {
						dispatch(MainStore.actions.setLogoutModal({type: 'user', modal: true}));
					} else if (!result) {
						toast.error('کلمه عبور قبلی اشتباه است', toastOptions)
					} else {
						toast.success('کلمه عبور با موفقیت ویرایش شد', toastOptions)
						onClose();
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
			size="md"
			show={true}
			onHide={onClose}>
			<div className="modal-content">
				<div className="modal-header fs16 font-weight-bold d-flex align-items-center justify-content-between">
					<p className="p-0 m-0">ویرایش کلمه عبور</p>
				</div>
				<form noValidate={true} autoComplete="off" onSubmit={(e) => handleValidate(e)}>
					<div className="modal-body p-4">
						<div className="w-100 d-flex flex-column px-3">
							<div className="w-100 form-group mt-3">
								<label htmlFor="prevPassword" className={`transition fs14 mb-0 ${focused === 'prevPassword' ? 'textMain' : 'textThird'}`}>
									کلمه عبور قبلی<span style={{color: 'red'}}>{`\xa0*`}</span>
								</label>
								<div className="position-relative">
									<input
										disabled={loader}
										name="prevPassword"
										autoFocus={false}
										required={true}
										type={prevPasswordVisible ? 'text' : 'password'}
										value={prevPassword}
										placeholder="..."
										maxLength={5}
										onFocus={() => setFocused('prevPassword')}
										onBlur={() => setFocused('')}
										className={`form-control w-100 text-right ${errors['prevPassword'] ? 'is-invalid' : null}`}
										onChange={(e) => changeValue(e)}/>
									<button type="button" className="btn bg-transparent position-absolute outline" style={{top: 5, left: 0}} onClick={() => setPrevPasswordVisible(!prevPasswordVisible)}>
										{!prevPasswordVisible && <FontAwesomeIcon icon={faEyeSlash} className="textThird" />}
										{prevPasswordVisible && <FontAwesomeIcon icon={faEye} className="textThird" />}
									</button>
								</div>
								<span className="invalid-feedback" style={{
									display: errors['prevPassword'] ? 'block' : 'none',
									fontSize: 14
								}}>{errors['prevPassword']}</span>
							</div>
							<div className="w-100 form-group mt-3">
								<label htmlFor="newPassword" className={`transition fs14 mb-0 ${focused === 'newPassword' ? 'textMain' : 'textThird'}`}>
									کلمه عبور جدید<span style={{color: 'red'}}>{`\xa0*`}</span>
								</label>
								<div className="position-relative">
									<input
										disabled={loader}
										name="newPassword"
										autoFocus={false}
										required={true}
										type={newPasswordVisible ? 'text' : 'password'}
										value={newPassword}
										placeholder="..."
										maxLength={5}
										onFocus={() => setFocused('newPassword')}
										onBlur={() => setFocused('')}
										className={`form-control w-100 text-right ${errors['newPassword'] ? 'is-invalid' : null}`}
										onChange={(e) => changeValue(e)}/>
									<button type="button" className="btn bg-transparent position-absolute outline" style={{top: 5, left: 0}} onClick={() => setNewPasswordVisible(!newPasswordVisible)}>
										{!newPasswordVisible && <FontAwesomeIcon icon={faEyeSlash} className="textThird" />}
										{newPasswordVisible && <FontAwesomeIcon icon={faEye} className="textThird" />}
									</button>
								</div>
								<span className="invalid-feedback" style={{
									display: errors['newPassword'] ? 'block' : 'none',
									fontSize: 14
								}}>{errors['newPassword']}</span>
							</div>
							<div className="w-100 form-group mt-3">
								<label htmlFor="repeatNewPassword" className={`transition fs14 mb-0 ${focused === 'repeatNewPassword' ? 'textMain' : 'textThird'}`}>
									کلمه عبور قبلی<span style={{color: 'red'}}>{`\xa0*`}</span>
								</label>
								<div className="position-relative">
									<input
										disabled={loader}
										name="repeatNewPassword"
										autoFocus={false}
										required={true}
										type={repeatNewPasswordVisible ? 'text' : 'password'}
										value={repeatNewPassword}
										placeholder="..."
										maxLength={5}
										onFocus={() => setFocused('repeatNewPassword')}
										onBlur={() => setFocused('')}
										className={`form-control w-100 text-right ${errors['repeatNewPassword'] ? 'is-invalid' : null}`}
										onChange={(e) => changeValue(e)}/>
									<button type="button" className="btn bg-transparent position-absolute outline" style={{top: 5, left: 0}} onClick={() => setRepeatNewPasswordVisible(!repeatNewPasswordVisible)}>
										{!repeatNewPasswordVisible && <FontAwesomeIcon icon={faEyeSlash} className="textThird" />}
										{repeatNewPasswordVisible && <FontAwesomeIcon icon={faEye} className="textThird" />}
									</button>
								</div>
								<span className="invalid-feedback" style={{
									display: errors['repeatNewPassword'] ? 'block' : 'none',
									fontSize: 14
								}}>{errors['repeatNewPassword']}</span>
							</div>
						</div>
					</div>
					<div className="modal-footer d-flex align-items-center justify-content-between">
						<div className="d-flex flex-wrap align-items-start justify-content-start">
							<button type="submit" className="btn bgMain border-0 rounded px-3 py-2 text-white ml-1">
								{!loader && <span>تایید</span>}
								{loader && <Loader type="ThreeDots" color='white' height={8}/>}
							</button>
						</div>
						<button type="button" className="btn btn-secondary border-0 rounded px-3 py-2 text-white" onClick={onClose}>بستن</button>
					</div>
				</form>
			</div>
		</Modal>
	);
}

export default EditUserPasswordModal;
