import React, {useState} from 'react';
import {Modal} from "react-bootstrap";
import NumberFormat from "react-number-format";
import Loader from "react-loader-spinner";

const ConfirmBuyPckModal = ({pckDetails: item, onClose}) => {
	const [btnLoader, setBtnLoader] = useState(false);
	return (
		<Modal
			size="lg"
			centered={true}
			show={true}
			onHide={() => onClose()}>
			<div className="modal-body p-4">
				<div className="d-flex flex-row-reverse align-items-center justify-content-between">
					<div key={item?.id} className="packageContainerNoHover shadow">
						<p className="fs30 textSecondary1 m-0">{item?.title}</p>
						<p className="fs18 textThird m-0 mt-3">{`مدت اعتبار:\xa0${item?.dayCount}\xa0روز`}</p>
						{/*<p className="fs14 textThird m-0 mt-1">میزان تقاضا: 23%</p>*/}
						<hr className="w-100 cDivider" />
						<p className="fs50 m-0 textSecondary1 text-center cNumber mt-2">
							<NumberFormat value={item?.price / 1000} displayType={'text'} thousandSeparator={true} className="fontSizePreSmall" />
						</p>
						<p className="fs14 textThird text-center">هزار تومان</p>
					</div>
					<div className="d-flex flex-column align-items-start justify-content-start">
						<p className="fs24">شما در حال خرید پکیج روبرو هستید.</p>
						<p className="fs24">آیا از خرید خود اطمینان دارید؟</p>
						<button type="submit" className="submitBtn border-0">
							{!btnLoader && <span>ثبت</span>}
							{btnLoader && <Loader type="ThreeDots" color='rgba(255, 255, 255, 1)' height={8} width={70} className="loader"/>}
						</button>
						<button type="submit" className="w-100 btn btn-outline-secondary mt-2" style={{height: 38, borderRadius: 10}}>
							<span>انصراف</span>
						</button>
					</div>
				</div>
			</div>
		</Modal>
	);
};

export default ConfirmBuyPckModal;
