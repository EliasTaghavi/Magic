import React, {useEffect, useRef, useState} from 'react';
import '../assets/main.css';
import Header from "./header/header.component";
import tt from '../assets/images/tt.png';
import tt12 from '../assets/images/tt12.png';
import tt4 from '../assets/images/tt4.png';
import Footer from "./footer/footer.component";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import {toast} from "react-toastify";
import toastOptions from "../components/ToastOptions";
import Loader from "react-loader-spinner";
import {sendReport} from "../api";
import tokenStore from "../utils/tokenStore";

const Home = () => {
  const [errors, setErrors] = useState({});
  const [focused, setFocused] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [sendLoader, setSendLoader] = useState(false);

  const container = useRef(null);

  useEffect(() => {
    if (container?.current) {
      container.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const changeValue = (e) => {
    let target = e.target;
    delete errors[target?.name];
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

  const sendReportFn = (e) => {
    e.preventDefault();
    let userToken = tokenStore.getUserToken();
    let shopToken =  tokenStore.getShopToken();
    if (userToken || shopToken) {
      let mainToken = userToken ?? shopToken;
      let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      let newErrors = {};
      if (!emailRegex.test(email)) {
        newErrors.email = 'ایمیل وارد شده اشتباه است';
        setErrors(newErrors);
      }
      if (description?.length < 10) {
        newErrors.description = 'حداقل 10 کاراکتر الزامی است';
        setErrors(newErrors);
      }
      if (emailRegex.test(email) && description.length > 10) {
        setSendLoader(true);
        sendReport({mainToken, email, description})
           .then((response) => {
             console.log(response);
             setEmail('');
             setDescription('');
             toast.success('نظر شما با موفقیت ثبت شد', toastOptions);
             setSendLoader(false);
           })
           .catch((e) =>{
             console.log(e, e.response);
             setEmail('');
             setDescription('');
             toast.error('لطفا مجددا تلاش کنید', toastOptions);
             setSendLoader(false);
           })
      }
    } else {
      toast.error('ابتدا به حساب خود وارد شوید', toastOptions);
    }
  };

  useEffect(() => {
    const script = document.createElement('script');
    const script1 = document.createElement('script');

    script.src = "https://www.aparat.com/embed/PkI5d?data[rnddiv]=62321399343&data[responsive]=yes";
    script1.src = "https://www.aparat.com/embed/EDY07?data[rnddiv]=57822539951&data[responsive]=yes";
    script.async = true;
    script1.async = true;

    document.body.appendChild(script);
    document.body.appendChild(script1);

    return () => {
      document.body.removeChild(script);
      document.body.removeChild(script1);
    }
  }, []);

  return (
    <div className="homeMainContainer">
      <Header />
      <div className="container-fluid firstPart main" ref={container}>
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
              {/*<img alt="magicOff" src={tt} className="cardFrame" />*/}
              <div id="62321399343" className="w-100"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid thirdPart">
        <div className="container inParts eachParts">
          <div className="flex w-100">
            <p className="number fs40">2.</p>
            <h2 className="font-weight-bold text-white fs30">رویای ما برآورده سازی انتظارات شماست</h2>
            <p className="text-white fs18">نمونه خدمات</p>
          </div>
          <div className="eachPartDesc">
            {/*<h4 className="font-weight-bold text-white cpt-7">یک تعامل سازنده بین مشتری و فروشگاه</h4>*/}
            {/*<p className="text-white mt-4 fs16 lh26">بالاترین درصد تخفیفی که برای شما کاربران عزیز جذاب باشه و برای فروشگاه ها هم صرفه اقتصادی داشته باشه رو ما گرفتیم براتون</p>*/}
            {/*<img alt="magicOff" src={arrowWhite} className="arrowReverse d-none d-md-flex" />*/}
            <div className="cardFrameContainer">
              {/*<img alt="magicOff" src={tt12} className="cardFrame" />*/}
              <div id="57822539951" className="w-100"></div>
            </div>
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
              <form autoComplete="off" noValidate={true} className="cardFrame reportBox p-4" onSubmit={(e) => sendReportFn(e)}>
                <div className="d-flex flex-column w90p align-items-start justify-content-center">
                  <label htmlFor="email" className={`transition fs14 mt-4 mb-0 ${focused === 'email' ? 'textMain' : 'textThird'}`}>
                    ایمیل<span style={{color: 'red'}}>{`\xa0*`}</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoFocus={false}
                    required={true}
                    className={`form-control bg-white ${errors['email'] && 'is-invalid'}`}
                    value={email}
                    onChange={changeValue}
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
                    نظر شما<span style={{color: 'red'}}>{`\xa0*`}</span>
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
                  {!sendLoader && <span>ثبت</span>}
                  {sendLoader && <Loader type="ThreeDots" color='white' height={8}/>}
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
  )
};

export default Home;
