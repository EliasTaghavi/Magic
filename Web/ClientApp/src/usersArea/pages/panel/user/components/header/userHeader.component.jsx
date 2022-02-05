import React, {useState, useLayoutEffect} from 'react';
import '../../../components/css/panelHeader.css';
import {Link, useHistory} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
  faBars,
  faUser,
  faHome,
  faUserAlt,
  faSignOutAlt,
  faList, faCubes
} from "@fortawesome/free-solid-svg-icons";
import TokenStore from "../../../../../../utils/tokenStore";
import Divider from "../../../../../../components/divider";
import logo from '../../../../../../assets/images/logo-sm.png';
import * as UserStore from "../../../../../../store/user";
import {useDispatch} from "react-redux";

const UserHeader = ({children, type}) => {
  const token = TokenStore.getUserToken();
   const [open, setOpen] = useState(false);
   const [isLg, setIsLg] = useState(window?.innerWidth >= 768);

   useLayoutEffect(() => {
      window.addEventListener('resize', updateSize);
      return () => {
         window.removeEventListener('resize', updateSize);
      }
   }, []);

   const updateSize = () => {
      if (window?.innerWidth < 768) {
         setIsLg(false);
      } else {
         setIsLg(true);
      }
   };

  return (
     <div className="w-100">
        {isLg && <div className="d-none d-md-flex">
           <MdDrawer token={token} open={open} setOpen={setOpen} type={type}/>
           <div className="flex" style={{overflowX: 'auto'}}>
              <div className="userHeaderMainNav shadow1 sticky-top" style={{height: 63}}>
                 <div className="d-flex align-items-center justify-content-start h-100">
                    <button type="button"
                            className="bg-transparent outline d-flex align-items-center justify-content-center border-0 mr-4 text-secondary"
                            style={{cursor: 'pointer'}} onClick={() => setOpen(!open)}>
                       <FontAwesomeIcon icon={faBars} style={{fontSize: 22}}/>
                    </button>
                    <div className="d-flex align-items-center">
                       <Link to={type === 'shop' ? 'shop-panel' : '/user-panel'}
                             className="text-secondary fontSize4 pr-4 text-decoration-none fs18 noWrapText">
                          مجیک آف
                       </Link>
                    </div>
                 </div>
                 <div className="logoContainer">
                    <img alt="magicOff" src={logo} className="logo"/>
                 </div>
              </div>
              <div className="bg-light panelGlobalContainer">
                 {children}
              </div>
           </div>
        </div>}
        {!isLg && <div className="position-relative d-flex d-md-none" onClick={(e) => {
           if (e.target.id === 'drawerFather') {
              setOpen(false);
           }
        }}>
           <div id="drawerFather" className="DrawerFather p-0 border-0 z1022"
                style={{display: open ? 'flex' : 'none'}}/>
           <div className="d-flex flex-column w-100 align-items-start justify-content-start">
              <div className="userHeaderMainNav shadow1 sticky-top" style={{height: 63}}>
                 <div className="d-flex align-items-center justify-content-start h-100">
                    <button type="button"
                            className="bg-transparent outline d-flex align-items-center justify-content-center border-0 mr-4 text-secondary"
                            style={{cursor: 'pointer'}} onClick={() => setOpen(!open)}>
                       <FontAwesomeIcon icon={faBars} style={{fontSize: 22}}/>
                    </button>
                    <div className="d-flex align-items-center">
                       <Link to={type === 'shop' ? 'shop-panel' : '/user-panel'}
                             className="text-secondary fontSize4 pr-4 text-decoration-none fs18 noWrapText">
                          مجیک آف
                       </Link>
                    </div>
                 </div>
                 <div className="logoContainer">
                    <img alt="magicOff" src={logo} className="logo"/>
                 </div>
              </div>
              <div className="bg-light panelGlobalContainer">
                 {children}
              </div>
           </div>
           <div id="drawer" className="d-flex panelDrawer sticky-top" style={open ? {right: 0} : {right: '-100%'}}>
              <Drawer token={token} open={open} setOpen={setOpen} type={type} extraClassName="d-flex"/>
           </div>
        </div>}
     </div>
  );
}

const MdDrawer = ({token, extraClassName, open, setOpen, type}) => {
  return (
    <div className={`userPanelDrawer pt-3 transition sticky-top ${open ? 'w280' : 'w60'} ${extraClassName}`}>
      <div className="d-flex centered px-2">
        <div className="d-flex align-items-center justify-content-center userLogo bg-light">
          <FontAwesomeIcon icon={faUser} className="text-dark"/>
        </div>
        <span className={`text-white transition mr-3 noWrapText ${open ? '' : 'opacity0'}`}>{token ? 'نام کاربری' : 'شما خارج شدید'}</span>
      </div>
      <Divider />
       {type === 'shop' ? (
          <MenuItemsShop open={open} setOpen={setOpen}/>
       ) : (
          <MenuItemsUser open={open} setOpen={setOpen}/>
       )}
    </div>
  );
}

