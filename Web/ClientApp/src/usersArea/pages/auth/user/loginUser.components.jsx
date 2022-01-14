import React, {useCallback, useEffect, useState} from 'react';
import LoginUserValidation from "../../../../components/validations/authUser/loginUserValidation";
import toastOptions from "../../../../components/ToastOptions";
import {toast} from "react-toastify";
import FadeComponent from "../../../../components/shared/fadeComponent/fadeComp.component";
import TokenStore from '../../../../utils/tokenStore';
import {useHistory} from "react-router-dom";
import DatePicker from "react-modern-calendar-datepicker";
import SignupUserValidation from "../../../../components/validations/authUser/signupUserValidation";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Resizer from 'react-image-file-resizer';
import SupportModal from "../../../../components/shared/supportModal.component";
import {sendUserLoginSms, sendUserLoginCode, signupUser} from '../../../api/auth/user';
import Loader from 'react-loader-spinner';
import RenderProgressBarModal from "../../../../components/shared/renderProgressBarModal";
import RenderUserWaitingModal from "./renderUserWaitingModal";
import {useDispatch} from "react-redux";
import * as UserStore from '../../../../store/user';
import {checkReferralCode} from "../../../api/auth/user";

let interval;
let timer;

export const maximumDate = {
  year: 1400,
  month: 10,
  day: 6,
}

