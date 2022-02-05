import React, {useEffect, useRef, useState} from 'react';
import {useHistory, Link} from "react-router-dom";
import {getActiveUserPck, getUserQrCode, getDiscountChartData} from "../../../../api/user/main";
import NumberFormat from "react-number-format";
import {toast} from "react-toastify";
import toastOptions from "../../../../../components/ToastOptions";
import Loader from "react-loader-spinner";
import {faRedo, faTimesCircle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import QRCode from 'qrcode.react';
import {qrCodePreUrl} from "../../../../api/imagePreUrl";
import * as UserStore from "../../../../../store/user";
import {useDispatch} from "react-redux";
import {useShallowPickerSelector} from "../../../../../store/selectors";
import * as MainStore from '../../../../../store/main';
import Chart from "chart.js";
import {useAddToHomeScreenPrompt} from "../components/useAddToHomeScreenPrompt";
import CountUp from "react-countup";

const UserDashboard = () => {
   const node1 = useRef(null);
   const history = useHistory();
   const dispatch = useDispatch();
   const [paymentData, setPaymentData] = useState(null);
   const [currentPck, setCurrentPck] = useState(null);
   const [currentPckLoader, setCurrentPckLoader] = useState(0); // 0=false 1=true 2=fetchError
   const [qrId, setQrId] = useState('');
   const [chartLoader, setChartLoader] = useState(false);
   const [qrLoader, setQrLoader] = useState(false);
   const [packDiscount, setPackDiscount] = useState(0);
   const [totalDiscount, setTotalDiscount] = useState(0);
   const userData = useShallowPickerSelector('user', ['userData']);
   const {prompt, promptToInstall} = useAddToHomeScreenPrompt();

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
      getDiscountChartDataFn();
   }, []);

   const getActivePck = () => {
      setCurrentPckLoader(1);
      getActiveUserPck()
         .then((response) => {
            if (response) {
               let {success, result} = response
               if (response === 401) {
                  dispatch(MainStore.actions.setLogoutModal({type: 'user', modal: true}));
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
                  dispatch(MainStore.actions.setLogoutModal({type: 'user', modal: true}));
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

   const getDiscountChartDataFn = () => {
      setChartLoader(true);
      getDiscountChartData()
         .then((response) => {
            console.log(78787, response);
            if (response) {
               let {success, result} = response
               if (response === 401) {
                  dispatch(MainStore.actions.setLogoutModal({type: 'user', modal: true}));
               } else if (success) {
                  renderDiscountChart(result);
                  setPackDiscount(result?.lastPackDiscount);
                  setTotalDiscount(result?.totalDiscount);
                  setChartLoader(false);
               }
            } else {
               toast.error('خطای سرور', toastOptions);
               setChartLoader(false);
            }
            console.log(565656, response);
            // renderDiscountChart();
         })
         .catch((error) => {
            toast.error('خطای سرور', toastOptions);
            setChartLoader(false);
         })
   }

   const renderDiscountChart = (result) => {
      const COLORS = [
         '#4dc9f6',
         '#f67019',
         '#f53794',
         '#537bc4',
         '#acc236',
         '#166a8f',
         '#00a950',
         '#58595b',
         '#8549ba'
      ];
      const data = {
         labels: result?.eachShopBuy?.map((item) => item?.label),
         datasets: [
            {
               label: 'Dataset 1',
               data: result?.eachShopBuy?.map((item) => item?.data),
               backgroundColor: Object.values(COLORS),
            }
         ]
      };
      if (node1?.current) {
         new Chart(node1?.current, {
            type: 'pie',
            data: data,
            options: {
               responsive: true,
               fontFamily: "IranSans",
               legend: {
                  display: true,
                  rtl: true,
                  position: 'bottom',
                  labels: {
                     fontFamily: "IranSans",
                     font: {
                        family: 'IranSans',
                     },
                  }
               },
               maintainAspectRatio: false,
               tooltips: {
                  enabled: true,
                  position: 'nearest',
                  intersect: false,
                  fontFamily: "IranSans",
                  titleFontFamily: 'IranSans',
                  bodyFontFamily: 'IranSans',
                  rtl: true,
                  textDirection: 'rtl',
                  callbacks: {
                     label: (tooltipItems, data) => {
                        return `${data?.labels[tooltipItems?.index]}:\xa0` + (data?.datasets[0]?.data[tooltipItems?.index].toFixed() * 1000).toLocaleString('fa-IR').replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' تومان ';
                     }
                  }
               },
            },
         });
      }
   }

   const closePaymentResult = () => {
      setPaymentData(null);
      history.replace('/user-panel');
   }

   return (
    <div className="d-flex flex-column centered">
       <div className="col-12 d-flex flex-column-reverse flex-lg-row flex-wrap-reverse align-items-start justify-content-between px-0">
          <div className="flex1 col-12 px-1 mt-2 mw550">
             <div className="col-12 card cardPrimary px-0" style={{height: 550}}>
                <div className="card-header bg-transparent">
                   <p className="card-title fs22 my-2">اطلاعیه ها و اخبار</p>
                </div>
                <div className="w-100 h-100 d-flex flex-column centered px-3 py-2">
                   <p className="fs16 text-danger">اخبار جدیدی موجود نمی باشد.</p>
                </div>
             </div>
          </div>
          <div className="flex1 col-12 px-1 w-100 d-flex flex-wrap centered mw550">
             <div className="flex2 w-100 mt-2 cpl1 mw270">
                <div className="col-12 w-100 card cardPrimary px-3" style={{height: 550}}>
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
                            {prompt && <button type="button" className="btn outline submitBtn border-0 d-flex centered fs18"
                                               style={{maxWidth: 300}} onClick={promptToInstall}>
                               ذخیره
                            </button>}
                         </div>
                      )}
                   </div>
                </div>
             </div>
             <div className="flex2 w-100 mt-2 cpr1 mw270">
                <div className="col-12 w-100 card cardPrimary px-3" style={{height: 550}}>
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
          </div>
          {paymentData && <PaymentResult data={paymentData} closePaymentResult={closePaymentResult}/>}
          {/*<div className="col-12 col-md-3 d-flex card cardPrimary px-3 topQrBox" style={{height: 550}}>*/}
          {/*   <div className="card-header bg-transparent">*/}
          {/*      <p className="card-title fs22 my-2">کد QR شما</p>*/}
          {/*   </div>*/}
          {/*   <div className="d-flex centered my-4 mh360">*/}
          {/*      {qrLoader && (*/}
          {/*         <div className="w-100 d-flex centered">*/}
          {/*            <Loader type="ThreeDots" color='#ff521d' height={10} width={70} className="loader"/>*/}
          {/*         </div>*/}
          {/*      )}*/}
          {/*      {!qrLoader && qrId?.length > 0 && (*/}
          {/*         <div className="w-100 d-flex flex-column centered">*/}
          {/*            <QRCode value={qrCodePreUrl(qrId)} renderAs="svg" size={220} level="H" />*/}
          {/*            <button type="button" className="btn outline submitBtn border-0 d-flex centered fs18" style={{maxWidth: 300}}>*/}
          {/*               ذخیره*/}
          {/*            </button>*/}
          {/*         </div>*/}
          {/*      )}*/}
          {/*   </div>*/}
          {/*</div>*/}
       </div>
       <div className="col-12 mt-2 px-1">
          <div className="w-100 card cardPrimary">
             <div className="card-header bg-transparent">
                <p className="card-title fs22 my-2">آمار و اطلاعات خریدها</p>
             </div>
             <div className="d-flex flex-column-reverse flex-lg-row align-items-center justify-content-between h-100">
                <div className="flex position-relative px-3 py-4 w-100 mt-4 mt-lg-0" style={{height: 400}}>
                   <canvas className="w-100 h-100" ref={node1}/>
                </div>
                <div className="flex d-flex flex-column centered mt-4 mt-lg-0">
                   <p className="fs16">میزان تخفیف دریافتی روی پکیج فعلی</p>
                   <CountUp
                      className="mt-1"
                      style={{fontSize: 38}}
                      start={0}
                      end={packDiscount}
                      separator=","
                      duration={1}/>
                </div>
                <div className="flex d-flex flex-column centered mt-4 mt-lg-0">
                   <p className="fs16">میزان تخفیف دریافتی کل</p>
                   <CountUp
                      className="mt-1"
                      style={{fontSize: 38}}
                      start={0}
                      end={totalDiscount}
                      separator=","
                      duration={1}/>
                </div>
             </div>
          </div>
       </div>
    </div>
  );
}

const PaymentResult = ({data, closePaymentResult}) => {
   let {status, code} = data;
   return (
      <div className="w-100">
         {status === 'Succeed' && <div className="alert alert-success d-flex align-items-center justify-content-between" role="alert">
            <div className="d-flex flex-column">
               <h4 className="alert-heading fs18">پرداخت موفق</h4>
               <p className="mt-2 mb-0">تبریک! پرداخت با موفقیت انجام شد.</p>
               <p className="mt-2 mb-0">{`کد پیگیری:\xa0${code}`}</p>
            </div>
            <button type="button" className="btn bg-transparent text-success d-flex centered outline" onClick={closePaymentResult}>
               <FontAwesomeIcon icon={faTimesCircle} className="fs18" />
            </button>
         </div>}
         {status === 'Failed' && <div className="alert alert-danger d-flex align-items-center justify-content-between" role="alert">
            <div className="d-flex flex-column">
               <h4 className="alert-heading fs18">پرداخت ناموفق</h4>
               <p className="mt-2 mb-0">متاسفانه پرداخت ناموفق بود. لطفا مجددا تلاش نمایید.</p>
               <p className="mt-2 mb-0">{`کد پیگیری:\xa0${code}`}</p>
            </div>
            <button type="button" className="btn bg-transparent text-danger d-flex centered outline" onClick={closePaymentResult}>
               <FontAwesomeIcon icon={faTimesCircle} className="fs18" />
            </button>
         </div>}
      </div>
   )
}

export default UserDashboard;
