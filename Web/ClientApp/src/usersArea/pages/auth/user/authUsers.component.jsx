import React, {useState} from 'react';
import '../../../../assets/main.css';
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHome} from "@fortawesome/free-solid-svg-icons";
import logo from "../../../../assets/images/logo-sm.png";
import LoginUser from "./loginUser.components";

const AuthUsers = () => {
  const [section] = useState(1); // 1=auth 2=signUp

  return (
    <div className="authMainContainer transition">
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
          {section === 1 && <LoginUser />}
        </div>
      </div>
    </div>
  );
}

const MenuItem = ({extraClass}) => {
  return (
    <div className={`topPart ${extraClass}`}>
      <Link to="/" className="d-flex centered text-white text-decoration-none fs12 mt-3">
        <span className="iconContainer">
          <FontAwesomeIcon icon={faHome} className="textMain fs10"/>
        </span>
        <span className="mr-2">خانه</span>
      </Link>
    </div>
  );
}

export default AuthUsers;
