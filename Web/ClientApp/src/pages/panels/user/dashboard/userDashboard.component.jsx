import React, {useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";
import {getActiveUserPck} from "../../../../usersArea/api/user/main";

const UserDashboard = () => {
   const history = useHistory();
   const [paymentData, setPaymentData] = useState(null);

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
      getActiveUserPck()
         .then((response) => {

         })
         .catch((error) => {

         });
   };

   console.log(11, paymentData);

   return (
    <div className="card cardPrimary px-3">
      <div className="card-header bg-transparent">
        <p className="card-title fs22 my-2">پکیج فعال شما</p>
      </div>
      <div className="w-100 d-flex align-items-start justify-content-start py-5 px-3">
         {paymentData && <PaymentResult data={paymentData}/>}
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
