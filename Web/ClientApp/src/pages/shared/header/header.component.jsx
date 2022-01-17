import React, {useState} from 'react';
import './header.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
  faBalanceScale, faBars,
  faClipboardList, faPhone, faUsers
} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import logo from '../../../assets/images/logo.png';

const Header = ({noLogin}) => {
  const [open, setOpen] = useState(false);
  const [path, setPath] = useState('');

  return (
    <div>
      <div className="headerMainContainer bg">
        <nav className="container-fluid inMainContainer p-0">
          <div className="leftSide d-none d-md-flex">
            <img alt="magicoff.ir" src={logo} className="logo" />
            <ul className="mainMenu m-0 p-0">
              <li>
                <Link to="/" className="menuBtn">
                  خانه
                </Link>
              </li>
              <li>
                <Link to="/terms" className="menuBtn">
                  قوانین و مقررات
                </Link>
              </li>
              <li>
                <Link to="/about-us" className="menuBtn">
                  درباره ما
                </Link>
              </li>
              <li>
                <Link to="/contact-us" className="menuBtn">
                  تماس با ما
                </Link>
              </li>
            </ul>
          </div>
          <button type="button" className="bg-transparent outline d-flex d-md-none align-items-center justify-content-center border-0 mr-4"
                  style={{cursor: 'pointer'}} onClick={() => setOpen(!open)}>
            <FontAwesomeIcon icon={faBars} className="text-dark fs22"/>
          </button>
          <img alt="magicoff.ir" src={logo} className="logo d-md-none" />
          <div className="rightSide">
            {!noLogin && <Link to="/login" className="signUpText bgMain">
              <span className="fs16 text-white d-none d-md-flex">{`ورود\xa0\xa0|\xa0\xa0ثبت نام`}</span>
              <span className="fs16 text-white d-flex d-md-none">ورود</span>
            </Link>}
          </div>
        </nav>
      </div>
      <div className="position-relative w-100 h-100" onClick={(e) => {if (e.target.id === 'drawerFather') setOpen(false)}}>
        <div id="drawerFather" className="DrawerFather p-0 border-0" style={{display: open ? 'flex' : 'none'}}/>
        <div id="drawer" className="Drawer bg-light pt-4" style={open ? {right: 0} : {right: '-80%'}}>
          <img alt="magicoff.ir" src={require('../../../assets/images/wow.png')} className="logo"/>
          <ul className="nav d-flex flex-column p-0 list-unstyled">
            {path !== '' && <li className="text-right px-4" style={{paddingTop: 11, paddingBottom: 11}}>
              <Link to="/" className="text text-dark d-flex align-items-center" style={{fontSize: 14}}>
                <FontAwesomeIcon icon={faClipboardList} className="text-primary ml-3" style={{fontSize: 20}}/>
                خانه
              </Link>
            </li>}
            <li className="text-right px-4" style={{paddingTop: 11, paddingBottom: 11}}>
              <Link to="/terms" className="text text-dark d-flex align-items-center" style={{fontSize: 14}}>
                <FontAwesomeIcon icon={faBalanceScale} className="text-primary ml-3" style={{fontSize: 20}}/>
                قوانین و مقررات
              </Link>
            </li>
            <li className="text-right px-4" style={{paddingTop: 11, paddingBottom: 11}}>
              <Link to="/about-us" className="text text-dark d-flex align-items-center" style={{fontSize: 14}}>
                <FontAwesomeIcon icon={faUsers} className="text-primary ml-3" style={{fontSize: 20}}/>
                درباره ما
              </Link>
            </li>
            <li className="text-right px-4" style={{paddingTop: 11, paddingBottom: 11}}>
              <Link to="/contact-us" className="text text-dark d-flex align-items-center" style={{fontSize: 14}}>
                <FontAwesomeIcon icon={faPhone} className="text-primary ml-3" style={{fontSize: 20}}/>
                تماس با ما
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Header;
