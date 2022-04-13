import React from 'react';
import {faUser} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useShallowPickerSelector} from "../../../../../store/selectors";
import {imagePreUrl} from "../../../../api/imagePreUrl";
// import * as profileApi from '../../../../api/user/profile';

const UserProfile = () => {
  const userData = useShallowPickerSelector('user', ['userData']);

  // useEffect(() => {
  //   getUserDetailsFn();
  // }, []);
  //
  // const getUserDetailsFn = () => {
  //   profileApi.getUserDetails()
  //      .then((response) => {
  //        console.log(response);
  //      })
  //      .catch((error) => {
  //        console.log(error, error.response);
  //      })
  // }

  return (
    <div className="d-flex flex-column centered w-100">
      <div className="card cardPrimary px-3 w-100">
        <div className="card-header bg-transparent d-flex align-items-center justify-content-between">
          <p className="card-title fs22 my-2">حساب کاربری</p>
        </div>
        <div className="card-body w-100 d-flex flex-column flex-md-row align-items-center align-items-md-start justify-content-start py-5 px-3">
          <div className="userProfileImage">
            {userData?.selfieURL && <img alt="magicoff.ir" src={imagePreUrl(userData?.selfieURL)} className="userImage"/>}
            {!userData?.selfieURL && <FontAwesomeIcon icon={faUser} className="userIcon textGray"/>}
          </div>
          <div className="d-flex flex-column align-items-start justify-content-start mr-4 mt-5 mt-md-3">
            <div className="d-flex flex-column flex-md-row align-items-start justify-content-start">
              <p className="fs18 textThird">نام: </p>
              <p className="fs20 mr-md-3">{userData?.firstName ?? '-----'}</p>
            </div>
            <div className="d-flex flex-column flex-md-row align-items-start justify-content-start">
              <p className="fs18 textThird">نام خانوادگی: </p>
              <p className="fs20 mr-md-3">{userData?.lastName ?? '-----'}</p>
            </div>
            <div className="d-flex flex-column flex-md-row align-items-start justify-content-start">
              <p className="fs18 textThird">شماره موبایل: </p>
              <p className="fs20 mr-md-3">{userData?.mobile ?? '-----'}</p>
            </div>
            <div className="d-flex flex-column flex-md-row align-items-start justify-content-start">
              <p className="fs18 textThird">تاریخ تولد: </p>
              <p className="fs20 mr-md-3">{userData?.birthday ?? '-----'}</p>
            </div>
            <div className="d-flex flex-column flex-md-row align-items-start justify-content-start">
              <p className="fs18 textThird">آدرس: </p>
              <p className="fs20 mr-md-3">{userData?.address ?? '-----'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
