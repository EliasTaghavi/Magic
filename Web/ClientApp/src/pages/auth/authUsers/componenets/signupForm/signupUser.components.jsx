import React, {useEffect, useState} from 'react';
import './signupUser.css';
import {toast} from "react-toastify";
import toastOptions from "../../../../../components/ToastOptions";
import SignupUserValidation from "../../../../../components/validations/authUser/signupUserValidation";
import FadeComponent from "../../../../../components/shared/fadeComponent/fadeComp.component";
import DatePicker from 'react-modern-calendar-datepicker';

let timer;

const SignupUser = () => {
  const [errors, setErrors] = useState({});
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthday, setBirthday] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
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
      case 'firstName':
        setFirstName(target.value);
        break;
      case 'lastName':
        setLastName(target.value);
        break;
      case 'password':
        setPassword(target.value);
        break;
      case 'address':
        setAddress(target.value);
        break;
      default:
        break;
    }
  }

  const selectDay = (data) => {
    delete errors['birthday'];
    setBirthday(data)
  };

  const handleValidate = (e) => {
    e.preventDefault();
    let data = {
      firstName,
      lastName,
      birthday,
      password,
      address,
    }
    SignupUserValidation(data)
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
      <div className="signupUserContainer cpy4">
        <FadeComponent className="d-flex flex-column centered w-100">
          <form noValidate={true} autoComplete="off" className="signupUserForm" onSubmit={handleValidate}>
            <div className="d-flex flex-column flex-md-row align-items-start w-100">
              <div className="d-flex flex-column align-items-start justify-content-center w-100 ml-0 ml-md-2">
                <label htmlFor="firstName" className={`transition fs14 mb-0 ${focused === 'firstName' ? 'textMain' : 'textThird'}`}>
                  نام
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
              <div className="d-flex flex-column align-items-start justify-content-center w-100 mt-4 mt-md-0 mr-0 mr-md-2">
                <label htmlFor="lastName" className={`transition fs14 mb-0 ${focused === 'lastName' ? 'textMain' : 'textThird'}`}>
                  نام خانوادگی
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
            </div>
            <div className="d-flex flex-column flex-md-row align-items-start w-100">
              <div className="d-flex flex-column align-items-start justify-content-center w-100 mt-4 ml-0 ml-md-2">
                <label htmlFor="birthday" className={`transition fs14 mb-0 ${focused === 'birthday' ? 'textMain' : 'textThird'}`}>
                  تاریخ تولد
                </label>
                <DatePicker
                  value={birthday}
                  onChange={selectDay}
                  shouldHighlightWeekends
                  calendarClassName="responsive-calendar"
                  locale="fa"
                  inputPlaceholder="..."
                  wrapperClassName="w-100"
                  inputClassName={`text-right fs16 form-control input ${errors['birthday'] && 'is-invalid'}`}
                />
                <span className="invalid-feedback mt-2 fs14" style={{
                  display: errors['birthday'] ? 'block' : 'none',
                }}>{errors['birthday']}</span>
              </div>
              <div className="d-flex flex-column align-items-start justify-content-center w-100 mt-4 mr-0 mr-md-2">
                <label htmlFor="password" className={`transition fs14 mb-0 ${focused === 'password' ? 'textMain' : 'textThird'}`}>
                  کلمه عبور
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoFocus={false}
                  required={true}
                  className={`form-control input ${errors['password'] && 'is-invalid'}`}
                  value={password}
                  onChange={changeValue}
                  placeholder="..."
                  onFocus={focusedFn}
                  onBlur={unfocusedFn}
                />
                <span className="invalid-feedback mt-2 fs14" style={{
                  display: errors['password'] ? 'block' : 'none',
                }}>{errors['password']}</span>
              </div>
            </div>
            <label htmlFor="address" className={`transition fs14 mt-4 mb-0 ${focused === 'address' ? 'textMain' : 'textThird'}`}>
              آدرس
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
            <button type="submit" className="btn submitBtn outline border-0">
              ثبت
            </button>
          </form>
        </FadeComponent>
      </div>
    );
  }
}

export default SignupUser;
