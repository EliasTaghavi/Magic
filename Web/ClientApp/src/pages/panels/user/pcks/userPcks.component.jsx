import React, {useState, useEffect} from 'react';
import './userPcks.css';
import {toast} from "react-toastify";
import toastOptions from "../../../../components/ToastOptions";
import {getPcksData} from "../../../../usersArea/api/user/pcks";

const UserPackages = () => {
  const [bigLoader, setBigLoader] = useState(false);
  const [pcksData, setPcksData] = useState([]);

  useEffect(() => {
    getPcksData()
       .then((response) => {
         if (response) {
           let {success, result: {items}} = response
           if (response === 401) {
             // do nothing but in another api's should logout from system
           } else if (success) {
             setPcksData(items);
             setBigLoader(false);
           }
         } else {
           toast.error('خطای سرور', toastOptions);
           setBigLoader(false);
         }
       })
       .catch((error) => {
         toast.error('خطای سرور', toastOptions);
         setBigLoader(false);
       })
  }, []);

  return (
    <div className="d-flex flex-column centered w-100">
      <div className="card cardPrimary px-3 w-100">
        <div className="card-header bg-transparent d-flex align-items-center justify-content-between">
          <p className="card-title fs22 my-2">اشتراک ها</p>
        </div>
        <div className="card-body w-100 d-flex flex-column px-3 py-5">
          <p className="fs20 text-justify">با خرید هریک از اشتراک های زیر، با توجه به مدت زمانی خریداری شده، امکان استفاده با تخفیف از کلیه خدمات فروشگاه های هدف را دارید.</p>
          <div className="d-flex flex-wrap flex-column flex-md-row centered mt-5 ch">
            {!bigLoader && pcksData.length > 0 && pcksData.map((item) => {
              console.log(item);
              return (
                 <div key={null} className="packageContainer shadow">
                   <p className="fs30 textSecondary1 m-0">هفتگی</p>
                   <p className="fs14 textThird m-0 mt-1">میزان تقاضا: 23%</p>
                   <hr className="w-100 cDivider" />
                   <p className="fs50 m-0 textSecondary1 text-center cNumber mt-2">53</p>
                   <p className="fs18 textThird text-center">هزار تومان</p>
                   <div className="button buyBtn">
                     خرید
                   </div>
                 </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserPackages;
