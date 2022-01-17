import React from 'react';
import {Modal} from "react-bootstrap";
import Loader from "react-loader-spinner";

const ScannedUserDetailsModal = ({data, onClose}) => {
	let tt = '1400/01/01';
	return (
		<Modal
			size="md"
			centered={true}
			show={true}
			onHide={onClose}>
			<div className="modal-header w-100 d-flex align-items-center justify-content-start fs22 text-dark">
				وضعیت حساب مشتری
			</div>
			<div className="modal-body py-5">
				{data && <div className="d-flex centered">
					<div className="packageContainerNoHover shadow w-100 pckBorder">
						<p className="fs34 textSecondary1 m-0">شهاب طالبی</p>
						<p className="fs26 textThird m-0 mt-3">دانشجو</p>
						<hr className="w-100 cDivider"/>
						<p className="fs60 m-0 text-success text-center cNumber mt-1">معتبر</p>
						<hr className="w-100 cDivider"/>
						<p className="fs14 textThird m-0 mt-1">مدت اعتبار باقی مانده: <span
							className="textMain fs20 font-weight-bold">2</span> روز</p>
						<p className="fs14 textThird m-0 mt-1">{`تاریخ انقضا:\xa0${tt}`}</p>
					</div>
				</div>}
				{data && <div className="d-flex centered mt-3">
					<button type="button" className="btn border-0 submitBtn" style={{maxWidth: 300}}>
						ثبت خرید
					</button>
				</div>}
				{!data && (
					<div className="w-100 d-flex centered">
						<Loader type="ThreeDots" color='#ff521d' height={10} width={70} className="loader"/>
					</div>
				)}
			</div>
		</Modal>
	);
}

export default ScannedUserDetailsModal;
