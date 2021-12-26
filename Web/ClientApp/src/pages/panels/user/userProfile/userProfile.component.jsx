import React from 'react';
import './userProfile.css';
import {faUser} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const UserProfile = () => {
  const user = {};
  return (
    <div className="d-flex flex-column centered w-100">
      <div className="card cardPrimary px-3 w-100">
        <div className="card-header bg-transparent d-flex align-items-center justify-content-between">
          <p className="card-title fs22 my-2">حساب کاربری</p>
          <button type="button" className="btn btn-outline-secondary fs14">
            <span className="d-none d-md-flex">ویرایش حساب کاربری</span>
            <span className="d-flex d-md-none">ویرایش</span>
          </button>
        </div>
        <div className="card-body w-100 d-flex flex-column flex-md-row align-items-center align-items-md-start justify-content-start py-5 px-3">
          <div className="userProfileImage">
            {user?.image && <img alt="magicoff.ir" src={undefined} className="userProfileImage"/>}
            {!user?.image && <FontAwesomeIcon icon={faUser} className="userIcon textGray"/>}
          </div>
          <div className="d-flex flex-column align-items-start justify-content-start mr-4 mt-5 mt-md-3">
            <div className="d-flex flex-column flex-md-row align-items-start justify-content-start">
              <p className="fs18 textThird">نام: </p>
              <p className="fs20 mr-md-3">شهاب</p>
            </div>
            <div className="d-flex flex-column flex-md-row align-items-start justify-content-start">
              <p className="fs18 textThird">نام خانوادگی: </p>
              <p className="fs20 mr-md-3">طالبی</p>
            </div>
            <div className="d-flex flex-column flex-md-row align-items-start justify-content-start">
              <p className="fs18 textThird">شماره موبایل: </p>
              <p className="fs20 mr-md-3">09123456789</p>
            </div>
            <div className="d-flex flex-column flex-md-row align-items-start justify-content-start">
              <p className="fs18 textThird">تاریخ تولد: </p>
              <p className="fs20 mr-md-3">1370/08/08</p>
            </div>
            <div className="d-flex flex-column flex-md-row align-items-start justify-content-start">
              <p className="fs18 textThird">آدرس: </p>
              <p className="fs20 mr-md-3">رفسنجان - خیابان ابوذر - حدفاصل ابوذر 33 - 35</p>
            </div>
          </div>
        </div>
      </div>
      <div className="card cardPrimary px-3 w-100 mt-4">
        <div className="card-header bg-transparent d-flex align-items-center justify-content-between">
          <p className="card-title fs22 my-2">سایر موارد</p>
          <button type="button" className="btn btn-outline-secondary fs14">
            ویرایش
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
