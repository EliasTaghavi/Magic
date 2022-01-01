import React from 'react';
import {Modal} from "react-bootstrap";
import ProgressBar from "react-bootstrap/esm/ProgressBar";

const RenderProgressBarModal = () => {
	return (
		<Modal
			size="md"
			centered={true}
			show={true}
			onHide={() => {}}
		>
			<div className="modal-body">
				<div className="p-3 w-100 h-100 d-flex flex-column align-items-center justify-content-center">
					<span style={{fontFamily: 'IranSansBold', fontSize: 18}}>در حال بارگذاری فایل ها...</span>
					<ProgressBar className="w-100 mt-4 mb-1" animated now={100}/>
				</div>
			</div>
		</Modal>
	)
};

export default RenderProgressBarModal;
