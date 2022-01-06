import React from 'react';
import {Modal} from "react-bootstrap";

const EditUserProfileModal = ({onClose}) => {
	return (
		<Modal
			size="lg"
			show={true}
			onHide={onClose}>
			<div className="modal-body p-4">
				<div className="d-flex flex-row-reverse align-items-center justify-content-between">

				</div>
			</div>
		</Modal>
	);
}

export default EditUserProfileModal;
