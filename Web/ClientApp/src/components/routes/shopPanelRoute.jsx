import React from 'react';
import {Route, Switch} from "react-router";
import Panel from "../../pages/panels/panel.component";
import ShopDashboard from "../../usersArea/pages/panel/shop/shopDashboard.component";
import ShopScannedPublicUser from "../../usersArea/pages/panel/shop/shopScannedPublicUser";

const ShopPanelRoute = () => {
  return (
    <Panel type="shop">
      <Switch>
        <Route path="/shop-panel" exact={true} component={ShopDashboard}/>
        <Route path="/shop-panel/public-user?user-token=:token" component={ShopScannedPublicUser}/>
        {/*<Route path="/panel/users" component={}/>*/}
      </Switch>
    </Panel>
  );
}

export default ShopPanelRoute;
