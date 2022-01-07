import React from 'react';
import {Route, Switch} from "react-router";
import UserDashboard from "../../pages/panels/user/dashboard/userDashboard.component";
import Panel from "../../pages/panels/panel.component";
import UserProfile from "../../pages/panels/user/userProfile/userProfile.component";
import UserTransactions from "../../pages/panels/user/transactions/userTransactions.component";
import UserPackages from "../../pages/panels/user/pcks/userPcks.component";

const UserPanelRoute = () => {
  return (
    <Panel type="user">
      <Switch>
        <Route path="/user-panel" exact={true} component={UserDashboard}/>
        <Route path="/user-panel/profile" component={UserProfile}/>
        <Route path="/user-panel/transactions" component={UserTransactions}/>
        <Route path="/user-panel/packages" component={UserPackages}/>
      </Switch>
    </Panel>
  );
}

export default UserPanelRoute;
