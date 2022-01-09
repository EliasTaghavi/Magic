import React, {useState, useEffect} from 'react';
import {Modal} from "react-bootstrap";
import NumberFormat from "react-number-format";
import Loader from "react-loader-spinner";
import {sendBuyDetails} from "../../../../../usersArea/api/user/pcks";
import {toast} from "react-toastify";
import toastOptions from "../../../../../components/ToastOptions";

const ConfirmBuyPckModal = ({pckDetails: item, onClose}) => {
	const [bigLoader, setBigLoader] = useState(true);
	const [buyUrl, setBuyUrl] = useState('');

	useEffect(() => {
		sendBuyDetails(item?.id)
			.then((response) => {
				if (response) {
					if (response === 401) {
						// do nothing but in another api's should logout from system
					} else {
						setBigLoader(false);
						setBuyUrl(response);
					}
				} else {
					toast.error('خطای سرور', toastOptions);
				}
			})
			.catch((error) => {
				toast.error('خطای سرور', toastOptions);
			})
	}, []);

	return (
		<Modal
			size="lg"
			centered={true}
			show={true}
			onHide={onClose}>
			<div className="modal-body p-4">
				{bigLoader && (
					<div className="d-flex centered mH1">
						<Loader type="ThreeDots" color='#ff521d' height={15} width={70} className="loader"/>
					</div>
				)}
				{!bigLoader && (
					<div className="d-flex flex-row-reverse align-items-center justify-content-between">
						<div key={item?.id} className="packageContainerNoHover shadow">
							<p className="fs30 textSecondary1 m-0">{item?.title}</p>
							<p className="fs18 textThird m-0 mt-3">{`مدت اعتبار:\xa0${item?.dayCount}\xa0روز`}</p>
							{/*<p className="fs14 textThird m-0 mt-1">میزان تقاضا: 23%</p>*/}
							<hr className="w-100 cDivider" />
							<p className="fs90 m-0 textSecondary1 text-center cNumber mt-2">
								<NumberFormat value={item?.price / 1000} displayType={'text'} thousandSeparator={true} className="fontSizePreSmall" />
							</p>
							<p className="fs14 textThird text-center">هزار تومان</p>
						</div>
						<div className="d-flex flex-column align-items-start justify-content-start flex pl-4">
							<p className="fs18 text-dark">شما در حال خرید پکیج روبرو هستید.</p>
							<p className="fs18 text-dark">آیا از خرید خود اطمینان دارید؟</p>
							<a href={buyUrl} rel="noopener noreferrer" className="submitBtn border-0 d-flex centered fs18">
								پرداخت
							</a>
							<button type="button" className="w-100 btn bg-white shadow1 mt-2 text-secondary" style={{height: 38, borderRadius: 10}} onClick={onClose}>
								<span>انصراف</span>
							</button>
						</div>
					</div>
				)}
			</div>
		</Modal>
	);
};

export default ConfirmBuyPckModal;
