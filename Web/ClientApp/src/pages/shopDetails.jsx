import React, {useEffect, useRef} from 'react';
import Header from "./header/header.component";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import Footer from "./footer/footer.component";
import bg from '../assets/images/1.jpg';

const ShopDetails = () => {
	const container = useRef(null);

	useEffect(() => {
		if (container?.current) {
			container.current.scrollIntoView({ behavior: 'smooth' });
		}
	}, []);

	return (
		<div className="homeMainContainer">
			<Header />
			<div ref={container}></div>
			<div className="container d-flex justify-content-start align-items-start flex-column mt-5 main text-justify">
				<h2>شناسنامه کسب و کار</h2>
				<div>
					<ImageSlider />
					<div>
						<p>نام فروشگاه:</p>
						<p>{}</p>
					</div>
					<div>
						<p>شماره تماس:</p>
						<p></p>
					</div>
					<div>
						<p>آدرس:</p>
						<p></p>
					</div>
					<div>
						<p>درصد تخفیف در مجیک آف:</p>
						<p></p>
					</div>
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

const ImageSlider = () => {
	return (
		<div id="carouselExampleIndicators" className="carousel slide mt-3" data-ride="carousel" style={{maxHeight: 350}}>
			<ol className="carousel-indicators">
				<li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
				{/*<li data-target="#carouselExampleIndicators" data-slide-to="1"></li>*/}
				{/*<li data-target="#carouselExampleIndicators" data-slide-to="2"></li>*/}
			</ol>
			<div className="carousel-inner">
				<div className="carousel-item active" style={{backgroundPosition: 'center'}}>
					<img className="d-block w-100" src={bg} alt="First slide"/>
				</div>
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
	);
};

export default ShopDetails;
