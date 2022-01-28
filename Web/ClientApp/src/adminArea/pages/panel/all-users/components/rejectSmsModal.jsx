import React from 'react';
import {Modal} from "react-bootstrap";
import '../../../../admin.css';
import toastOptions from "../../../../../components/ToastOptions";
import {toast} from "react-toastify";
import AdminSendSMSValidation from "../../components/validatons/SendSMSValidation";
import {rejectUser} from "../../../../api/users";
import Loader from "react-loader-spinner";

const RejectSmsModal = ({item, setOpen, refreshTable, setAllModalClose}) => {
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
					setAllModalClose();
					toast.success(`پیامک با موفقیت ارسال شد`, toastOptions);
					refreshTable();
					setLoader(false);
				} else {
					toast.error(`${response.value}`, toastOptions);
					setLoader(false);
				}
			})
			.catch((error) => {
				toast.error(`عدم ارتباط با سرور`, toastOptions);
				setLoader(false);
			})
	};

	return (
		<Modal
			show={true}
			size="lg"
			centered={true}
			onHide={() => setOpen(false)}>
			<div className="modal-content">
				<div className="modal-header fs16 font-weight-bold">
					ارسال پیامک عدم تایید اطلاعات کاربری
				</div>
				<form noValidate={true} autoComplete="off" onSubmit={(e) => validation(e)}>
					<div className="w-100 modal-body d-flex flex-column align-items-start justify-content-start mt-3">
						<div className="col-12">
							<div className="d-flex align-items-center justify-content-between mb-1">
								<label className="p-0 m-0">
									دلیل رد شدن<span style={{color: 'red'}}>{`\xa0*`}</span>
								</label>
							</div>
							<input
								disabled={loader}
								id="description"
								name="description"
								type="text"
								autoFocus={false}
								required={true}
								className="form-control input w-100 text-right"
								value={description}
								onChange={(e) => {
									let newError = errors;
									delete newError['description'];
									setErrors(newError);
									setDescription(e.target.value);
								}}
								placeholder="..."
							/>
							<span className="invalid-feedback" style={{
								display: errors['description'] ? 'block' : 'none',
								fontSize: 14
							}}>{errors['description']}</span>
						</div>
						<div className="col-12 mt-4">
							<p className="fs16 font-weight-bold">متن ارسالی به کاربر:</p>
							<div className="bgSilverLight rounded p-3">
								<p className="fs16 mb-0">کاربر گرامی</p>
								<p className="fs16 mb-0">حساب شما به دلیل زیر تایید نشد:</p>
								<p className="fs16 mb-0 textMain">{description.length > 0 ? `"${description}"` : '"دلیل رد شدن"'}</p>
								<p className="fs16 mb-0">خطا-"کد خطا"</p>
								<p className="fs16 mb-0">سامانه Magic Off</p>
							</div>
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
