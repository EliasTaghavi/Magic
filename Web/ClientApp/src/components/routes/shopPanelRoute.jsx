import React from 'react';
import {Route, Switch} from "react-router";
import UserDashboard from "../../pages/panels/user/dashboard/userDashboard.component";
import Panel from "../../pages/panels/panel.component";

const ShopPanelRoute = () => {
  return (
    <Panel type="shop">
      <Switch>
        {/*<Route path="/shop-panel" exact={true} component={ShopDashboard}/>*/}
        {/*<Route path="/panel/shops" component={}/>*/}
        {/*<Route path="/panel/users" component={}/>*/}
      </Switch>
    </Panel>
  );
}

export default ShopPanelRoute;
