import React from 'react';
import {Route, Switch} from "react-router";
import AdminPanel from "../pages/panel/adminPanel";
import AdminDashboard from "../pages/panel/dashboard/dashboard";

const AdminPanelRoute = () => {
	return (
		<AdminPanel>
			<Switch>
				<Route path="/admin-panel" exact={true} component={AdminDashboard}/>
			</Switch>
		</AdminPanel>
	);
}

export default AdminPanelRoute;
