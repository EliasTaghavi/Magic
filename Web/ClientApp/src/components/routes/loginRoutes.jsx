import React from 'react';
import {Route, Switch} from "react-router";
import '../../assets/main.css';
import Login from '../../usersArea/pages/auth/auth.component';
import AuthShops from '../../usersArea/pages/auth/shop/authShops.component';
import AuthUsers from '../../usersArea/pages/auth/user/authUsers.component';

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
