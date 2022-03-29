import React from 'react';
import {Route, Switch} from "react-router";
import AdminPanel from "../pages/panel/adminPanel";
import AdminDashboard from "../pages/panel/dashboard/dashboard";
import AdminAllUsers from "../pages/panel/all-users/allUsers";
import AdminPcks from "../pages/panel/pcks/pcks";
import AdminTransactions from "../pages/panel/transactions/adminTransactions";
import AdminShops from "../pages/panel/shops/adminShops";
import AdminRate from "../pages/panel/rate/adminRate";
import AdminUserCodes from '../pages/panel/user-codes/userCodes';
import Reports from "../pages/panel/reports/resports";
import SuperAdminPrivateRoute from "./SuperAdminPrivateRoute";

const AdminPanelRoute = () => {
	return (
		<AdminPanel>
			<Switch>
				<SuperAdminPrivateRoute path="/admin/panel" exact={true} component={AdminDashboard}/>
				<Route path="/admin/panel/all-users" exact={true} component={AdminAllUsers}/>
				<SuperAdminPrivateRoute path="/admin/panel/packages" exact={true} component={AdminPcks}/>
				<SuperAdminPrivateRoute path="/admin/panel/transactions" exact={true} component={AdminTransactions}/>
				<SuperAdminPrivateRoute path="/admin/panel/shops" exact={true} component={AdminShops}/>
				<SuperAdminPrivateRoute path="/admin/panel/rate" exact={true} component={AdminRate}/>
				<SuperAdminPrivateRoute path="/admin/panel/user-codes" exact={true} component={AdminUserCodes}/>
				<SuperAdminPrivateRoute path="/admin/panel/reports" exact={true} component={Reports}/>
			</Switch>
		</AdminPanel>
	);
}

export default AdminPanelRoute;
