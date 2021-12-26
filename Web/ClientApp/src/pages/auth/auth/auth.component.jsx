import React from 'react';
import './auth.css';
import logo from '../../../assets/images/logo.png';
import cart from '../../../assets/images/cart.png';
import store from '../../../assets/images/store.png';
import {Link} from 'react-router-dom';

const Login = (props) => {

  const goBack = () => {
    props.history.goBack();
  }

  return (
    <div className="mainContainer">
      <div className="d-flex flex-column align-items-center justify-content-center position-relative sliderContainer w-100" style={{minHeight: 350}}>
        <img alt="magicOff.ir" src={logo} className="headerImage" />
        <p className="textMain fs24 mt-5">ورود به مجیک آف</p>
        <div className="buttonsContainer d-flex flex-column flex-md-row">
          <Link to="/login/shops" type="button" className="btn outline type">
            <span className="textMain font-weight-bold fs24">فروشگاه</span>
            <img alt="magicoff.ir" src={store} className="image" />
            <span className="d-none d-md-flex fs14 text-center">جهت ثبت فروشگاه خود برای ارائه تخفیف از این قسمت ثبت نام نمایید یا وارد شوید.</span>
            <span className="d-flex d-md-none fs14 text-center">جهت ثبت فروشگاه برای ارائه تخفیف</span>
            <div className="button">
              ورود
            </div>
          </Link>
          <Link to="/login/users" type="button" className="btn outline type mt-5 mt-md-0">
            <span className="textMain font-weight-bold fs24">کاربران</span>
            <img alt="magicoff.ir" src={cart} className="image" />
            <span className="d-none d-md-flex fs14 text-center">جهت استفاده از خدمات تخفیف، از این قسمت ثبت نام نمایید یا وارد شوید.</span>
            <span className="d-flex d-md-none fs14 text-center">جهت استفاده از خدمات تخفیف</span>
            <div className="button">
              ورود
            </div>
          </Link>
        </div>
        <button type="button" onClick={goBack} className="btn text-primary textUnderline bg-transparent border-0 outline">
          بازگشت
        </button>
      </div>
    </div>
  );
}

export default Login;
