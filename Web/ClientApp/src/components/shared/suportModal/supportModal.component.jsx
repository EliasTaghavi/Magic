import React from 'react';
import {Modal} from "react-bootstrap";

const SupportModal = ({setOpen}) => {
	return (
		<Modal
			show={true}
			size="lg"
			onHide={() => setOpen(false)}
		>
			<div className="modal-content">
				<div className="modal-body d-flex flex-column align-items-center justify-content-center pt-5">
					<span className="fs24 textMain">لطفا با شماره زیر تماس حاصل فرمایید.</span>
					<a href={`tel:09123456789`} className="font-weight-bold mt-5 fs24 textThird textDecoration">09123456789</a>
				</div>
				<div className="modal-footer">
					<button type="button" className="bgMain border-0 rounded px-3 py-2 text-white" onClick={() => setOpen(false)}>بستن</button>
				</div>
			</div>
		</Modal>
	);
}

export default SupportModal;
