import React, {useState, useEffect} from 'react';
import './userPcks.css';
import {toast} from "react-toastify";
import toastOptions from "../../../../../components/ToastOptions";
import {getPcksData} from "../../../../api/user/pcks";
import NumberFormat from "react-number-format";
import ConfirmBuyPckModal from "./components/confirmBuyPckModal";
import Loader from "react-loader-spinner";
import {useShallowPickerSelector} from "../../../../../store/selectors";

const UserPackages = () => {
  const [bigLoader, setBigLoader] = useState(true);
  const [pcksData, setPcksData] = useState([]);
  const [confirmBuyPckModal, setConfirmBuyPckModal] = useState(null);
   const userData = useShallowPickerSelector('user', ['userData']);

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
          console.log(error, error.response);
          toast.error('خطای سرور', toastOptions);
         setBigLoader(false);
       })
  }, []);

  let disabled = userData?.hasActivePack;

  return (
    <div className="d-flex flex-column centered w-100">
      <div className="card cardPrimary px-3 w-100">
        <div className="card-header bg-transparent d-flex align-items-center justify-content-between">
          <p className="card-title fs22 my-2">اشتراک ها</p>
        </div>
        <div className="card-body w-100 d-flex flex-column px-3 py-5">
          <p className="fs20 text-justify  text-dark">با خرید هریک از اشتراک های زیر، با توجه به مدت زمانی خریداری شده، امکان استفاده با تخفیف از کلیه خدمات فروشگاه های هدف را دارید.</p>
          <div className="d-flex flex-wrap flex-column flex-md-row centered mt-5 ch">
            {!bigLoader && pcksData.length > 0 && pcksData.map((item) => {
              return (
                 <div key={item?.id} className={`shadow ${!disabled ? 'packageContainer' : 'packageContainerNoHover m-3'}`}>
                   <p className={`fs40 textSecondary1 m-0 ${disabled && 'textSilver'}`}>{item?.title}</p>
                   <p className="fs18 textThird m-0 mt-3">{`مدت اعتبار:\xa0${item?.dayCount}\xa0روز`}</p>
                   {/*<p className="fs14 textThird m-0 mt-1">میزان تقاضا: 23%</p>*/}
                   <hr className="w-100 cDivider" />
                   <p className={`fs90 m-0 textSecondary1 text-center cNumber mt-2 ${disabled && 'textSilver'}`}>
                      <NumberFormat value={item?.price / 1000} displayType={'text'} thousandSeparator={true} className="fontSizePreSmall" />
                   </p>
                   <p className="fs18 textThird text-center">هزار تومان</p>
                   {!disabled && <button type="button" disabled={disabled} className="button buyBtn border-0"
                             onClick={() => setConfirmBuyPckModal(item)}>
                      خرید
                   </button>}
                    {disabled && (
                       <div className="button bgSilver border-0 px-2 text-nowrap" style={{cursor: 'not-allowed', backgroundImage: 'none'}}>
                          شما پکیج فعال دارید
                       </div>
                    )}
                 </div>
              );
            })}
            {bigLoader && (
              <div className="d-flex centered">
                 <Loader type="ThreeDots" color='#ff521d' height={15} width={70} className="loader"/>
              </div>
            )}
          </div>
        </div>
      </div>
      {confirmBuyPckModal && <ConfirmBuyPckModal pckDetails={confirmBuyPckModal} onClose={() => setConfirmBuyPckModal(null)} />}
    </div>
  );
}

export default UserPackages;
