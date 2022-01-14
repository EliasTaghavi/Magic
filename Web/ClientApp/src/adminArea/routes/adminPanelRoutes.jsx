import React from 'react';
import {Route, Switch} from "react-router";
import AdminPanel from "../pages/panel/adminPanel";
import AdminDashboard from "../pages/panel/dashboard/dashboard";
import AdminAllUsers from "../pages/panel/all-users/allUsers";
import AdminPcks from "../pages/panel/pcks/pcks";
import AdminTransactions from "../pages/panel/transactions/adminTransactions";
import AdminShops from "../pages/panel/shops/adminShops";
import AdminRate from "../pages/panel/rate/adminRate";

const AdminPanelRoute = () => {
	return (
		<AdminPanel>
			<Switch>
				<Route path="/admin/panel" exact={true} component={AdminDashboard}/>
				<Route path="/admin/panel/all-users" exact={true} component={AdminAllUsers}/>
				<Route path="/admin/panel/packages" exact={true} component={AdminPcks}/>
				<Route path="/admin/panel/transactions" exact={true} component={AdminTransactions}/>
				<Route path="/admin/panel/shops" exact={true} component={AdminShops}/>
				<Route path="/admin/panel/rate" exact={true} component={AdminRate}/>
			</Switch>
		</AdminPanel>
	);
}

export default AdminPanelRoute;
