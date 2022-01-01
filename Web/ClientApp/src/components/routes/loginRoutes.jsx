import React from 'react';
import {Route, Switch} from "react-router";
import Login from '../../pages/auth/auth/auth.component';
import AuthShops from '../../pages/auth/authShops/authShops.component';
import AuthUsers from '../../pages/auth/authUsers/authUsers.component';

const LoginRoute = () => {
  return (
    <Switch>
      <Route path="/login" exact={true} component={Login}/>
      <Route path="/login/shops" component={AuthShops}/>
      <Route path="/login/users" component={AuthUsers}/>
    </Switch>
  );
}

export default LoginRoute;
