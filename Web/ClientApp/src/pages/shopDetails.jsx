import React, {useEffect, useRef, useState} from 'react';
import Header from "./header/header.component";
import {Link, useHistory} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import Footer from "./footer/footer.component";
import bg from '../assets/images/1.jpg';
import {getShopDetails} from "../api/index";
import {toast} from "react-toastify";
import toastOptions from "../components/ToastOptions";
import Loader from "react-loader-spinner";
import {imagePreUrl} from "../usersArea/api/imagePreUrl";

const ShopDetails = () => {
	const container = useRef(null);
	const history = useHistory();
	const [bigLoader, setBigLoader] = useState(0); //0=false 1=true 2=nodata
	const [shopDetails, setShopDetails] = useState(null);

	useEffect(() => {
		if (container?.current) {
			container.current.scrollIntoView({ behavior: 'smooth' });
		}
	}, []);

	useEffect(() => {
		getShopDetailsFn();
	}, []);

	const getShopDetailsFn = () => {
		setBigLoader(1);
		let shopId = history?.location?.pathname?.split('/')[3];
		getShopDetails(shopId)
			.then((response) => {
				if (response) {
					let {success, result} = response
					if (response === 401) {
						// do nothing
					} else if (success) {
						setShopDetails(result);
						setBigLoader(0);
					}
				} else {
					toast.error('خطای سرور', toastOptions);
					setBigLoader(2);
				}
			})
			.catch((error) => {
				toast.error('خطای سرور', toastOptions);
				setBigLoader(2);
			})
	}

	return (
		<div className="homeMainContainer">
			<Header />
			<div ref={container}></div>
			<div className="container d-flex flex-column justify-content-start align-items-start mt-5 main text-justify">
				<h2>شناسنامه کسب و کار</h2>
				<div className="w-100 d-flex centered" style={{minHeight: 500}}>
					{bigLoader === 0 && <div className="w-100 d-flex flex-column align-items-start justify-content-start">
						<ImageSlider shopDetails={shopDetails}/>
						<div className="d-flex align-items-center justify-content-start mt-5">
							<p className="fs16" style={{width: 180}}>نام فروشگاه:</p>
							<p className="fs18 font-weight-bold">{shopDetails?.name}</p>
						</div>
						<div className="d-flex align-items-center justify-content-start mt-3">
							<p className="fs16" style={{width: 180}}>شماره تماس:</p>
							<p className="fs18 font-weight-bold">{shopDetails?.phone}</p>
						</div>
						<div className="d-flex align-items-center justify-content-start mt-3">
							<p className="fs16" style={{width: 180}}>درصد تخفیف:</p>
							<p className="fs18 font-weight-bold textMain">%{shopDetails?.latestOff}</p>
						</div>
						<div className="d-flex align-items-center justify-content-start mt-3">
							<p className="fs16" style={{width: 180}}>آدرس:</p>
							<p className="fs18 font-weight-bold">{shopDetails?.address}</p>
						</div>
					</div>}
					{bigLoader === 1 && (
						<div className="w-100 d-flex centered py-3">
							<Loader type="ThreeDots" color='#ff521d' height={8} width={100} className="loader"/>
						</div>
					)}
					{bigLoader === 2 && (
						<div className="w-100 d-flex centered py-3">
							<span className="text-danger">داده ای وجود ندارد.</span>
						</div>
					)}
				</div>
			</div>
			<div className="container-fluid fifthPart position-relative cpt-5 pb-3">
				<div className="container position-relative d-flex flex-column flex-md-row align-items-center justify-content-between mt-5 bgImage br10 shadow3">
					<div className="rightPart textShadowLight">
						{/*<p className="text-white fs24 font-weight-bold text-center">*/}
						{/*  جذاب‌ترین <span className="textSecondary fs40 font-weight-bold mr-1">تخفیف‌ها</span>*/}
						{/*</p>*/}
						<p className="text-white mb-1 fs30 text-center text-md-right clh26">برای دریافت اشتراک <span className="textSecondary fs30 font-weight-bold">کلیک </span>کنید.</p>
					</div>
					<Link to="/login" className="signUpLink centered textMain">
						<p className="noBreak m-0">ثبت نام</p>
						<span className="p-2 bgMain rounded-circle d-flex centered mr-4">
              <FontAwesomeIcon icon={faArrowLeft} color="white" className="fs16"/>
            </span>
					</Link>
				</div>
			</div>
			<Footer />
		</div>
	);
}

const ImageSlider = ({shopDetails}) => {
	console.log(shopDetails);
	return (
		<div>
			<div data-tip="" data-for="global" id="carouselExampleIndicators" className="carousel slide mt-3" data-ride="carousel" style={{minHeight: 350}}>
				<ol className="carousel-indicators">
					{shopDetails?.photos.length > 0 && shopDetails?.photos.map((item) => {
						return (
							<li key={item.toString()} data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
						);
					})}
				</ol>
				<div className="carousel-inner">
					{shopDetails?.photos.length > 0 && shopDetails?.photos.map((item) => {
						console.log(item);
						return (
							<div key={item.toString()} className="carousel-item active" style={{maxHeight: 350, backgroundPosition: 'center'}}>
								<img className="d-block w-100" src={imagePreUrl(item)} alt="First slide"/>
							</div>
						);
					})}
					{/*<div className="carousel-item">*/}
					{/*	<img className="d-block w-100" src="..." alt="Second slide"/>*/}
					{/*</div>*/}
					{/*<div className="carousel-item">*/}
					{/*	<img className="d-block w-100" src="..." alt="Third slide"/>*/}
					{/*</div>*/}
				</div>
				<a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
					<span className="carousel-control-prev-icon" aria-hidden="true"></span>
					<span className="sr-only">Previous</span>
				</a>
				<a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
					<span className="carousel-control-next-icon" aria-hidden="true"></span>
					<span className="sr-only">Next</span>
				</a>
			</div>
		</div>
	);
};

export default ShopDetails;
