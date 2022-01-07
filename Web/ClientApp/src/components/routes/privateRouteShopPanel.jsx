import {Redirect, Route} from "react-router";
import React from "react";
import TokenStore from "../../utils/tokenStore";

const PrivateRouteShopPanel = (props) => {
  let {component: Component, ...restProps} = props;
  const shopToken = TokenStore.getShopToken();
  return (
    <Route {...restProps} render={(props) => (
       shopToken ? (
        <Component {...props} />
      ) : (
        <Redirect to={{pathname: '/login', state: {from: props?.location}}}/>
      )
    )}
    />
  )
}

export default PrivateRouteShopPanel;
