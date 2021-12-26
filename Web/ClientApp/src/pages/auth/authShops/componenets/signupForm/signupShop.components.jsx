import React, {useEffect, useState} from 'react';
import './signupShop.css';
import {toast} from "react-toastify";
import toastOptions from "../../../../../components/ToastOptions";
import SignupShopValidation from "../../../../../components/validations/authShop/signupShopValidation";
import FadeComponent from "../../../../../components/shared/fadeComponent/fadeComp.component";

let timer;

const SignupShop = () => {
  const [errors, setErrors] = useState<any>({});
  const [shopName, setShopName] = useState<string>('');
  const [shopPhone, setShopPhone] = useState<string>('');
  const [shopAddress, setShopAddress] = useState<string>('');
  const [shopPassword, setShopPassword] = useState<string>('');
  const [focused, setFocused] = useState('');
  const [loader, setLoader] = useState(true);

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

  const handleValidate = (e) => {
    e.preventDefault();
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
        } else {
          setErrors(response);
          toast.error('لطفا اشکالات بالا را رفع نمایید.', toastOptions)
        }
      })
      .catch((error) => {
        toast.error('خطای سرور', toastOptions)
      })
  }

  if (loader) {
    return null;
  } else {
    return (
      <div className="signupShopContainer cpy4">
        <FadeComponent className="d-flex flex-column centered w-100">
          <form noValidate={true} autoComplete="off" className="signupShopForm" onSubmit={handleValidate}>
            <label htmlFor="shopName" className={`transition fs14 mb-0 ${focused === 'shopName' ? 'textMain' : 'textThird'}`}>
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
            <label htmlFor="shopPhone" className={`transition fs14 mt-4 mb-0 ${focused === 'shopPhone' ? 'textMain' : 'textThird'}`}>
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
            <label htmlFor="shopPassword" className={`transition fs14 mt-4 mb-0 ${focused === 'shopPassword' ? 'textMain' : 'textThird'}`}>
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
            <label id="address" htmlFor="shopAddress" className={`transition fs14 mt-4 mb-0 ${focused === 'shopAddress' ? 'textMain' : 'textThird'}`}>
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
            <button type="submit" className="btn submitBtn outline border-0">
              ثبت
            </button>
          </form>
        </FadeComponent>
      </div>
    );
  }
}

export default SignupShop;
