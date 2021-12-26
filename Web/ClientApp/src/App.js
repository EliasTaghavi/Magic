import './assets/main.css';
import * as React from 'react';
import {Route, Switch} from 'react-router';
import Home from "./pages/home/home.component";
import Layout from "./components/layout/layout.component";
import NoMatch from "./pages/NoMatch";
import LoginRoute from "./components/routes/loginRoutes";
import PrivateRouteReverse from "./components/routes/privateRouteReverse";
import PrivateRouteUserPanel from "./components/routes/privateRouteUserPanel";
import PrivateRouteShopPanel from "./components/routes/privateRouteShopPanel";
import UserPanelRoute from "./components/routes/userPanelRoute";
import ShopPanelRoute from "./components/routes/shopPanelRoute";

export default () => (
   <Layout>
      <Switch>
         <Route exact path='/' component={Home} />
         <PrivateRouteReverse path='/login' component={LoginRoute} />
         <PrivateRouteUserPanel path='/user-panel' component={UserPanelRoute} />
         <PrivateRouteShopPanel path='/shop-panel' component={ShopPanelRoute} />
         <Route path="*" component={NoMatch}/>
      </Switch>
   </Layout>
);
