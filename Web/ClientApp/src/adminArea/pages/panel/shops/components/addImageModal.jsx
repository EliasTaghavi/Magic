import React from 'react';
import {Modal} from "react-bootstrap";

const AddImageModal = ({item, setOpen}) => {
	console.log(item);

	const handleValidate = () => {

	}

	return (
		<Modal
			show={true}
			size="lg"
			onHide={() => setOpen(false)}
		>
			<div className="modal-content">
				<div className="modal-header fs16 font-weight-bold">
					{`افزودن تصاویر جدید به ${item?.name}`}
				</div>
				<form noValidate={true} autoComplete="off" onSubmit={(e) => handleValidate(e)}>
					<div className="modal-body d-flex flex-wrap align-items-start justify-content-start pt-5">

					</div>
				</form>
			</div>
		</Modal>
	);
}

export default AddImageModal;
