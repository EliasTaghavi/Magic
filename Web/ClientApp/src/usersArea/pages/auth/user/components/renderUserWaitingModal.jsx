import React from 'react';
import {Modal} from "react-bootstrap";
import {faBan, faCheckCircle, faInfo, faInfoCircle, faTimesCircle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {supportDetails} from "../../../../../utils/supportDetails";

const RenderUserWaitingModal = ({waitingModal, resetToHome}) => {
	return (
		<Modal
			size="lg"
			centered={true}
			show={true}
			onHide={() => {}}>
			<div className="modal-body">
				{waitingModal === 1 && (
					<div className="p-3 w-100 h-100 d-flex flex-column align-items-center justify-content-center text-center">
						<FontAwesomeIcon icon={faCheckCircle} style={{fontSize: 80}} className="text-success"/>
						<p className="fs18 mt-5 text-center">اطلاعات شما ثبت شد.</p>
						<p className="fs18 mt-2 text-center">لطفا پس از دریافت پیامک تایید حساب، به پنل خود مراجعه نمایید.</p>
						<button type="button" className="btn btn-outline-success mt-5 py-2 px-5"
								  onClick={resetToHome}>
							تایید
						</button>
					</div>
				)}
				{waitingModal === 2 && (
					<div className="p-3 w-100 h-100 d-flex flex-column align-items-center justify-content-center text-center">
						<FontAwesomeIcon icon={faInfoCircle} style={{fontSize: 80}} className="text-warning"/>
						<p className="fs18 mt-5 text-center">اطلاعات شما در حال بررسی توسط کارشناسان ما می‌باشد.</p>
						<p className="fs18 text-center">لطفا پس از دریافت پیامک تایید، به حساب کاربری خود مراجعه فرمایید.</p>
						<button type="button" className="btn btn-outline-secondary mt-5 py-2 px-5"
								  onClick={resetToHome}>
							تایید
						</button>
					</div>
				)}
				{waitingModal === 3 && (
					<div className="p-3 w-100 h-100 d-flex flex-column align-items-center justify-content-center text-center">
						<FontAwesomeIcon icon={faBan} style={{fontSize: 80}} className="text-secondary"/>
						<p className="fs18 mt-5 text-center">حساب کاربری شما قفل شده است.</p>
						<p className="fs18 mt-3 text-center">لطفا با پشتیبانی تماس حاصل نمایید.</p>
						<p className="fs18 mt-3 text-center">{supportDetails.phoneNumber}</p>
						<button type="button" className="btn btn-outline-secondary mt-5 py-2 px-5"
								  onClick={resetToHome}>
							تایید
						</button>
					</div>
				)}
			</div>
		</Modal>
	);
}

export default RenderUserWaitingModal;
