import {Redirect, Route} from "react-router";
import React from "react";
import TokenStore from "../../utils/tokenStore";

const AdminPrivateRoutePanel = (props) => {
	let {component: Component, ...restProps} = props;
	const token = TokenStore.getAdminToken();
	return (
		<Route {...restProps} render={(props) => (
			token ? (
					<Component {...props} />
				) : (
					<Redirect to={{pathname: '/admin-login', state: {from: props?.location}}}/>
				)
		)}
		/>
	)
}

export default AdminPrivateRoutePanel;
