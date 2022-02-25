import React from 'react';
import {Route, Switch} from "react-router";
import Panel from "../../usersArea/pages/panel/panel.component";
import ShopDashboard from "../../usersArea/pages/panel/shop/shopDashboard.component";
import ShopAccount from "../../usersArea/pages/panel/shop/account/shopAccount";

const ShopPanelRoute = () => {
  return (
    <Panel type="shop">
      <Switch>
        <Route path="/shop-panel" exact={true} component={ShopDashboard}/>
        <Route path="/shop-panel/account" component={ShopAccount}/>
        <Route path="/shop-panel/:token" component={ShopDashboard}/>
      </Switch>
    </Panel>
  );
}

export default ShopPanelRoute;
