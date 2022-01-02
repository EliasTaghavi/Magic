import React from 'react';
import {Modal} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import '../../../../admin.css';
import imagePreUrl from "../../../../../api/imagePreUrl";

const UserDetailsModal = ({item, setOpen, sendSmsModal}) => {
	const sendVerification = (state) => {
		// setOpen(false);
		if (state) {
			// send verificationData
		} else {
			sendSmsModal(true);
		}
	};

	console.log(item);

	return (
		<Modal
			show={true}
			size="lg"
			onHide={() => setOpen(false)}
		>
			<div className="modal-content">
				<div className="modal-header fs16 font-weight-bold">
					مشخصات کاربر
				</div>
				<div className="modal-body d-flex flex-column align-items-start justify-content-start pt-5">
					<div className="d-flex flex-column align-items-start justify-content-start flex-md-row">
						<div className="mr-3">
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
						</div>
					</div>
					<div className="w-100 d-flex flex-wrap align-items-start justify-content-start">
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
				<div className={`modal-footer d-flex align-items-center ${item?.status ? 'justify-content-end' : 'justify-content-between'}`}>
					{!item?.status && <div className="d-flex flex-wrap align-items-start justify-content-start">
						<button type="button" className="btn btn-success border-0 rounded px-3 py-2 text-white ml-1"
								  onClick={() => sendVerification(true)}>تایید
						</button>
						<button type="button" className="btn btn-danger border-0 rounded px-3 py-2 text-white mr-1"
								  onClick={() => sendVerification(false)}>رد کردن
						</button>
					</div>}
					<button type="button" className="btn btn-secondary border-0 rounded px-3 py-2 text-white" onClick={() => setOpen(false)}>بستن</button>
				</div>
			</div>
		</Modal>
	);
};

export default UserDetailsModal;
