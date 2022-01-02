import React, {useState} from 'react';
import {Modal} from "react-bootstrap";

const NewPckModal = ({setOpen}) => {
	const [focused, setFocused] = useState('');
	const [errors, setErrors] = useState({});
	const [name, setName] = useState('');
	const [price, setPrice] = useState('');
	const [duration, setDuration] = useState('');
	const [description, setDescription] = useState('');

	const handleValidate = (e) => {
		e.preventDefault();
	};

	const focusedFn = (e) => {
		let target = e.target;
		setFocused(target.name);
	}

	const unfocusedFn = () => {
		setFocused('');
	}

	const changeValue = (e) => {
		let target = e.target;
		delete errors[target.name];
		switch (target.name) {
			case 'name':
				setName(target.value);
				break;
			case 'price':
				setPrice(target.value);
				break;
			case 'duration':
				setDuration(target.value);
				break;
			case 'description':
				setDescription(target.value);
				break;
			default:
				break;
		}
	}

	return (
		<Modal
			show={true}
			size="md"
			onHide={() => setOpen(false)}
		>
			<div className="modal-content">
				<div className="modal-header fs16 font-weight-bold">
					افزودن پکیج جدید
				</div>
				<form noValidate={true} autoComplete="off" onSubmit={(e) => handleValidate(e)}>
					<div className="modal-body d-flex flex-column align-items-start justify-content-start pt-5 px-4">
						<div className="d-flex flex-column align-items-start justify-content-center w-100">
							<label htmlFor="name" className={`transition fs14 mb-0 ${focused === 'name' ? 'textMain' : 'textThird'}`}>
								نام پکیج
							</label>
							<input
								id="name"
								name="name"
								type="text"
								autoFocus={false}
								required={true}
								className={`form-control input ${errors['name'] && 'is-invalid'}`}
								value={name}
								onChange={changeValue}
								placeholder="..."
								onFocus={focusedFn}
								onBlur={unfocusedFn}
							/>
							<span className="invalid-feedback mt-2 fs14" style={{
								display: errors['name'] ? 'block' : 'none',
							}}>{errors['name']}</span>
						</div>
						<div className="d-flex flex-column align-items-start justify-content-center w-100 mt-4">
							<label htmlFor="price" className={`transition fs14 mb-0 ${focused === 'price' ? 'textMain' : 'textThird'}`}>
								قیمت
							</label>
							<input
								id="price"
								name="price"
								type="number"
								autoFocus={false}
								required={true}
								className={`form-control input ${errors['price'] && 'is-invalid'}`}
								value={price}
								onChange={changeValue}
								placeholder="..."
								onFocus={focusedFn}
								onBlur={unfocusedFn}
							/>
							<span className="invalid-feedback mt-2 fs14" style={{
								display: errors['price'] ? 'block' : 'none',
							}}>{errors['price']}</span>
						</div>
						<div className="d-flex flex-column align-items-start justify-content-center w-100 mt-4">
							<label htmlFor="duration" className={`transition fs14 mb-0 ${focused === 'duration' ? 'textMain' : 'textThird'}`}>
								مدت زمان (به روز)
							</label>
							<input
								id="duration"
								name="duration"
								type="number"
								autoFocus={false}
								required={true}
								className={`form-control input ${errors['duration'] && 'is-invalid'}`}
								value={duration}
								onChange={changeValue}
								placeholder="..."
								onFocus={focusedFn}
								onBlur={unfocusedFn}
							/>
							<span className="invalid-feedback mt-2 fs14" style={{
								display: errors['duration'] ? 'block' : 'none',
							}}>{errors['duration']}</span>
						</div>
						<label htmlFor="description" className={`transition fs14 mt-4 ${focused === 'description' ? 'textMain' : 'textThird'}`}>
							توضیحات
						</label>
						<textarea
							id="description"
							name="description"
							autoFocus={false}
							required={true}
							value={description}
							className={`form-control text-right addressBox ${errors['description'] && 'is-invalid'}`}
							onChange={changeValue}
							placeholder="..."
							onFocus={focusedFn}
							onBlur={unfocusedFn}
						/>
						<span className="invalid-feedback mt-2 fs14" style={{
							display: errors['description'] ? 'block' : 'none',
						}}>{errors['description']}</span>
					</div>
					<div className="modal-footer d-flex justify-content-between align-items-center mt-3">
						<button type="submit" className="btn bgMain border-0 rounded px-3 py-2 text-white ml-1">ثبت</button>
						<button type="button" className="btn btn-secondary border-0 rounded px-3 py-2 text-white" onClick={() => setOpen(false)}>بستن</button>
					</div>
				</form>
			</div>
		</Modal>
	);
}

export default NewPckModal;
