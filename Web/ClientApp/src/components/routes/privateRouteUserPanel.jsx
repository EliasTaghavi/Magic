import {Redirect, Route} from "react-router";
import React from "react";
import TokenStore from "../../utils/tokenStore";

const PrivateRouteUserPanel = (props) => {
  let {component: Component, ...restProps} = props;
  const userToken = TokenStore.getUserToken();
  return (
    <Route {...restProps} render={(props) => (
       userToken ? (
        <Component {...props} />
      ) : (
        <Redirect to={{pathname: '/login', state: {from: props?.location}}}/>
      )
    )}
    />
  )
}

export default PrivateRouteUserPanel;
