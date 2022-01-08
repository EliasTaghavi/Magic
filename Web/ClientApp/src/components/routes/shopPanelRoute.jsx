import React from 'react';
import {Route, Switch} from "react-router";
import Panel from "../../pages/panels/panel.component";
import ShopDashboard from "../../usersArea/pages/panel/shop/shopDashboard.component";

const ShopPanelRoute = () => {
  return (
    <Panel type="shop">
      <Switch>
        <Route path="/shop-panel/:token" exact={true} component={ShopDashboard}/>
        {/*<Route path="/panel/users" component={}/>*/}
      </Switch>
    </Panel>
  );
}

export default ShopPanelRoute;
