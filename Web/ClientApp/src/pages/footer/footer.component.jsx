import React, {useEffect, useState} from 'react';
import './footer.css';
import {Link} from "react-router-dom";
import insta from '../../assets/images/insta.png';
import tel from '../../assets/images/tel.png';
import email from '../../assets/images/email.png';
import {getShopList} from "../../api";
import {toast} from "react-toastify";
import toastOptions from "../../components/ToastOptions";
import Loader from "react-loader-spinner";

const Footer = () => {
  const [bigLoader, setBigLoader] = useState(0); // 0=false 1=true 2=noData
  const [shops, setShops] = useState([]);

  useEffect(() => {
    getShopsFn();
  }, []);

  const getShopsFn = () => {
    setBigLoader(1);
    getShopList()
       .then((response) => {
         if (response) {
           let {success, result} = response;
           if (success) {
             setShops(result);
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
  };

  return (
    <div className="footerMainContainer">
      <div className="container d-flex flex-column align-items-center justify-content-start">
        <div className="w-100 d-flex flex-column flex-md-row align-content-start align-items-md-start justify-content-start justify-content-md-start">
          <div className="parts">
            <p className="fs16 textMain font-weight-bold">فروشگاه‌ها</p>
            {bigLoader === 0 && (
               <div className="d-flex flex-column align-items-start justify-content-start">
                 {shops?.length > 0 && shops?.map((item) => {
                   return (
                      <Link key={item?.id?.toString()} to={`/shop-details/${item?.name.replace(/\s/gm, '-')}/${item?.id}`} className="fs14 text-secondary py-2">{item?.name}</Link>
                   );
                 })}
               </div>
            )}
            {bigLoader === 1 && (
               <Loader type="ThreeDots" color='#ff521d' height={8}/>
            )}
            {bigLoader === 2 && (
               <p className="fs12 text-danger">داده ای یافت نشد</p>
            )}
          </div>
          <div className="parts mt-4 mt-md-0">
            <p className="fs16 textMain font-weight-bold">با مجیک آف</p>
            <Link to="/about-us" className="fs14 text-secondary py-2">درباره ما</Link>
            <Link to="/terms" className="fs14 text-secondary py-2">قوانین و مقررات</Link>
          </div>
        </div>
        <div className="w-100 cmy5 d-flex flex-column-reverse flex-md-row align-items-center align-items-md-center justify-content-between">
          <div className="mt-5 mt-md-0">
            <p className='fs12 text-secondary'>با ما در ارتباط باشید:</p>
            <div className="d-flex align-items-start justify-content-start">
              <a href="https://www.instagram.com/magic_off.ir" rel="noopener noreferrer" target="_blank" className="socialBox">
                <img alt="magicOff.ir" src={insta} className="socialIcon" />
              </a>
              <a href="tel:09101419130" rel="noopener noreferrer" className="socialBox">
                <img alt="magicOff.ir" src={tel} className="socialIcon" />
              </a>
              <a href="mailto:info@magicoff.ir" rel="noopener noreferrer" className="socialBox">
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
