import {Redirect, Route} from "react-router";
import React from "react";
import TokenStore from "../../utils/tokenStore";

const PrivateRouteReverseShop = (props) => {
  let {component: Component, ...restProps} = props;
  const shopToken = TokenStore.getShopToken();
  return (
    <Route {...restProps} render={(props) => (
      !shopToken ? (
        <Component {...props} />
      ) : (
        <Redirect to={{pathname: '/shop-panel', state: {from: props?.location}}}/>
      )
    )}
    />
  )
}

export default PrivateRouteReverseShop;
