import {Redirect, Route} from "react-router";
import React from "react";
import TokenStore from "../../utils/tokenStore";

const PrivateRouteReverse = (props) => {
  let {component: Component, ...restProps} = props;
  const token = TokenStore.getToken();
  const userType = TokenStore.getUserType();
  return (
    <Route {...restProps} render={(props) => (
      !token ? (
        <Component {...props} />
      ) : userType === 'user' ? (
        <Redirect to={{pathname: '/user-panel', state: {from: props?.location}}}/>
      ) : (
        <Redirect to={{pathname: '/shop-panel', state: {from: props?.location}}}/>
      )
    )}
    />
  )
}

export default PrivateRouteReverse;
