import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHome} from "@fortawesome/free-solid-svg-icons";
import LoginShop from "./loginShop.components";
import {useHistory} from "react-router";
import logo from '../../../../assets/images/logo.png';

const AuthShops = () => {
  const [section, setSection] = useState(1); // 1=auth 2=signUp

  const history = useHistory();
  console.log(history);

  return (
    <div className="mainContainer transition">
      <div className="whiteAreaVertical d-flex transition">
        <div className="topSide transition">
          <MenuItem extraClass="horizontalize" />
          <img alt="magicOff.ir" src={logo} className="loginLogo d-flex"/>
          <div className="btnsContainer">
            <div className="newAuthBtn">
              <p className="textMain m-0">ورود / ثبت نام</p>
            </div>
          </div>
        </div>
        <div className={`bottomSide transition ${section === 1 ? 'mH1' : 'mH2'}`}>
          {section === 1 && <LoginShop />}
        </div>
      </div>
    </div>
  );
}

const MenuItem = ({extraClass}) => {
  return (
    <div className={`topPart ${extraClass}`}>
      <Link to="/" className="d-flex centered text-white text-decoration-none fs12 mt-3">
        خانه
        <span className="iconContainer">
          <FontAwesomeIcon icon={faHome} className="textMain fs10"/>
        </span>
      </Link>
    </div>
  );
}

export default AuthShops;
