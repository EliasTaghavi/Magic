import React, {useState} from 'react';
import '../../../assets/main.css';
import Header from "../../../pages/shared/header/header.component";
import tt from '../../../assets/images/tt.png';
import tt12 from '../../../assets/images/tt12.png';
import tt4 from '../../../assets/images/tt4.png';
import Footer from "../../../pages/shared/footer/footer.component";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";

const defaultFormData = {
  email: '',
  description: '',
}

const Home = () => {
  const [errors, setErrors] = useState(defaultFormData);
  const [focused, setFocused] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');

  const changeValue = (e) => {
    let target = e.target;
    switch (target.name) {
      case 'email':
        setEmail(target.value);
        break;
      case 'description':
        setDescription(target.value);
        break;
      default:
        break;
    }
  }

  const sendReport = () => {
    // do nothing
  };

  return (
    <div className="homeMainContainer">
      <Header />
      <div className="container-fluid firstPart main">
        <div className="container pb-2 d-flex flex-column flex-md-row align-items-center inFirstPart">
          <div className="d-flex flex-column align-items-start justify-content-center flex px-3">
            <h1 className="fs34 font-weight-bold text-dark lh50 mainTitle">اینجا <span className="textMain fs40">سودش</span> کجاست؟</h1>
            <p className="fs20 mt-4 lh40 resText">
              با یکبار خرید اشتراک vip زمان دار ، بصورت نامحدود تخفیف دریافت کنید.
              <span className="fs22 font-weight-bold"> با ما همیشه در <span className="textMain">سود </span>باشید.</span>
            </p>
          </div>
          <div className="position-relative headerMainImageContainer">
            <img alt="magicOff.ir" src={tt4} className="headerMainImage px-lg-5" />
          </div>
        </div>
      </div>
      <div className="container-fluid secondPart">
        <div className="container inParts eachParts">
          <div className="flex w-100">
            <p className="number fs40">1.</p>
            <h2 className="font-weight-bold fs30">انتخاب با شماست</h2>
            <p className="fs18">تحولی نو در عرصه تخفیف</p>
          </div>
          <div className="flex eachPartDesc">
            {/*<h4 className="font-weight-bold cpt-7">شما رتبه بندی کنید، بقیش با ما</h4>*/}
            {/*<p className="mt-4 fs16 lh26">شما به فروشگاه ها امتیاز بدید، ما بر اساس امتیازات و رضایت شما، فروشگاه ها را رتبه بندی و به سیستم اضافه می کنیم.</p>*/}
            {/*<img alt="magicOff" src={arrow} className="customArrow d-none d-md-flex" />*/}
            <div className="cardFrameContainer">
              <img alt="magicOff" src={tt} className="cardFrame" />
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid thirdPart">
        <div className="container inParts eachParts">
          <div className="eachPartDesc">
            {/*<h4 className="font-weight-bold text-white cpt-7">یک تعامل سازنده بین مشتری و فروشگاه</h4>*/}
            {/*<p className="text-white mt-4 fs16 lh26">بالاترین درصد تخفیفی که برای شما کاربران عزیز جذاب باشه و برای فروشگاه ها هم صرفه اقتصادی داشته باشه رو ما گرفتیم براتون</p>*/}
            {/*<img alt="magicOff" src={arrowWhite} className="arrowReverse d-none d-md-flex" />*/}
            <div className="cardFrameContainer">
              <img alt="magicOff" src={tt12} className="cardFrame" />
            </div>
          </div>
          <div className="flex w-100">
            <p className="number fs40">2.</p>
            <h2 className="font-weight-bold text-white fs30">رویای ما برآورده سازی انتظارات شماست</h2>
            <p className="text-white fs18">نمونه خدمات</p>
          </div>
        </div>
        {/*<img alt="magicOff" src={wow} className="wow pos8" />*/}
        {/*<img alt="magicOff" src={wow} className="wow wow1 pos9" />*/}
      </div>
      <div className="container-fluid fourthPart">
        <div className="container inParts eachPart1">
          <div className="flex w-100">
            <p className="number fs40">3.</p>
            <h2 className="font-weight-bold fs30 mb-5">سامانه انتقادات و پیشنهادات</h2>
            {/*<p className="fs18">مناسب و به صرفه ترین روش برای خرید های اساسی و دوره ای</p>*/}
          </div>
          <div className="flex eachPartDesc">
            {/*<h4 className="font-weight-bold cpt-7">تعداد خریدهای اساسی زیاد و قیمت هم بالا</h4>*/}
            {/*<p className="mt-4 fs16 lh26">بهترین راه برای کاهش هزینه ها، گرفتن یک تخفیف خوب هنگام خریدهای دوره ای هست، ما براتون تخفیف گرفتیم</p>*/}
            {/*<img alt="magicOff" src={arrow} className="customArrow d-none d-md-flex" />*/}
            <div className="cardFrameContainer">
              <form autoComplete="off" noValidate={true} className="cardFrame reportBox p-4" onSubmit={sendReport}>
                <div className="d-flex flex-column w90p align-items-start justify-content-center">
                  <label htmlFor="email" className={`transition fs14 mt-4 mb-0 ${focused === 'email' ? 'textMain' : 'textThird'}`}>
                    ایمیل
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="number"
                    autoFocus={false}
                    required={true}
                    className={`form-control bg-white ${errors['email'] && 'is-invalid'}`}
                    value={email}
                    onChange={changeValue}
                    maxLength={4}
                    placeholder="..."
                    onFocus={() => setFocused('email')}
                    onBlur={() => setFocused('')}
                  />
                  <span className="invalid-feedback mt-2 fs14" style={{
                    display: errors['email'] ? 'block' : 'none',
                  }}>{errors['email']}</span>
                </div>
                <div className="d-flex flex-column w90p  align-items-start justify-content-center mt-3">
                  <label htmlFor="description" className={`transition fs14 mt-4 mb-0 ${focused === 'description' ? 'textMain' : 'textThird'}`}>
                    نظر شما
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    autoFocus={false}
                    required={true}
                    value={description}
                    className={`form-control bg-white text-right descriptionBox ${errors['description'] && 'is-invalid'}`}
                    onChange={changeValue}
                    placeholder="..."
                    onFocus={() => setFocused('description')}
                    onBlur={() => setFocused('')}
                  />
                  <span className="invalid-feedback mt-2 fs14" style={{
                    display: errors['description'] ? 'block' : 'none',
                  }}>{errors['description']}</span>
                </div>
                <button type="submit" className="btn submitBtn outline border-0">
                  ثبت
                </button>
              </form>
              {/*<img alt="magicOff" src={tt11} className="cardFrame" />*/}
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid fifthPart position-relative cpt-5 pb-3">
        <div className="container position-relative d-flex flex-column flex-md-row align-items-center justify-content-between mt-5 bgImage br10 shadow3">
          <div className="rightPart textShadowLight">
            {/*<p className="text-white fs24 font-weight-bold text-center">*/}
            {/*  جذاب‌ترین <span className="textSecondary fs40 font-weight-bold mr-1">تخفیف‌ها</span>*/}
            {/*</p>*/}
            <p className="text-white mb-1 fs30 text-center text-md-right lh26">برای دریافت اشتراک <span className="textSecondary fs30 font-weight-bold">کلیک </span>کنید.</p>
          </div>
          <Link to="" className="signUpLink centered textMain">
            <p className="noBreak m-0">ثبت نام</p>
            <span className="p-2 bgMain rounded-circle d-flex centered mr-4">
              <FontAwesomeIcon icon={faArrowLeft} color="white" className="fs16"/>
            </span>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  )
};

export default Home;
