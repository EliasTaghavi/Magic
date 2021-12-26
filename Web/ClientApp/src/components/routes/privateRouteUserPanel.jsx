import {Redirect, Route} from "react-router";
import React from "react";
import TokenStore from "../../utils/tokenStore";

const PrivateRouteUserPanel = (props) => {
  let {component: Component, ...restProps} = props;
  const token = TokenStore.getToken();
  const type = TokenStore.getUserType();
  return (
    <Route {...restProps} render={(props) => (
      token ?
        type === 'user' ? (
        <Component {...props} />
      ) : (
        <Redirect to={{pathname: '/shop-panel', state: {from: props?.location}}}/>
      ) : (
        <Redirect to={{pathname: '/login', state: {from: props?.location}}}/>
      )
    )}
    />
  )
}

export default PrivateRouteUserPanel;
