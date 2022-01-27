import {Redirect, Route} from "react-router";
import React from "react";
import TokenStore from "../../utils/tokenStore";

const PrivateRouteShopPanel = (props) => {
  let {component: Component, ...restProps} = props;
  const shopToken = TokenStore.getShopToken();
   console.log(props);
   return (
    <Route {...restProps} render={(props) => (
       shopToken ? (
        <Component {...props} />
      ) : (
        <Redirect to={{pathname: '/login/shops', state: {from: props?.location.pathname}}}/>
      )
    )}
    />
  )
}

export default PrivateRouteShopPanel;
