import React, {useCallback, useEffect, useState} from 'react';
import LoginShopValidation from "../../../../components/validations/authShop/loginShopValidation";
import toastOptions from "../../../../components/ToastOptions";
import {toast} from "react-toastify";
import FadeComponent from "../../../../components/shared/fadeComponent/fadeComp.component";
import TokenStore from "../../../../utils/tokenStore";
import {useHistory} from "react-router-dom";
import SignupShopValidation from "../../../../components/validations/authShop/signupShopValidation";
import Loader from "react-loader-spinner";
import {sendShopLoginSms, sendShopLoginCode} from "../../../api/auth/shop";
import * as UserStore from "../../../../store/user";
import {useDispatch} from "react-redux";
import RenderUserWaitingModal from "../user/renderUserWaitingModal";
import SupportModal from "../../../../components/shared/supportModal.component";
// import {sendMobile} from "../../../../../api/auth/auth";

let interval;
let timer;

const LoginShop = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [step, setStep] = useState(1); // 1=mobile 2= code
  const [errors, setErrors] = useState({});
  const [mobile, setMobile] = useState('09123456789');
  const [code, setCode] = useState('');
  const [shopName, setShopName] = useState('');
  const [shopPhone, setShopPhone] = useState('');
  const [shopAddress, setShopAddress] = useState('');
  const [shopPassword, setShopPassword] = useState('');
  const [supportModal, setSupportModal] = useState(false);
  const [focused, setFocused] = useState('');
  const [loader, setLoader] = useState(true);
  const [btnLoader, setBtnLoader] = useState(false);
  const [waitingModal, setWaitingModal] = useState(0); // 0=false - 1=wait on signup - 2=wait in login 3=locked

  useEffect(() => {
    timer = setTimeout(() => {
      setLoader(false);
    }, 250);
    return () => {
      clearTimeout(timer);
    }
  }, []);

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
      case 'mobile':
        setMobile(target.value);
        break;
      case 'code':
        setCode(target.value);
        break;
      case 'shopName':
        setShopName(target.value);
        break;
      case 'shopPhone':
        setShopPhone(target.value);
        break;
      case 'shopAddress':
        setShopAddress(target.value);
        break;
      case 'shopPassword':
        setShopPassword(target.value);
        break;
      default:
        break;
    }
  }

  const sendSms = async () => {
    // await sendMobile(mobile);
  };

  const handleValidate = (e) => {
    e.preventDefault();
    if (step !== 3) {
      let data = {
        mobile,
        code,
        step,
      }
      LoginShopValidation(data)
        .then((response) => {
          if (Object.entries(response).length < 1) {
            if (step === 1) {
              sendSmsFn();
            } else {
              sendCode();
            }
          } else {
            setErrors(response);
            toast.error('لطفا اشکالات بالا را رفع نمایید.', toastOptions)
          }
        })
        .catch(() => {
          toast.error('خطای سرور', toastOptions)
        })
    } else {
      let data = {
        shopName,
        shopPhone,
        shopAddress,
        shopPassword
      }
      SignupShopValidation(data)
        .then((response) => {
          if (Object.entries(response).length < 1) {
            // send data
            TokenStore.setShopToken('token');
            history.push('/shop-panel');
          } else {
            setErrors(response);
            toast.error('لطفا اشکالات بالا را رفع نمایید.', toastOptions)
          }
        })
        .catch((error) => {
          toast.error('خطای سرور', toastOptions)
        })
    }
  }

  const sendSmsFn = () => {
    setBtnLoader(true);
    sendShopLoginSms(mobile)
       .then((response) => {
         let {success} = response;
         console.log(response);
         if (response) {
           if (response === 401) {
             // do nothing but in another api's should logout from system
           } else if (success) {
             setStep(2);
             setBtnLoader(false);
           }
         } else {
           toast.error('خطای سرور', toastOptions);
           setBtnLoader(false);
         }
       })
       .catch(() => {
         toast.error('خطای سرور', toastOptions);
         setBtnLoader(false);
       })
  };
  const resendCode = async () => {
    await sendShopLoginSms(mobile);
  };

  const sendCode = () => {
    setBtnLoader(true);
    sendShopLoginCode({mobile, code})
       .then((response) => {
         console.log(response);
         let {result, success} = response;
         if (response?.code) {
           if (response === 401) {
             // do nothing but in another api's should logout from system
           } else if (response === false) {
             setBtnLoader(false);
             toast.error('خطای سرور', toastOptions);
           } else {
             if (success) {
               if (result?.status !== 4) {
                 if (result?.status === 3) {
                   TokenStore.setShopToken(result?.token);
                   dispatch(UserStore.actions.setUserData({...result?.shop, token: result?.token}));
                   setBtnLoader(false);
                   history.replace('/shop-panel');
                 } else if (result?.status === 6) {
                   setWaitingModal(2);
                 } else {
                   setWaitingModal(3);
                 }
               } else {
                 // setStep(3);
                 // setToken(token);
                 // setBtnLoader(false);
               }
             } else {
               if (response?.result === null) {
                 setBtnLoader(false);
                 toast.error('فروشگاه ثبت نشده است', toastOptions);
               }
             }
           }
         } else {
           setBtnLoader(false);
           toast.error('خطای سرور', toastOptions);
         }
       })
       .catch((error) => {
         console.log(4545, error, error.response);
         setBtnLoader(false);
         toast.error('خطای سرور', toastOptions);
       });
  };

  const resetToHome = () => {
    history.replace('/');
  };

  return (
    <div className={`loginContainer ${step === 2 && 'cpy4'}`}>
      <FadeComponent className="d-flex flex-column centered w-100">
        <form noValidate={true} autoComplete="off" className="loginForm" onSubmit={handleValidate}>
          {step === 1 && (
            <div className="d-flex flex-column align-content-start justify-content-center">
              <label htmlFor="mobile" className={`transition fs14 ${focused === 'mobile' ? 'textMain' : 'textThird'}`}>
                شماره موبایل
              </label>
              <input
                id="mobile"
                name="mobile"
                type="number"
                autoFocus={false}
                required={true}
                className={`form-control input ${errors['mobile'] && 'is-invalid'}`}
                value={mobile}
                maxLength={4}
                onChange={changeValue}
                placeholder="مثال 09123456789"
                onFocus={focusedFn}
                onBlur={unfocusedFn}
              />
            </div>
          )}
          {step === 2 && (
            <div className="codeContainer">
              <label htmlFor="code" className={`transition fs14 ${focused === 'code' ? 'textMain' : 'textThird'}`}>
                {`لطفا کد ارسالی به ${mobile} را وارد کنید`}
              </label>
              <input
                id="code"
                name="code"
                type="number"
                autoFocus={false}
                required={true}
                className={`form-control input ${errors['code'] && 'is-invalid'}`}
                value={code}
                onChange={changeValue}
                maxLength={4}
                placeholder="کد تایید..."
                onFocus={focusedFn}
                onBlur={unfocusedFn}
              />
            </div>
          )}
          {step === 3 && (
            <div>
              <label htmlFor="shopName"
                     className={`transition fs14 mb-0 ${focused === 'shopName' ? 'textMain' : 'textThird'}`}>
                نام فروشگاه
              </label>
              <input
                id="shopName"
                name="shopName"
                type="text"
                autoFocus={false}
                required={true}
                className={`form-control input ${errors['shopName'] && 'is-invalid'}`}
                value={shopName}
                onChange={changeValue}
                placeholder="..."
                onFocus={focusedFn}
                onBlur={unfocusedFn}
              />
              <span className="invalid-feedback mt-2 fs14" style={{
                display: errors['shopName'] ? 'block' : 'none',
              }}>{errors['shopName']}</span>
              <label htmlFor="shopPhone"
                     className={`transition fs14 mt-4 mb-0 ${focused === 'shopPhone' ? 'textMain' : 'textThird'}`}>
                شماره تلفن
              </label>
              <input
                id="shopPhone"
                name="shopPhone"
                type="number"
                autoFocus={false}
                required={true}
                className={`form-control input ${errors['shopPhone'] && 'is-invalid'}`}
                value={shopPhone}
                onChange={changeValue}
                placeholder="..."
                onFocus={focusedFn}
                onBlur={unfocusedFn}
              />
              <span className="invalid-feedback mt-2 fs14" style={{
                display: errors['shopPhone'] ? 'block' : 'none',
              }}>{errors['shopPhone']}</span>
              <label htmlFor="shopPassword"
                     className={`transition fs14 mt-4 mb-0 ${focused === 'shopPassword' ? 'textMain' : 'textThird'}`}>
                کلمه عبور
              </label>
              <input
                id="shopPassword"
                name="shopPassword"
                type="password"
                autoFocus={false}
                required={true}
                className={`form-control input ${errors['shopPassword'] && 'is-invalid'}`}
                value={shopPassword}
                onChange={changeValue}
                placeholder="..."
                onFocus={focusedFn}
                onBlur={unfocusedFn}
              />
              <span className="invalid-feedback mt-2 fs14" style={{
                display: errors['shopPassword'] ? 'block' : 'none',
              }}>{errors['shopPassword']}</span>
              <label id="address" htmlFor="shopAddress"
                     className={`transition fs14 mt-4 mb-0 ${focused === 'shopAddress' ? 'textMain' : 'textThird'}`}>
                آدرس
              </label>
              <textarea
                id="shopAddress"
                name="shopAddress"
                autoFocus={false}
                required={true}
                value={shopAddress}
                className={`form-control text-right addressBox ${errors['shopAddress'] && 'is-invalid'}`}
                onChange={changeValue}
                placeholder="..."
                onFocus={focusedFn}
                onBlur={unfocusedFn}
              />
              <span className="invalid-feedback mt-2 fs14" style={{
                display: errors['shopAddress'] ? 'block' : 'none',
              }}>{errors['shopAddress']}</span>
            </div>
          )}
          {step === 1 && <span className="invalid-feedback mt-2 fs14" style={{
            display: errors['mobile'] ? 'block' : 'none',
          }}>{errors['mobile']}</span>}
          {step === 2 && <span className="invalid-feedback mt-2 fs14" style={{
            display: errors['code'] ? 'block' : 'none',
          }}>{errors['code']}</span>}
          <button type="submit" className="submitBtn border-0">
            {!btnLoader && <span>ثبت</span>}
            {btnLoader && <Loader type="ThreeDots" color='rgba(255, 255, 255, 1)' height={8} width={70} className="loader"/>}
          </button>
          {step === 2 && <Timer resendCode={resendCode} setSupportModal={(value) => setSupportModal(value)}/>}
        </form>
        {step === 2 && (
           <button className="bg-transparent border-0 fs14 text-primary textUnderline"
             onClick={() => {
               setCode('');
               setErrors({});
               setStep(1);
             }}>بازگشت</button>
        )}
        {supportModal && <SupportModal setOpen={() => setSupportModal(false)} />}
        {waitingModal !== 0 && <RenderUserWaitingModal waitingModal={waitingModal} resetToHome={resetToHome} />}
      </FadeComponent>
    </div>
  );
}

