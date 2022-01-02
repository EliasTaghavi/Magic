import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import {Modal} from "react-bootstrap";

const AdminShopDetailsModal = ({item, setOpen}) => {
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
								<p className="fs18 mr-md-3">{item?.firstName}</p>
							</div>
							<div className="d-flex flex-column flex-md-row align-items-start justify-content-start">
								<p className="fs16 textThird">نام خانوادگی: </p>
								<p className="fs18 mr-md-3">{item?.lastName}</p>
							</div>
							<div className="d-flex flex-column flex-md-row align-items-start justify-content-start">
								<p className="fs16 textThird">موبایل: </p>
								<p className="fs18 mr-md-3">{item?.mobile}</p>
							</div>
							<div className="d-flex flex-column flex-md-row align-items-start justify-content-start">
								<p className="fs16 textThird">تاریخ تولد: </p>
								<p className="fs18 mr-md-3">{item?.birthday}</p>
							</div>
							<div className="d-flex flex-column flex-md-row align-items-start justify-content-start">
								<p className="fs16 textThird">آدرس: </p>
								<p className="fs18 mr-md-3">{item?.address}</p>
							</div>
						</div>
					</div>
					<div className="w-100 d-flex flex-wrap align-items-start justify-content-start">
						<div style={{flex: 1}} className="d-flex flex-column align-items-start justify-content-start">
							<p className="mt-3">عکس سلفی:</p>
							<div className="adminUserImages">
								{item?.image && <img alt="magicoff.ir" src={undefined} className="adminUserImages"/>}
								{!item?.image && <FontAwesomeIcon icon={faUser} className="fs30 textGray"/>}
							</div>
						</div>
						<div style={{flex: 1}} className="d-flex flex-column align-items-start justify-content-start">
							<p className="mt-3">عکس تاییدیه شغلی:</p>
							<div className="adminUserImages">
								{item?.image && <img alt="magicoff.ir" src={undefined} className="adminUserImages"/>}
								{!item?.image && <FontAwesomeIcon icon={faUser} className="fs30 textGray"/>}
							</div>
						</div>
					</div>
				</div>
				<div className={`modal-footer d-flex align-items-center ${item?.status ? 'justify-content-end' : 'justify-content-between'}`}>
					<button type="button" className="btn btn-secondary border-0 rounded px-3 py-2 text-white" onClick={() => setOpen(false)}>بستن</button>
				</div>
			</div>
		</Modal>
	);
}

export default AdminShopDetailsModal;
