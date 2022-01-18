import React from 'react';
import './footer.css';
import {Link} from "react-router-dom";
import whatsapp from '../../../assets/images/whatsapp.png';
import insta from '../../../assets/images/insta.png';
import tel from '../../../assets/images/tel.png';
import email from '../../../assets/images/email.png';

const Footer = () => {
  return (
    <div className="footerMainContainer">
      <div className="container d-flex flex-column align-items-center justify-content-start">
        <div className="w-100 d-flex flex-column flex-md-row align-content-start align-items-md-start justify-content-start justify-content-md-start">
          <div className="parts">
            <p className="fs16 textMain font-weight-bold">فروشگاه‌ها</p>
            <Link to="" className="fs14 text-secondary py-2">خانه عطر</Link>
            <Link to="" className="fs14 text-secondary py-2">خشکشویی رضایی</Link>
            <Link to="" className="fs14 text-secondary py-2">هایپر مارکت پاسارگاد</Link>
            <Link to="" className="fs14 text-secondary py-2">دونات</Link>
            <Link to="" className="fs14 text-secondary py-2">فست فود داژو</Link>
          </div>
          <div className="parts mt-4 mt-md-0">
            <p className="fs16 textMain font-weight-bold">با مجیک آف</p>
            <Link to="/about-us" className="fs14 text-secondary py-2">درباره ما</Link>
            <Link to="/terms" className="fs14 text-secondary py-2">قوانین و مقررات</Link>
          </div>
        </div>
        <div className="w-100 cmy5 d-flex flex-column-reverse flex-md-row align-items-center align-items-md-center justify-content-between">
          <div className="mt-5 mt-md-0">
            <p className='fs12 text-secondary'>ما را در شبکه‌های اجتماعی دنبال کنید:</p>
            <div className="d-flex align-items-start justify-content-start">
              <a href="#" rel="noopener noreferrer" target="_blank" className="socialBox">
                <img alt="magicOff.ir" src={whatsapp} className="socialIcon" />
              </a>
              <a href="#" rel="noopener noreferrer" target="_blank" className="socialBox">
                <img alt="magicOff.ir" src={insta} className="socialIcon" />
              </a>
              <a href="#" rel="noopener noreferrer" target="_blank" className="socialBox">
                <img alt="magicOff.ir" src={tel} className="socialIcon" />
              </a>
              <a href="#" rel="noopener noreferrer" target="_blank" className="socialBox">
                <img alt="magicOff.ir" src={email} className="socialIcon" />
              </a>
            </div>
          </div>
          <div>
            enamad logo
          </div>
        </div>
        <p className="w-100 copyRight">
          تمام حقوق  محفوظ و متعلق به شرکت برنامه نویسی ونکوییش می باشد.
        </p>
      </div>
    </div>
  );
}

export default Footer;
