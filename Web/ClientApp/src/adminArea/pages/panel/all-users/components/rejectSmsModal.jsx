import React from 'react';
import {Modal} from "react-bootstrap";
import '../../../../admin.css';
import toastOptions from "../../../../../components/ToastOptions";
import {toast} from "react-toastify";
import AdminSendSMSValidation from "../../components/validatons/SendSMSValidation";
import SMSMaxChar from "../../components/SMSMaxChar";
import smsCounter from "../../components/smsCounter";
import {rejectUser} from "../../../../api/users";
import Loader from "react-loader-spinner";

const RejectSmsModal = ({item, setOpen}) => {
	const [loader, setLoader] = React.useState(false);
	const [errors, setErrors] = React.useState({});
	const [description, setDescription] = React.useState('');

	const validation = (e) => {
		e.preventDefault();
		let data = {
			description,
		};
		AdminSendSMSValidation(data)
			.then((response) => {
				if (Object.entries(response).length < 1) {
					setLoader(true);
					sendData();
				} else {
					setErrors(response);
				}
			})
			.catch((error) => {
				toast.error(`عدم ارتباط با سرور`, toastOptions);
			});
	};

	const sendData = () => {
		rejectUser(item?.id, description)
			.then((response) => {
				if (!response?.type) {
					setOpen(false);
					toast.success(`پیامک با موفقیت ارسال شد.`, toastOptions);
				} else {
					toast.error(`${response.value}`, toastOptions);
				}
			})
			.catch((error) => {
				toast.error(`عدم ارتباط با سرور`, toastOptions);
			})
	};

	return (
		<Modal
			show={true}
			size="lg"
			onHide={() => setOpen(false)}>
			<div className="modal-content">
				<div className="modal-header fs16 font-weight-bold">
					ارسال پیامک عدم تایید اطلاعات کاربری
				</div>
				<form noValidate={true} autoComplete="off" onSubmit={(e) => validation(e)}>
					<div className="w-100 modal-body d-flex flex-column align-items-start justify-content-start pt-5">
						<div className="col-12 mt-5">
							<div className="d-flex align-items-center justify-content-between mb-1">
								<label className="p-0 m-0">
									متن پیام
									{`\xa0${description.length}/${SMSMaxChar(description)}\xa0`}
									{`(تعداد پیامک: ${smsCounter(description)})`}
								</label>
							</div>
							<textarea
								disabled={loader}
								name="description"
								autoFocus={false}
								required={false}
								style={{height: 100, minHeight: 100, maxHeight: 100}}
								value={description}
								className='form-control w-100 text-right'
								onChange={(e) => {
									let newError = errors;
									delete newError['description'];
									setErrors(newError);
									setDescription(e.target.value);
								}}/>
							<span className="invalid-feedback" style={{
								display: errors['description'] ? 'block' : 'none',
								fontSize: 14
							}}>{errors['description']}</span>
						</div>
					</div>
					<div className="modal-footer d-flex justify-content-between align-items-center">
						<button type="submit" className="btn btn-danger border-0 rounded px-3 py-2 text-white ml-1">
							{!loader && <span>ارسال</span>}
							{loader && <Loader type="ThreeDots" color='white' height={8}/>}
						</button>
						<button type="button" className="btn btn-secondary border-0 rounded px-3 py-2 text-white" onClick={() => setOpen(false)}>بستن</button>
					</div>
				</form>
			</div>
		</Modal>
	);
};

export default RejectSmsModal;