const Drawer = ({token, extraClassName, open, setOpen, type}) => {
  return (
    <div className={`userPanelDrawer pt-3 transition sticky-top w280 ${extraClassName}`}>
      <div className="d-flex centered px-2">
        <div className="d-flex align-items-center justify-content-center userLogo bg-light">
          <FontAwesomeIcon icon={faUser} className="text-dark"/>
        </div>
        <span className="text-white transition mr-3 noWrapText">{token ? 'نام کاربری' : 'شما خارج شدید'}</span>
      </div>
      <Divider />
       {type === 'shop' ? (
         <MenuItemsShop open={open} setOpen={setOpen} noOpacity={true} />
       ) : (
          <MenuItemsUser open={open} setOpen={setOpen}/>
       )}
    </div>
  );
}


const MenuItemsUser = ({open, setOpen, noOpacity}) => {
  const history = useHistory();
   const dispatch = useDispatch();
  const logout = () => {
    TokenStore.removeUserToken();
    dispatch(UserStore.actions.setUserData(null));
    history.replace('/');
  }

  return (
    <ul className="list-unstyled p-0 w-100 customScrollbar mb-0" style={{overflowX: 'hidden', overflowY: 'auto'}}>
      <li className="userMenuItem rounded" onClick={() => setOpen(false)}>
        <Link to="/user-panel" className="userMenuLink cpx-12">
          <FontAwesomeIcon icon={faHome} className="fs18"/>
          <span className={`nav-link my-1 transition noWrapText ${!noOpacity && !open ? 'opacity0' : ''}`}>داشبورد</span>
        </Link>
      </li>
      <li className="userMenuItem rounded" onClick={() => setOpen(false)}>
        <Link to="/user-panel/packages" className="userMenuLink cpx-12">
          <FontAwesomeIcon icon={faCubes} className="fs18"/>
          <span className={`nav-link my-1 transition noWrapText ${!noOpacity && !open ? 'opacity0' : ''}`}>پکیج ها</span>
        </Link>
      </li>
      <li className="userMenuItem rounded" onClick={() => setOpen(false)}>
        <Link to="/user-panel/transactions" className="userMenuLink cpx-12">
          <FontAwesomeIcon icon={faList} className="fs18"/>
          <span className={`nav-link my-1 transition noWrapText ${!noOpacity && !open ? 'opacity0' : ''}`}>تراکنش ها</span>
        </Link>
      </li>
      <Divider />
      <li className="userMenuItem rounded" onClick={() => setOpen(false)}>
        <Link to="/user-panel/profile" className="userMenuLink cpx-12">
          <FontAwesomeIcon icon={faUserAlt} className="fs18"/>
          <span className={`nav-link my-1 transition noWrapText ${!noOpacity && !open ? 'opacity0' : ''}`}>حساب کاربری</span>
        </Link>
      </li>
      <li className="userMenuItem rounded" onClick={() => setOpen(false)}>
        <button type="button" className="border-0 outline bg-transparent userMenuLink cpx-12" onClick={() => logout()}>
          <FontAwesomeIcon icon={faSignOutAlt} className="fs18"/>
          <span className={`nav-link my-1 transition noWrapText ${!noOpacity && !open ? 'opacity0' : ''}`}>خروج</span>
        </button>
      </li>
    </ul>
  );
}

const MenuItemsShop = ({open, setOpen}) => {
   const history = useHistory();
   const dispatch = useDispatch();
   const logout = () => {
      TokenStore.removeShopToken();
      dispatch(UserStore.actions.setShopData(null));
      history.replace('/');
   }
   return (
      <ul className="list-unstyled p-0 w-100">
         <li className="menuItem rounded" onClick={() => setOpen(false)}>
            <Link to="/shop-panel" className="menuLink cpx-12">
               <FontAwesomeIcon icon={faHome} className="fs18"/>
               <span className={`nav-link my-1 transition ${open ? '' : 'opacity0'}`}>داشبورد</span>
            </Link>
         </li>
         <Divider />
         <li className="menuItem rounded" onClick={() => setOpen(false)}>
            <Link to="/shop-panel" className="menuLink cpx-12">
               <FontAwesomeIcon icon={faUserAlt} className="fs18"/>
               <span className={`nav-link my-1 transition ${open ? '' : 'opacity0'}`}>حساب کاربری</span>
            </Link>
         </li>
         <li className="menuItem rounded" onClick={() => setOpen(false)}>
            <button type="button" className="border-0 outline bg-transparent menuLink cpx-12" onClick={logout}>
               <FontAwesomeIcon icon={faSignOutAlt} className="fs18"/>
               <span className={`nav-link my-1 transition ${open ? '' : 'opacity0'}`}>خروج</span>
            </button>
         </li>
      </ul>
   );
}

export default UserHeader;
