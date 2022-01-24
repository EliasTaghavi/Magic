import React, {useEffect, useRef} from 'react';
import Header from "./header/header.component";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import Footer from "./footer/footer.component";

const AboutUs = () => {
	const container = useRef(null);

	useEffect(() => {
		if (container?.current) {
			container.current.scrollIntoView({ behavior: 'smooth' });
		}
	}, []);

	return (
		<div className="homeMainContainer">
			<Header />
			<div className="container firstPart main" ref={container}>
				<div className="d-flex flex-column align-items-start justify-content-start cpt-5">
					<h3>درباره مجیک آف</h3>
					<hr className="w-100" />
					<p className="font-weight-bold fs18">معرفی نامه :</p>
					<p className="fs16 lh30 text-justify">
						مجیک آف یکی از زیر مجموعه های تجاری شرکت کارن تجارت آرسس است که فعالیت خود را از سال ۹۹ آغاز نمود.
						حوزه ی فعالیت مجیک آف ارائه ی خدمات تخفیف بصورت اشتراک های QR شده میباشد
					</p>
					<p className="font-weight-bold fs18 mt-3">هدف مجیک آف :</p>
					<p className="fs16 lh30 text-justify">
						مجیک آف در صدد آن است تا بکارگیری شیوه های نوین و در عین حال ساده روشی را رواج دهد که در ان کاربر با توجه به نیاز هایش بتواند از بهترین مجموعه های مورد نظرش تخفیف بگیرد
						در این روش از یک سو با رونق کسب و کارها و از سوی دیگر با ایجاد صرفه ی اقتصادی برای خریداران رابطه ای برد-برد شکل میگیرد.
						مجیک آف متشکل از متخصصان و کارشناسان حوزه ی بازاریابی و ارزیابی کسب و کار می باشد و خواهان آن است که کیفیت را برای مشتری به ارمغان اورد.
					</p>
					<p className="font-weight-bold fs18 mt-3">مزیت های مجیک آف :</p>
					<p className="fs16 lh30 text-justify">
						با استفاده از این روش از انواع کالا و خدمات بصورت پکیج های جذاب و متشکل از فروشگاه های معتبر و کیفیت سنجی شده بهرمند شوید.
					</p>
					<p className="font-weight-bold fs18 mt-4">راه های ارتباطی :</p>
					<div className="d-flex centered mt-2">
						<p style={{width: 100}}>اینستاگرام : </p>
						<p className="font-weight-bold fs16">Magic_off.ir</p>
					</div>
					<div className="d-flex centered">
						<p style={{width: 100}}>ایمیل :</p>
						<p className="font-weight-bold fs16">info@magicoff.ir</p>
					</div>
					<div className="d-flex centered">
						<p style={{width: 100}}>واتس آپ :</p>
						<p className="font-weight-bold fs16">۰۹۱۰۱۴۱۹۱۳۰ </p>
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

export default AboutUs;
