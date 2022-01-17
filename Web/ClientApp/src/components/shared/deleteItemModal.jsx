import React, {useState} from 'react';
import {Modal} from "react-bootstrap";
import Loader from "react-loader-spinner";

const DeleteItemModal = ({item, setOpen, deleteItem}) => {
	const [loader, setLoader] = useState(false);

	return (
		<Modal
			show={true}
			size="md"
			onHide={() => setOpen(false)}
		>
			<div className="modal-content">
				<div className="modal-header fs16 font-weight-bold">
					حذف آیتم
				</div>
				<div className="modal-body d-flex flex-column align-items-start justify-content-start pt-5">
					<p className="fs16">آیا از حذف آیتم زیر مطمئن هستید؟</p>
					<div className="d-flex centered">
						<p className="fs18">{item.type} : </p>
						<p className="fs18 font-weight-bold">{`\xa0${item.name}\xa0`}</p>
					</div>
				</div>
				<div className={`modal-footer d-flex align-items-center ${item?.status ? 'justify-content-end' : 'justify-content-between'}`}>
					<button type="button" className="btn bgMain border-0 rounded px-3 py-2 text-white ml-1"
							  onClick={() => {
							  	setLoader(true);
								  deleteItem();
							  }}>
						{!loader && <span>تایید</span>}
						{loader && <Loader type="ThreeDots" color='white' height={7}/>}
					</button>
					<button type="button" className="btn btn-secondary border-0 rounded px-3 py-2 text-white" onClick={() => setOpen(false)}>بستن</button>
				</div>
			</div>
		</Modal>
	);
};

export default DeleteItemModal;
