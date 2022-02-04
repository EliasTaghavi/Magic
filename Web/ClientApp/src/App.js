import './custom.css';
import * as React from 'react';
import {Route, Switch} from 'react-router';
import Home from "./pages/home.component";
import Layout from "./components/layout/layout.component";
import LoginRoute from "./components/routes/loginRoutes";
import PrivateRouteUserPanel from "./components/routes/privateRouteUserPanel";
import PrivateRouteShopPanel from "./components/routes/privateRouteShopPanel";
import UserPanelRoute from "./components/routes/userPanelRoute";
import ShopPanelRoute from "./components/routes/shopPanelRoute";
import AdminAreaRoute from './adminArea/routes/adminAreaRoutes';
import AboutUs from "./pages/AboutUs";
import Terms from "./pages/Terms";
import ShopDetails from "./pages/shopDetails";

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
         <Route path='/shop-details/:name/:id' component={ShopDetails} />
         {/*<Route path="*" component={NoMatch}/>*/}
      </Switch>
   </Layout>
);
