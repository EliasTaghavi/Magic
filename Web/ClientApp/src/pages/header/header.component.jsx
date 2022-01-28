import React, {useState} from 'react';
import './header.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
  faBalanceScale, faBars,
  faHome, faInfo,
} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import logo from '../../assets/images/logo.png';

const Header = ({noLogin}) => {
  const [open, setOpen] = useState(false);

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
            </ul>
          </div>
          <button type="button" className="bg-transparent outline d-flex d-md-none align-items-center justify-content-center border-0 mr-4"
                  style={{cursor: 'pointer'}} onClick={() => setOpen(!open)}>
            <FontAwesomeIcon icon={faBars} className="text-dark fs22"/>
          </button>
          <Link to="/">
            <img alt="magicoff.ir" src={logo} className="logo d-md-none" />
          </Link>
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
          <div className="w-100 d-flex centered">
            <img alt="magicoff.ir" src={require('../../assets/images/logo.png')} className="logo"/>
          </div>
          <div className="w-100 px-3 mt-4">
            <hr className="w-100" />
          </div>
          <ul className="nav d-flex flex-column p-0 list-unstyled">
            <li className="text-right px-4" style={{paddingTop: 11, paddingBottom: 11}}>
              <Link to="/" className="text text-dark d-flex align-items-center" style={{fontSize: 14}}>
                <FontAwesomeIcon icon={faHome} className="textMain ml-3" style={{fontSize: 20, width: 25}}/>
                خانه
              </Link>
            </li>
            <li className="text-right px-4" style={{paddingTop: 11, paddingBottom: 11}}>
              <Link to="/terms" className="text text-dark d-flex align-items-center" style={{fontSize: 14}}>
                <FontAwesomeIcon icon={faBalanceScale} className="textMain ml-3" style={{fontSize: 20, width: 25}}/>
                قوانین و مقررات
              </Link>
            </li>
            <li className="text-right px-4" style={{paddingTop: 11, paddingBottom: 11}}>
              <Link to="/about-us" className="text text-dark d-flex align-items-center" style={{fontSize: 14}}>
                <FontAwesomeIcon icon={faInfo} className="textMain ml-3" style={{fontSize: 20, width: 25}}/>
                درباره ما
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Header;