const LoginUser = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [step, setStep] = useState(1); // 1=mobile 2=code 3=signup
  const [errors, setErrors] = useState({});
  const [mobile, setMobile] = useState('09137658795');
  const [btnLoader, setBtnLoader] = useState(false);
  const [code, setCode] = useState('');
  const [firstName, setFirstName] = useState('شهاب');
  const [lastName, setLastName] = useState('طالبی');
  const [birthday, setBirthday] = useState('');
  const [address, setAddress] = useState('خیابان ابوذر');
  const [supportModal, setSupportModal] = useState(false);
  const [focused, setFocused] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [referralCodeLoader, setReferralCodeLoader] = useState(false);
  const [loader, setLoader] = useState(true);
  const [image, setImage] = useState('');
  const [selfiImage, setSelfiImage] = useState('');
  const [imagePreviewUrl, setImagePreviewUrl] = useState('');
  const [selfiImagePreviewUrl, setSelfiImagePreviewUrl] = useState('');
  const [token, setToken] = useState('');
  const [progressBarModal, setProgressBarModal] = useState(false);
  const [resultData, setResultData] = useState('');
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

  const selectDay = (data) => {
    delete errors['birthday'];
    setBirthday(data)
  };

  const sendImage = async (e, type) => {
    let newErrors = errors;
    if (type === 'selfi') {
      if (e.target.files && e.target.files[0]) {
        // if (e.target.files[0].size / 1024 < 500) {
        delete errors['selfiImage'];
        setErrors({...errors, newErrors});

        let reader = new FileReader();
        let data = e.target.files[0];
        let blobName = data.name;
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
            'JPG',
            100,
            0,
            uri => {
              uri.lastModifiedDate = new Date();
              uri.name = blobName;
              reader.readAsDataURL(uri);
              setSelfiImage(uri);
            },
            'blob'
          );
          Resizer.imageFileResizer(
            data,
            width,
            height,
            'JPG',
            100,
            0,
            uri => {
              setSelfiImagePreviewUrl(uri);
            },
            'base64'
          );
        };
      }
    } else {
      if (e.target.files && e.target.files[0]) {
        // if (e.target.files[0].size / 1024 < 500) {
        delete errors['image'];
        setErrors({...errors, newErrors});

        let reader = new FileReader();
        let data = e.target.files[0];
        let blobName = data.name;
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
            'JPG',
            100,
            0,
            uri => {
              uri.lastModifiedDate = new Date();
              uri.name = blobName;
              reader.readAsDataURL(uri);
              setImage(uri);
            },
            'blob'
          );
          Resizer.imageFileResizer(
            data,
            width,
            height,
            'JPG',
            100,
            0,
            uri => {
              setImagePreviewUrl(uri);
            },
            'base64'
          );
        };
      }
    }
  }

  const removeImage = (type) => {
    if (type === 'selfi') {
      setSelfiImagePreviewUrl('');
      setSelfiImage('');
    } else {
      setImagePreviewUrl('');
      setImage('');
    }
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
      case 'firstName':
        setFirstName(target.value);
        break;
      case 'lastName':
        setLastName(target.value);
        break;
      case 'address':
        setAddress(target.value);
        break;
      case 'referralCode':
        setResultData('');
        setReferralCode(target.value);
        break;
      default:
        break;
    }
  }

  const handleValidate = (e) => {
    e.preventDefault();
    if (step !== 3) {
      let data = {
        mobile,
        code,
        step,
      }
      LoginUserValidation(data)
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
        firstName,
        lastName,
        birthday,
        image,
        selfiImage,
        address,
        token,
        referralCode,
      }
      SignupUserValidation(data)
         .then((response) => {
           if (Object.entries(response).length < 1) {
             sendSignupUserData(data);
           } else {
             setErrors(response);
             setBtnLoader(false);
             setProgressBarModal(false);
             toast.error('لطفا اشکالات بالا را رفع نمایید.', toastOptions)
           }
         })
         .catch((e) => {
           setBtnLoader(false);
           setProgressBarModal(false);
           toast.error('خطای سرور', toastOptions)
         })
    }
  }

  const sendSmsFn = () => {
    setBtnLoader(true);
    sendUserLoginSms(mobile)
       .then((response) => {
         console.log(response);
         let {success} = response;
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
    await sendUserLoginSms(mobile);
  };

  const sendCode = () => {
    setBtnLoader(true);
    sendUserLoginCode({mobile, code})
       .then((response) => {
         console.log(response);
         let {result: {token, status}, success} = response;
         if (response) {
           if (response === 401) {
             // do nothing but in another api's should logout from system
           } else if (success) {
             if (status !== 4) {
               if (status === 3) {
                 TokenStore.setUserToken(token);
                 dispatch(UserStore.actions.setUserData(response.result));
                 setBtnLoader(false);
                 history.replace('/user-panel');
               } else if (status === 6) {
                 setWaitingModal(2);
               } else {
                 setWaitingModal(3);
               }
             } else {
               setStep(3);
               setToken(token);
               setBtnLoader(false);
             }
           }
         } else {
           toast.error('خطای سرور', toastOptions);
           setBtnLoader(false);
         }
       })
       .catch(() => {
         setBtnLoader(false);
         toast.error('خطای سرور', toastOptions);
       });
  };

  const sendSignupUserData = (data) => {
    setBtnLoader(true);
    setProgressBarModal(true);
    signupUser(data)
       .then((response) => {
         let {success} = response;
         if (response) {
           if (response === 401) {
             // do nothing but in another api's should logout from system
           } else if (success) {
             setWaitingModal(1);
             setBtnLoader(false);
             setProgressBarModal(false);
           }
         } else {
           toast.error('خطای سرور', toastOptions);
           setBtnLoader(false);
           setProgressBarModal(false);
         }
       })
       .catch((e) => {
         toast.error('خطای سرور', toastOptions);
         setBtnLoader(false);
         setProgressBarModal(false);
       })
  };

  const resetToHome = () => {
    history.replace('/');
  };

  const checkReferralCodeFn = () => {
    setReferralCodeLoader(true);
    checkReferralCode({code: referralCode})
       .then((response) => {
         console.log(response);
         let {success, result} = response;
         if (response) {
           if (response === 401) {
             // do nothing but in another api's should logout from system
           } else if (success) {
             setResultData(result);
             setReferralCodeLoader(false);
           } else {
             setResultData('1');
             setReferralCodeLoader(false);
           }
         } else {
           toast.error('خطای سرور', toastOptions);
           setReferralCodeLoader(false);
         }
       })
       .catch(() => {
         toast.error('خطای سرور', toastOptions);
         setReferralCodeLoader(false);
       })
  };

  return (
    <div className={`loginContainer ${step === 2 && 'cpy4'}`}>
      <FadeComponent className="d-flex flex-column centered w-100">
        <form noValidate={true} autoComplete="off" className="loginForm" onSubmit={handleValidate}>
          {step === 1 && (
            <div className="d-flex flex-column align-content-start justify-content-center">
              <label htmlFor="mobile" className={`transition fs14 ${focused === 'mobile' ? 'textMain' : 'textThird'}`}>
                شماره موبایل<span style={{color: 'red'}}>{`\xa0*`}</span>
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
              <span className="invalid-feedback mt-2 fs14" style={{
                display: errors['mobile'] ? 'block' : 'none',
              }}>{errors['mobile']}</span>
            </div>
          )}
          {step === 2 && (
            <div className="codeContainer">
              <label htmlFor="code" className={`transition fs14 ${focused === 'code' ? 'textMain' : 'textThird'}`}>
                {`لطفا کد ارسالی به ${mobile} را وارد کنید`}<span style={{color: 'red'}}>{`\xa0*`}</span>
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
              <span className="invalid-feedback mt-2 fs14" style={{
                display: errors['code'] ? 'block' : 'none',
              }}>{errors['code']}</span>
            </div>
          )}
          {step === 3 && (
            <div className="w-100">
              <div className="d-flex flex-column align-items-start justify-content-center w-100">
                <label htmlFor="firstName" className={`transition fs14 mb-0 ${focused === 'firstName' ? 'textMain' : 'textThird'}`}>
                  نام<span style={{color: 'red'}}>{`\xa0*`}</span>
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  autoFocus={false}
                  required={true}
                  className={`form-control input ${errors['firstName'] && 'is-invalid'}`}
                  value={firstName}
                  onChange={changeValue}
                  placeholder="..."
                  onFocus={focusedFn}
                  onBlur={unfocusedFn}
                />
                <span className="invalid-feedback mt-2 fs14" style={{
                  display: errors['firstName'] ? 'block' : 'none',
                }}>{errors['firstName']}</span>
              </div>
              <div className="d-flex flex-column align-items-start justify-content-center w-100 mt-4">
                <label htmlFor="lastName" className={`transition fs14 mb-0 ${focused === 'lastName' ? 'textMain' : 'textThird'}`}>
                  نام خانوادگی<span style={{color: 'red'}}>{`\xa0*`}</span>
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  autoFocus={false}
                  required={true}
                  className={`form-control input ${errors['lastName'] && 'is-invalid'}`}
                  value={lastName}
                  onChange={changeValue}
                  placeholder="..."
                  onFocus={focusedFn}
                  onBlur={unfocusedFn}
                />
                <span className="invalid-feedback mt-2 fs14" style={{
                  display: errors['lastName'] ? 'block' : 'none',
                }}>{errors['lastName']}</span>
              </div>
              <div className="d-flex flex-column align-items-start justify-content-center w-100 mt-4">
                <label htmlFor="birthday" className={`transition fs14 mb-0 ${focused === 'birthday' ? 'textMain' : 'textThird'}`}>
                  تاریخ تولد<span style={{color: 'red'}}>{`\xa0*`}</span>
                </label>
                <DatePicker
                  value={birthday}
                  onChange={selectDay}
                  shouldHighlightWeekends
                  calendarClassName="responsive-calendar"
                  locale="fa"
                  inputPlaceholder="..."
                  maximumDate={maximumDate}
                  wrapperClassName="w-100"
                  inputClassName={`text-right fs16 form-control input ${errors['birthday'] && 'is-invalid'}`}
                />
                <span className="invalid-feedback mt-2 fs14" style={{
                  display: errors['birthday'] ? 'block' : 'none',
                }}>{errors['birthday']}</span>
              </div>
              <label htmlFor="address" className={`transition fs14 mt-4 ${focused === 'address' ? 'textMain' : 'textThird'}`}>
                آدرس<span style={{color: 'red'}}>{`\xa0*`}</span>
              </label>
              <textarea
                id="address"
                name="address"
                autoFocus={false}
                required={true}
                value={address}
                className={`form-control text-right addressBox ${errors['address'] && 'is-invalid'}`}
                onChange={changeValue}
                placeholder="..."
                onFocus={focusedFn}
                onBlur={unfocusedFn}
              />
              <span className="invalid-feedback mt-2 fs14" style={{
                display: errors['address'] ? 'block' : 'none',
              }}>{errors['address']}</span>
              <div className="d-flex flex-column align-items-start justify-content-center w-100 mt-4">
                <label htmlFor="selfiImage" className="transition fs14 mb-0 textThird">
                  عکس سلفی<span style={{color: 'red'}}>{`\xa0*`}</span>
                </label>
                <div id="selfiImage" className="w-100 d-flex align-items-center justify-content-center rounded p-0 mt-2">
                  <button type="button" className="w-100 btn loginUpload outline mt-2" onClick={() => document?.getElementById('getSelfiImage')?.click()}>
                    انتخاب
                  </button>
                  <input type="file" id="getSelfiImage" accept="image/jpg" className="form-control d-none" onChange={(e) => sendImage(e, 'selfi')}/>
                </div>
                <span className="textThird fs14 mt-2 mr-2">فقط پرونده ها با فرمت jpg را بارگذاری نمایید.</span>
                {errors['selfiImage'] && <span className="mt-2 mr-2 text-danger">{errors['selfiImage']}</span>}
                {selfiImagePreviewUrl && <div className="w-100 d-flex flex-row align-items-start justify-content-start position-relative mt-3">
                <img alt="ezsaze" src={selfiImagePreviewUrl} className="loginImage"/>
                <button type="button" className="removeImageBtnUserLogin" onClick={() => removeImage('selfi')}>
                  <FontAwesomeIcon icon={faTimes} color="red"/>
                </button>
              </div>}
              </div>
              <div className="d-flex flex-column align-items-start justify-content-center w-100 mt-4">
                <label htmlFor="image" className="transition fs14 mb-0 textThird">
                  شغل (اختیاری)
                </label>
                <div id="image" className="w-100 d-flex align-items-center justify-content-center rounded p-0 mt-2">
                  <button type="button" className="w-100 btn loginUpload outline mt-2" onClick={() => document?.getElementById('getImage')?.click()}>
                    انتخاب
                  </button>
                  <input type="file" id="getImage" accept="image/jpg" className="form-control d-none" onChange={(e) => sendImage(e, 'image')}/>
                </div>
                <span className="textThird fs14 mt-2 mr-2">فقط پرونده ها با فرمت jpg را بارگذاری نمایید.</span>
                {errors['image'] && <span className="mt-2 mr-2 text-danger">{errors['image']}</span>}
                {imagePreviewUrl && <div className="w-100 d-flex flex-row align-items-start justify-content-start position-relative mt-3">
                  <img alt="ezsaze" src={imagePreviewUrl} className="loginImage"/>
                  <button type="button" className="removeImageBtnUserLogin" onClick={() => removeImage('image')}>
                    <FontAwesomeIcon icon={faTimes} color="red"/>
                  </button>
                </div>}
              </div>
              <div className="w-100 mt-5" style={{height: 1, backgroundColor: '#ff521d55'}} />
              <div className="flex-column align-items-start justify-content-end w-100 my-5">
                <label htmlFor="referralCode" className={`transition fs16 noWrapText mb-0 ${focused === 'referralCode' ? 'textMain' : 'textThird'}`}>
                  کد معرف
                </label>
                <div className="w-100 d-flex centered">
                  <input
                     id="referralCode"
                     name="referralCode"
                     type="text"
                     autoFocus={false}
                     required={true}
                     className={`form-control input ${resultData && resultData !== '1' ? 'is-valid border-success' : resultData === '1' ? 'is-invalid' : ''}`}
                     value={referralCode}
                     onChange={changeValue}
                     placeholder="..."
                     onFocus={focusedFn}
                     onBlur={unfocusedFn}
                  />
                  <button type="button" className="btn bgMain border-0 text-white fs12 mr-3" onClick={() => checkReferralCodeFn()}>
                    {!referralCodeLoader && <span>بررسی</span>}
                    {referralCodeLoader && <Loader type="ThreeDots" color='rgba(255, 255, 255, 1)' height={5} width={70} className="loader"/>}
                  </button>
                </div>
                {resultData && resultData !== '1' && <p className="fs12 text-success mt-1">{`فروشگاه\xa0${resultData}`}</p>}
                {resultData === '1' && <p className="fs12 text-danger mt-1">کد نامعتبر است</p>}
              </div>
            </div>
          )}
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
        {progressBarModal && <RenderProgressBarModal />}
        {waitingModal !== 0 && <RenderUserWaitingModal waitingModal={waitingModal} resetToHome={resetToHome} />}
      </FadeComponent>
    </div>
  );
}

const Timer = ({resendCode, setSupportModal}) => {
  const [timer, setTimer] = useState(5);
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
                  setTimer(5);
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

export default LoginUser;
