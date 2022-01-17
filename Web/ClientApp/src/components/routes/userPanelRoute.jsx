import React from 'react';
import {Route, Switch} from "react-router";
import UserDashboard from "../../usersArea/pages/panel/user/dashboard/userDashboard.component";
import Panel from "../../usersArea/pages/panel/panel.component";
import UserProfile from "../../usersArea/pages/panel/user/userProfile/userProfile.component";
import UserTransactions from "../../usersArea/pages/panel/user/transactions/userTransactions.component";
import UserPackages from "../../usersArea/pages/panel/user/pcks/userPcks.component";

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
