import React from 'react';
import {Route, Switch} from "react-router";
import AdminPanel from "../pages/panel/adminPanel";
import AdminDashboard from "../pages/panel/dashboard/dashboard";
import AdminAllUsers from "../pages/panel/all-users/allUsers";

const AdminPanelRoute = () => {
	return (
		<AdminPanel>
			<Switch>
				<Route path="/admin/panel" exact={true} component={AdminDashboard}/>
				<Route path="/admin/panel/all-users" exact={true} component={AdminAllUsers}/>
			</Switch>
		</AdminPanel>
	);
}

export default AdminPanelRoute;
