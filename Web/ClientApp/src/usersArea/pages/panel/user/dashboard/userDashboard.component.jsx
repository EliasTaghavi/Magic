import React, {useEffect, useState} from 'react';
import {useHistory, Link} from "react-router-dom";
import {getActiveUserPck, getUserQrCode} from "../../../../api/user/main";
import NumberFormat from "react-number-format";
import {toast} from "react-toastify";
import toastOptions from "../../../../../components/ToastOptions";
import Loader from "react-loader-spinner";
import {faRedo} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import QRCode from 'qrcode.react';
import {qrCodePreUrl} from "../../../../api/imagePreUrl";
import * as UserStore from "../../../../../store/user";
import {useDispatch} from "react-redux";
import {useShallowPickerSelector} from "../../../../../store/selectors";

const UserDashboard = () => {
   const history = useHistory();
   const dispatch = useDispatch();
   const [paymentData, setPaymentData] = useState(null);
   const [currentPck, setCurrentPck] = useState(null);
   const [currentPckLoader, setCurrentPckLoader] = useState(0); // 0=false 1=true 2=fetchError
   const [qrId, setQrId] = useState('');
   const [qrLoader, setQrLoader] = useState(false);
   const userData = useShallowPickerSelector('user', ['userData']);

   useEffect(() => {
      let url = history?.location?.search;
      if (url.includes('?code=')) {
         let data = url.split('&');
         let paymentData = {
           code: data[0]?.replace('?code=', ''),
           status: data[1]?.replace('status=', ''),
         };
         setPaymentData(paymentData);
         dispatch(UserStore.actions.setUserData({...userData, hasActivePack: true}));
      }
   }, [history]);

   useEffect(() => {
      getActivePck();
      getQrCode();
   }, []);

   const getActivePck = () => {
      setCurrentPckLoader(1);
      getActiveUserPck()
         .then((response) => {
            if (response) {
               let {success, result} = response
               if (response === 401) {
                  // do nothing but in another api's should logout from system
               } else if (success) {
                  setCurrentPck(result);
                  setCurrentPckLoader(0);
               } else {
                  setCurrentPck(result);
                  setCurrentPckLoader(0);
               }
            } else {
               toast.error('خطای سرور', toastOptions);
               setCurrentPckLoader(2);
            }
         })
         .catch(() => {
            toast.error('خطای سرور', toastOptions);
            setCurrentPckLoader(2);
         });
   };

   const getQrCode = () => {
      setQrLoader(true);
      getUserQrCode()
         .then((response) => {
            if (response) {
               let {success, result} = response
               if (response === 401) {
                  // do nothing but in another api's should logout from system
               } else if (success) {
                  setQrId(result);
                  setQrLoader(false);
               }
            } else {
               toast.error('خطای سرور', toastOptions);
               setQrLoader(false);
            }
         })
         .catch(() => {
            toast.error('خطای سرور', toastOptions);
            setQrLoader(false);
         });
   };

   return (
    <div className="col-12 d-flex flex-column flex-md-row align-items-start justify-content-between pr-0">
       <div className="w-100 d-flex d-md-none col-12 col-md-3 mx-1 card cardPrimary px-3" style={{height: 550}}>
          <div className="card-header bg-transparent">
             <p className="card-title fs22 my-2">کد QR شما</p>
          </div>
          <div className="d-flex centered my-4 mh360">
             {qrLoader && (
                <div className="w-100 d-flex centered">
                   <Loader type="ThreeDots" color='#ff521d' height={10} width={70} className="loader"/>
                </div>
             )}
             {!qrLoader && qrId?.length > 0 && (
                <div className="w-100 d-flex flex-column centered">
                   <QRCode value={qrCodePreUrl(qrId)} renderAs="svg" size={250} level="H" />
                   <button type="button" className="btn outline submitBtn border-0 d-flex centered fs18" style={{maxWidth: 300}}>
                      ذخیره
                   </button>
                </div>
             )}
          </div>
       </div>
       <div className="col-12 col-md-6 ml-0 ml-md-1 card cardPrimary px-0" style={{height: 550}}>
          <div className="card-header bg-transparent">
             <p className="card-title fs22 my-2">پنل کاربری</p>
          </div>
          <div className="w-100 d-flex align-items-start justify-content-start py-5 px-3">
             {paymentData && <PaymentResult data={paymentData}/>}
          </div>
       </div>
       <div className="w-100 d-none d-md-flex col-12 col-md-3 my-3 my-md-0 card cardPrimary px-3" style={{height: 550}}>
          <div className="card-header bg-transparent">
             <p className="card-title fs22 my-2">کد QR شما</p>
          </div>
          <div className="d-flex centered my-4 mh360">
             {qrLoader && (
                <div className="w-100 d-flex centered">
                   <Loader type="ThreeDots" color='#ff521d' height={10} width={70} className="loader"/>
                </div>
             )}
             {!qrLoader && qrId?.length > 0 && (
                <div className="w-100 d-flex flex-column centered">
                   <QRCode value={qrCodePreUrl(qrId)} renderAs="svg" size={250} level="H" />
                   <button type="button" className="btn outline submitBtn border-0 d-flex centered fs18" style={{maxWidth: 300}}>
                      ذخیره
                   </button>
                </div>
             )}
          </div>
       </div>
       <div className="col-12 col-md-3 mr-1 card cardPrimary px-3" style={{height: 550}}>
          <div className="card-header bg-transparent">
             <p className="card-title fs22 my-2">پکیج فعال شما</p>
          </div>
          <div className="d-flex centered my-4 mh360">
             {currentPckLoader === 0 && currentPck && <div className="packageContainerNoHover shadow w-100 pckBorder">
                <p className="fs34 textSecondary1 m-0">{currentPck?.title}</p>
                <p className="fs14 textThird m-0 mt-2">{`مدت اعتبار:\xa0${currentPck?.daysCount}\xa0روز`}</p>
                {/*<p className="fs14 textThird m-0 mt-1">میزان تقاضا: 23%</p>*/}
                <hr className="w-100 cDivider"/>
                <NumberFormat value={currentPck?.price / 1000} displayType={'text'} thousandSeparator={true}
                              className="fs60 m-0 textSecondary1 text-center cNumber mt-1" style={{height: 80}}/>
                <p className="fs14 textThird text-center">هزار تومان</p>
                <hr className="w-100 cDivider"/>
                <p className="fs14 textThird m-0 mt-1">مدت اعتبار باقی مانده: <span className="textMain fs20 font-weight-bold">{currentPck?.daysRemain}</span> روز</p>
                <p className="fs14 textThird m-0 mt-1">{`تاریخ انقضا:\xa0${currentPck?.endDate}`}</p>
             </div>}
             {currentPckLoader === 0 && !currentPck && (
                <div className="w-100 d-flex flex-column centered">
                   <p className="textMain fs16">شما پکیج فعال ندارید.</p>
                   <Link to="/user-panel/packages" className="btn border-0 bgMain text-white fs16">
                      خرید پکیج
                   </Link>
                </div>
             )}
             {currentPckLoader === 1 && (
                <div className="w-100 d-flex centered">
                   <Loader type="ThreeDots" color='#ff521d' height={10} width={70} className="loader"/>
                </div>
             )}
             {currentPckLoader === 2 && (
                <div className="w-100 d-flex flex-column centered">
                   <p className="text-danger fs16">دریافت اطلاعات با مشکل مواجه شد</p>
                   <button type="button" className="btn btn-outline-danger" onClick={() => getActivePck()}>
                      <FontAwesomeIcon icon={faRedo} className="fs12 ml-2" />
                      <span className="fs14">تلاش مجدد</span>
                   </button>
                </div>
             )}
          </div>
       </div>
    </div>
  );
}

const PaymentResult = ({data}) => {
   let {status, code} = data;
   return (
      <div className="w-100">
         {status === 'Succeed' && <div className="alert alert-success" role="alert">
            <h4 className="alert-heading">پرداخت موفق</h4>
            <p className="mt-3">تبریک! پرداخت با موفقیت انجام شد.</p>
            <p className="mt-3">{`کد پیگیری:\xa0${code}`}</p>
         </div>}
         {status === 'Failed' && <div className="alert alert-danger" role="alert">
            <h4 className="alert-heading">پرداخت ناموفق</h4>
            <p className="mt-3">متاسفانه پرداخت ناموفق بود. لطفا مجددا تلاش نمایید.</p>
            <p className="mt-3">{`کد پیگیری:\xa0${code}`}</p>
         </div>}
      </div>
   )
}

export default UserDashboard;
