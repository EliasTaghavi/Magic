import React from 'react';
import {Route, Switch} from "react-router";
import AdminLogin from "../pages/auth/adminLogin";
import AdminPrivateRouteReversePanel from "./adminPrivateRouteReversePanel";
import AdminPrivateRoutePanel from "./adminPrivateRoutePanel";
import AdminPanelRoute from "./adminPanelRoutes";

const AdminAreaRoutes = () => {
	return (
		<Route>
			<Switch>
				<AdminPrivateRouteReversePanel path="/admin" exact={true} component={AdminLogin}/>
				<AdminPrivateRoutePanel path='/admin/panel' component={AdminPanelRoute} />
				{/*<Route path="/panel/shops" component={}/>*/}
				{/*<Route path="/panel/users" component={}/>*/}
			</Switch>
		</Route>
	);
}

export default AdminAreaRoutes;
