import React, {useState} from 'react';
import {Modal} from "react-bootstrap";
import Loader from "react-loader-spinner";
import NumberFormat from "react-number-format";
import {faEquals, faMinus} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {sendBuyData} from "../../../../api/shop/scannedUser";

const ScannedUserDetailsModal = ({userId, data, onClose}) => {
	let {dayRemain, expireDate, lastname, name, packStatus, userType, discount} = data;
	const [error, setError] = useState('');
	const [factorPrice, setFactorPrice] = useState('');
	const [focus, setFocus] = useState(false);


	let priceToPay = factorPrice - ((factorPrice * discount) / 100);
	console.log(discount, priceToPay);

	const setBuyDataFn = () => {
		let data = {
			factorPrice,
			userId,
		};
		sendBuyData(data)
			.then((response) => {
				console.log(response);
			})
			.catch((error) => {
				console.log(error);
			})
	};

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
						<p className="fs24 textSecondary1 m-0">{name + '\xa0' + lastname}</p>
						<p className="fs16 textThird m-0 mt-3">{userType}</p>
						<hr className="w-100 cDivider"/>
						<p className={`fs40 m-0 text-center cNumber mt-1 ${packStatus ? 'text-success' : 'text-danger'}`}>{packStatus ? 'معتبر' : 'نامعتبر'}</p>
						<hr className="w-100 cDivider"/>
						<p className="fs14 textThird m-0 mt-1">مدت اعتبار باقی مانده: <span
							className="textMain fs16 font-weight-bold">{dayRemain}</span> روز</p>
						<p className="fs14 textThird m-0 mt-1">{`تاریخ انقضا:\xa0${expireDate}`}</p>
					</div>
				</div>}
				<hr className="bgSecondary my-5 w-100"/>
				{data && (
					<div className="d-flex flex-column centered mt-5">
						<div className="w-100 d-flex flex-column align-items-start justify-content-start" style={{maxWidth: 300}}>
							<label htmlFor="factorPrice" className={`transition fs14 mb-0 ${focus ? 'textMain' : 'textThird'}`}>
								مبلغ فاکتور<span style={{color: 'red'}}>{`\xa0*`}</span>
							</label>
							<NumberFormat
								id="factorPrice"
								name="factorPrice"
								autoFocus={true}
								required={true}
								type="text"
								min={0}
								value={factorPrice}
								className={`form-control mb-3 input ${error.length > 0 && 'is-invalid'}`}
								onChange={(e) => {
									setError('');
									setFactorPrice(e.target.value.replace(/,/gm, ''));
								}}
								placeholder="..."
								thousandSeparator={true}
								onFocus={() => setFocus(true)}
								onBlur={() => setFocus(false)}/>
							{error.length > 0 && <p className="text-danger fs14">مبلغ اشتباه وارد شده است</p>}
						</div>
						<div className="w-100 d-flex flex-column centered mt-4">
							<FontAwesomeIcon icon={faMinus} className="text-secondary fs20 mb-3"/>
							<p className="fs18 font-weight-bold textMain my-3">{`%${discount}`}</p>
							<FontAwesomeIcon icon={faEquals} className="text-secondary fs20 my-3"/>
							<div className="d-flex centered my-3">
								<NumberFormat value={priceToPay} displayType={'text'} thousandSeparator={true} className="fs30 textMain" />
								<p className="textMain fs20 mx-2 mb-0">تومان</p>
							</div>
						</div>
					</div>
				)}
				{data && <div className="d-flex centered mt-3">
					<button type="button" className="btn border-0 submitBtn" style={{maxWidth: 300}} onClick={setBuyDataFn}>
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
