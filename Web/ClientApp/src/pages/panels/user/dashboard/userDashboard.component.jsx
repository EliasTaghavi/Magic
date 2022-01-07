import React, {useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";
import {getActiveUserPck} from "../../../../usersArea/api/user/main";
import NumberFormat from "react-number-format";
import {toast} from "react-toastify";
import toastOptions from "../../../../components/ToastOptions";
import Loader from "react-loader-spinner";
import {faRecycle, faRedo} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const UserDashboard = () => {
   const history = useHistory();
   const [paymentData, setPaymentData] = useState(null);
   const [currentPck, setCurrentPck] = useState(null);
   const [currentPckLoader, setCurrentPckLoader] = useState(0); // 0=false 1=true 2=fetchError

   useEffect(() => {
      let url = history?.location?.search;
      if (url.includes('?code=')) {
         let data = url.split('&');
         let paymentData = {
           code: data[0]?.replace('?code=', ''),
           status: data[1]?.replace('status=', ''),
         };
         setPaymentData(paymentData);
      }
   }, [history]);

   useEffect(() => {
      getActivePck();
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
               }
            } else {
               toast.error('خطای سرور', toastOptions);
               setCurrentPckLoader(2);
            }
            console.log(response);
         })
         .catch((error) => {
            setCurrentPckLoader(2);
         });
   };

   console.log(11, paymentData);

   return (
    <div className="w-100 d-flex align-items-start justify-content-between">
       <div className="col-9 ml-1 card cardPrimary px-3 h-100">
          <div className="card-header bg-transparent">
             <p className="card-title fs22 my-2">پکیج فعال شما</p>
          </div>
          <div className="w-100 d-flex align-items-start justify-content-start py-5 px-3">
             {paymentData && <PaymentResult data={paymentData}/>}

          </div>
       </div>
       <div className="col-3 mr-1 card cardPrimary px-3">
          <div className="card-header bg-transparent">
             <p className="card-title fs22 my-2">پکیج فعال شما</p>
          </div>
          <div className="d-flex centered my-4">
             {currentPckLoader === 0 && currentPck && <div className="packageContainerNoHover shadow w-100 pckBorder">
                <p className="fs40 textSecondary1 m-0">{currentPck?.title}</p>
                <p className="fs18 textThird m-0 mt-3">{`مدت اعتبار:\xa0${currentPck?.daysCount}\xa0روز`}</p>
                {/*<p className="fs14 textThird m-0 mt-1">میزان تقاضا: 23%</p>*/}
                <hr className="w-100 cDivider"/>
                <p className="fs50 m-0 textSecondary1 text-center cNumber mt-2">
                   <NumberFormat value={currentPck?.price / 1000} displayType={'text'} thousandSeparator={true}
                                 className="fontSizePreSmall"/>
                </p>
                <p className="fs18 textThird text-center">هزار تومان</p>
                <hr className="w-100 cDivider"/>
                <p className="fs18 textThird m-0 mt-2">مدت اعتبار باقی مانده: <span className="textMain fs20 font-weight-bold">{currentPck?.daysRemain}</span> روز</p>
                <p className="fs18 textThird m-0 mt-2">{`تاریخ انقضا:\xa0${currentPck?.endDate}`}</p>
             </div>}
             {currentPckLoader === 0 && !currentPck && (
                <div className="w-100 mh360 d-flex centered">
                   <p className="text-danger">شما پکیج فعال ندارید.</p>
                </div>
             )}
             {currentPckLoader === 1 && (
                <div className="w-100 mh360 d-flex centered">
                   <Loader type="ThreeDots" color='#ff521d' height={10} width={70} className="loader"/>
                </div>
             )}
             {currentPckLoader === 2 && (
                <div className="w-100 mh360 d-flex flex-column centered">
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
