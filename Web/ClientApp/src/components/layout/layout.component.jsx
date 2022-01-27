import React, {useEffect, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronUp} from "@fortawesome/free-solid-svg-icons";
import './layout.css';
import {useHistory} from "react-router-dom";
import {useShallowPickerSelector} from "../../store/selectors";
import RenderLoggedOutModal from "../../pages/RenderLoggedOutModal";

const Layout = ({children}) => {
  const history = useHistory();
  const [scrollButton, setScrollButton] = useState(false);
  const [isPanel, setIsPanel] = useState(false);
  const logoutModal = useShallowPickerSelector('main', ['logoutModal']);

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  }

  const scrollFunction = () => {
    if (window.pageYOffset > 150) {
      setScrollButton(true);
    } else {
      setScrollButton(false);
    }
  }

  useEffect(() => {
    // scrollToTop();
    window.addEventListener('scroll', scrollFunction);
    return () => {
      window.removeEventListener('scroll', scrollFunction);
    }
  }, []);

  useEffect(() => {
    setIsPanel(history.location.pathname.includes('panel'));
  }, [history.location.pathname]);

  return (
    <div className="container-fluid p-0 m-0" style={{backgroundColor: 'white', position: 'relative', minHeight: '100vh'}}>
      {children}
      {!isPanel && scrollButton && (
        <button onClick={scrollToTop} className="btn outline centered scrollTopTopButton">
          <FontAwesomeIcon icon={faChevronUp} color="white" fontSize={29}/>
        </button>
      )}
      {logoutModal?.modal && <RenderLoggedOutModal data={logoutModal} />}
    </div>
  );
};

export default Layout;
