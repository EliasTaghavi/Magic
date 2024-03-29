import React, {useEffect, useState} from 'react';
import {Modal} from "react-bootstrap";
import {faPlus, faTimes} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Resizer from "react-image-file-resizer";
import Loader from "react-loader-spinner";
import {sendShopImage} from "../../../../api/shop";
import * as MainStore from "../../../../../store/main";
import {toast} from "react-toastify";
import toastOptions from "../../../../../components/ToastOptions";
import {useDispatch} from "react-redux";
import {imagePreUrl} from "../../../../../usersArea/api/imagePreUrl";

const AddImageModal = ({item, setOpen, refreshData}) => {
	const dispatch = useDispatch();
	const [loader, setLoader] = useState(false);
	const [errors, setErrors] = useState({});
	const [images, setImages] = useState([]);
	const [addedImages, setAddedImages] = useState([]);
	const [deletedImages, setDeletedImages] = useState([]);

	useEffect(() => {
		setImages([...item?.photos, ...images]);
	}, [item]);

	const handleValidate = (e) => {
		e.preventDefault();
		setLoader(true);
		let data = {
			files: addedImages,
			deleted: deletedImages.map((i) => i.replace(/(.png)|(.jpg)|(.jpeg)/gm, '')),
			shopId: item?.id,
		};
		sendShopImage(data)
			.then((response) => {
				let {success} = response
				if (response) {
					if (response === 401) {
						dispatch(MainStore.actions.setLogoutModal({type: 'admin', modal: true}));
					} else if (success) {
						refreshData();
						setOpen();
						setLoader(false);
					}
				} else {
					toast.error('خطای سرور', toastOptions);
					setLoader(false);
				}
			})
			.catch((e) => {
				toast.error('خطای سرور', toastOptions);
				setLoader(false);
			})
	}

	const setImagesFn = (e) => {
		delete errors['imageSize'];
		if (e.target.files && e.target.files[0]) {
			if (images.length < 4) {
				// if (e.target.files[0].size / 1024 < 1024) {
				let reader = new FileReader();
				let data = e.target.files[0];
				let blobName = data?.name ?? `${(Math.random() * 100).toFixed(0).toString()}.jpg`;
				let tempImage = new Image();
				let _URL = window.URL || window.webkitURL;

				tempImage.src = _URL.createObjectURL(data);

				tempImage.onload = () => {
					let width = data.size > 1047576 ? tempImage.width / 5 : tempImage.width;
					let height = data.size > 1047576 ? tempImage.height / 5 : tempImage.height;
					Resizer.imageFileResizer(
						data,
						width,
						height,
						'JPEG',
						100,
						0,
						uri => {
							uri.lastModifiedDate = new Date();
							uri.name = blobName;
							setAddedImages([uri, ...addedImages]);
							reader.readAsDataURL(uri);
						},
						'blob'
					);
					Resizer.imageFileResizer(
						data,
						width,
						height,
						'JPEG',
						100,
						0,
						uri => {
							setImages([...images, {id: blobName, data: uri}]);
						},
						'base64'
					);
				}
			} else {
				errors['imageLength'] = '* حداکثر 4 فایل قابل انتخاب است.';
			}
		}
	}

	const removePicture = (item) => {
		let newImages;
		if (item?.id) {
			// the image is local
			newImages = images.filter((i) => i?.id !== item?.id);
			let newAddedImages = addedImages.filter((i) => i.name !== item.id);
			setAddedImages(newAddedImages);
		} else {
			// the image is on server
			newImages = images.filter((i) => i !== item);
			setDeletedImages([item, ...deletedImages]);
		}
		setImages(newImages);
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
					<div className="modal-body d-flex flex-wrap align-items-start justify-content-start py-5">
						<div className="w-100 d-flex flex-column centered">
							{images?.length < 4 && <div className="w-100 d-flex flex-column centered">
								<div className="w-100 d-flex centered rounded">
									<button type="button" className="btn addImageBox outline"
											  onClick={() => document.getElementById('getImages').click()}>
										<FontAwesomeIcon icon={faPlus} color="#999999" style={{fontSize: 25}}/>
									</button>
									<input type="file" id="getImages" multiple accept="image/jpg" className="form-control d-none"
											 onChange={(e) => setImagesFn(e)}/>
								</div>
								<span style={{color: '#999999', fontSize: 14}} className="mt-2 mr-2">فقط پرونده ها با فرمت jpg را بارگذاری نمایید.</span>
							</div>}
							<div className="w-100 d-flex flex-row flex-wrap align-items-start justify-content-start mt-4">
								{/*{item?.photos.length > 0 && item?.photos.map((item, index) => {*/}
								{/*	return (*/}
								{/*		<div key={Math.random().toString()} className="position-relative">*/}
								{/*			<img alt="ezsaze" src={imagePreUrl(item)} className="border border-light-dark rounded selectedShopImage"/>*/}
								{/*			<button type="button" className="btn bg-light border border-light-dark rounded-circle d-flex align-items-center justify-content-center p-0 m-0 outline position-absolute"*/}
								{/*					  style={{width: 22, height: 22, top: -2, left: -2, zIndex: 999}} onClick={() => removeServerPictures(item)}>*/}
								{/*				<FontAwesomeIcon icon={faTimes} color="red"/>*/}
								{/*			</button>*/}
								{/*		</div>*/}
								{/*	);*/}
								{/*})}*/}
								{images?.map((item) => {
									return (
										<div key={Math.random().toString()} className="position-relative">
											<img alt="ezsaze" src={item?.id ? item?.data : imagePreUrl(item)} className="border border-light-dark rounded selectedShopImage"/>
											<button type="button" className="btn bg-light border border-light-dark rounded-circle d-flex align-items-center justify-content-center p-0 m-0 outline position-absolute"
													  style={{width: 22, height: 22, top: -2, left: -2, zIndex: 999}} onClick={() => removePicture(item)}>
												<FontAwesomeIcon icon={faTimes} color="red"/>
											</button>
										</div>)
								})}
							</div>
						</div>
					</div>
					<div className="">
						<div className="modal-footer d-flex justify-content-between align-items-center mt-3">
							<button type="submit" className="btn bgMain border-0 rounded px-3 py-2 text-white ml-1">
								{!loader && <span>ثبت</span>}
								{loader && <Loader type="ThreeDots" color='#ffffff' height={8} width={100} className="loader"/>}
							</button>
							<button type="button" className="btn btn-secondary border-0 rounded px-3 py-2 text-white" onClick={() => setOpen(false)}>بستن</button>
						</div>
					</div>
				</form>
			</div>
		</Modal>
	);
}

export default AddImageModal;
