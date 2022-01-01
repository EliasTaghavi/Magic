import React, {useState} from 'react';
import Loader from 'react-loader-spinner';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";
import './adminLogin.css';
import loginAdminValidation from '../../validations/loginAdminValidation';
import {toast} from "react-toastify";
import toastOptions from "../../../components/ToastOptions";
import {sendAdminLogin} from '../../api/auth/auth';
import TokenStore from "../../../utils/tokenStore";
import {useHistory} from "react-router-dom";

const AdminLogin  = () => {
	const history = useHistory();
	const [bigLoader, setBigLoader] = useState(false);
	const [loader, setLoader] = useState(false);
	const [errors, setErrors] = useState({});
	const [userName, setUserName] = useState('admin');
	const [password, setPassword] = useState('3040184571');
	const [passwordVisible, setPasswordVisible] = useState(false);
	const [focused, setFocused] = useState('');

	const changeValue = (e) => {
		let target = e.target;
		switch (target.name) {
			case 'userName':
				setUserName(target.value);
				break;
			case 'password':
				setPassword(target.value);
				break;
			default:
				break;
		}
	};

	const validation = (e) => {
		e.preventDefault();
		let data = {userName, password};
		loginAdminValidation(data)
			.then((response) => {
				if (Object.entries(response).length < 1) {
					sendSignupUserData();
				} else {
					setErrors(response);
					toast.error('لطفا اشکالات بالا را رفع نمایید.', toastOptions)
				}
			})
			.catch(() => {
				toast.error('خطای سرور', toastOptions)
			});
	};

	const sendSignupUserData = () => {
		setLoader(true);
		sendAdminLogin({userName, password})
			.then((response) => {
				console.log(response);
				let {success, token} = response;
				if (response) {
					if (response === 401) {
						// do nothing but in another api's should logout from system
					} else if (success) {
						setLoader(false);
						TokenStore.setAdminToken(token);
						history.replace('/admin/panel');
					}
				} else {
					setLoader(false);
					toast.error('خطای سرور', toastOptions);
				}
			})
			.catch(() => {
				setLoader(false);
				toast.error('خطای سرور', toastOptions);
			})
	};

	return (
		<div className="bg-light d-flex flex-column align-items-center justify-content-center">
			{bigLoader &&
			<div className="d-flex align-items-center justify-content-center w-100 position-fixed bg-white loader">
				<Loader type="Bars" color="#f5893699" height={80} width={80}/>
			</div>}
			{!bigLoader && <div className="w-100 adminLogin position-fixed" style={{top: 0}}/>}
			{!bigLoader && <div className="w-100 d-flex flex-column align-items-center justify-content-center p-3" style={{minHeight: '100vh'}}>
					<span className="d-flex textMain adminLoginMainText mb-5" style={{zIndex: 1}}>
						ورود مدیریت
					</span>
				<form noValidate={true} autoComplete="off" className="bg-white col-10 col-md-6 d-flex flex-column align-items-center justify-content-center px-5 py-5 adminLoginBox" onSubmit={(e) => validation(e)}>
					<div className="w-100 form-group mt-3">
						<label htmlFor="userName" className={`transition fs14 mb-0 ${focused === 'userName' ? 'textMain' : 'textThird'}`}>
							نام کاربری
						</label>
						<input
							disabled={loader}
							name="userName"
							autoFocus={false}
							required={true}
							type="text"
							value={userName}
							onFocus={() => setFocused('userName')}
							onBlur={() => setFocused('')}
							className={`form-control w-100 text-right ${errors['userName'] ? 'is-invalid' : null}`}
							onChange={(e) => changeValue(e)}/>
						<span className="invalid-feedback" style={{
							display: errors['userName'] ? 'block' : 'none',
							fontSize: 14
						}}>{errors['userName']}</span>
					</div>
					<div className="w-100 form-group mt-3">
						<label htmlFor="password" className={`transition fs14 mb-0 ${focused === 'password' ? 'textMain' : 'textThird'}`}>
							کلمه عبور
						</label>
						<div className="position-relative">
							<input
								disabled={loader}
								name="password"
								autoFocus={false}
								required={true}
								type={passwordVisible ? 'text' : 'password'}
								value={password}
								onFocus={() => setFocused('password')}
								onBlur={() => setFocused('')}
								className={`form-control w-100 text-right ${errors['password'] ? 'is-invalid' : null}`}
								onChange={(e) => changeValue(e)}/>
							<button type="button" className="btn bg-transparent position-absolute outline" style={{top: 5, left: 0}} onClick={() => setPasswordVisible(!passwordVisible)}>
								{!passwordVisible && <FontAwesomeIcon icon={faEyeSlash} className="textThird" />}
								{passwordVisible && <FontAwesomeIcon icon={faEye} className="textThird" />}
							</button>
						</div>
						<span className="invalid-feedback" style={{
							display: errors['password'] ? 'block' : 'none',
							fontSize: 14
						}}>{errors['password']}</span>
					</div>
					<button type="submit" className="submitBtn border-0">
						{!loader && <span>ورود</span>}
						{loader && <Loader type="ThreeDots" color='white' height={8}/>}
					</button>
					<div className="w-100">
						<button type="button" disabled={loader} className="btn outline mr-1 mt-4 fs14 text-secondary">فراموشی رمز عبور</button>
					</div>
				</form>
			</div>}
		</div>
	);
};

export default AdminLogin;
