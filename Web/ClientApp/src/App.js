import './custom.css';
import * as React from 'react';
import {Route, Switch} from 'react-router';
import Home from "./usersArea/pages/home/home.component";
import Layout from "./components/layout/layout.component";
import NoMatch from "./pages/NoMatch";
import LoginRoute from "./components/routes/loginRoutes";
import PrivateRouteUserPanel from "./components/routes/privateRouteUserPanel";
import PrivateRouteShopPanel from "./components/routes/privateRouteShopPanel";
import UserPanelRoute from "./components/routes/userPanelRoute";
import ShopPanelRoute from "./components/routes/shopPanelRoute";
import AdminAreaRoute from './adminArea/routes/adminAreaRoutes';
import AboutUs from "./pages/shared/AboutUs";
import Terms from "./pages/shared/Terms";

export default () => (
   <Layout>
      <Switch>
         <Route exact path='/' component={Home} />
         <Route path='/login' component={LoginRoute} />
         <PrivateRouteUserPanel path='/user-panel' component={UserPanelRoute} />
         <PrivateRouteShopPanel path='/shop-panel' component={ShopPanelRoute} />
         <Route path='/admin' component={AdminAreaRoute} />
         <Route path='/about-us' component={AboutUs} />
         <Route path='/terms' component={Terms} />
         {/*<Route path="*" component={NoMatch}/>*/}
      </Switch>
   </Layout>
);