const Timer = ({resendCode, setSupportModal}) => {
  const [timer, setTimer] = useState(60);
  const [resendCounter, setResendCounter] = useState(0);

  useEffect(() => {
    timerFn();
    return () => {
      clearInterval(interval);
    }
  }, [timer]);

  const timerFn = useCallback(() => {
    interval = setInterval(() => {
      if (timer > 0) {
        setTimer(timer - 1);
      }
    }, 1000);
  }, [timer])

  return (
    <div className="d-flex w-100 centered my-3">
      {timer > 0 && (
        <div className="mt-3 fs14 p-0">
          <span className="textThird">
            ارسال مجدد تا
          </span>
          <span className="textThird">
            {`\xa0${timer}\xa0`}
          </span>
          <span className="textThird">
            ثانیه دیگر
          </span>
        </div>
      )}
      {timer < 1 && resendCounter >= 1 && (
        <button type="button" className="btn btn-transparent mt-3 outline p-0"
                onClick={() => setSupportModal(true)}>
          <span className="textThird fs14">
            لطفا با پشتیبانی ما تماس حال فرمایید.
          </span>
        </button>
      )}
      {timer < 1 && resendCounter < 1 && (
        <button type="button" className="btn btn-transparent mt-3 outline p-0"
                onClick={() => {
                  setTimer(60);
                  setResendCounter(resendCounter + 1);
                  resendCode();
                }}>
          <span className="textThird fs14">
            ارسال مجدد کد تایید
          </span>
        </button>
      )}
    </div>
  )
}

export default LoginShop;
