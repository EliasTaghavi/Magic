import React from 'react';
import {Modal} from "react-bootstrap";

const RenderSelectMediaModal = ({onClose, onGallery, onCamera}) => {
	return (
		<Modal
			size="md"
			centered={true}
			show={true}
			onHide={onClose}>
			<div className="modal-header">
				انتخاب عکس...
			</div>
			<div className="modal-body p-0">
				<div className="d-flex flex-column centered">
					<button type="button" className="btn bg-white w-100 d-flex align-items-center justify-content-start border-0 flex py-3" onClick={onGallery}>
						گالری
					</button>
					<div className="c1Divider" />
					<button type="button" className="btn bg-white w-100 d-flex align-items-center justify-content-start border-0 flex py-3" onClick={onCamera}>
						دوربین
					</button>
					<div className="c1Divider" />
					<button type="button" className="btn bg-white w-100 d-flex align-items-center justify-content-start border-0 flex py-3" onClick={onClose}>
						بستن
					</button>
				</div>
			</div>
		</Modal>
	);
}

export default RenderSelectMediaModal;
