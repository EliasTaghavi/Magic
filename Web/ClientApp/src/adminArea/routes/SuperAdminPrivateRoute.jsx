import {Redirect, Route} from "react-router";
import React from "react";
import {useShallowPickerSelector} from "../../store/selectors";

const SuperAdminPrivateRoute = (props) => {
	let {component: Component, ...restProps} = props;
	let adminData = useShallowPickerSelector('user', ['adminData']);
	let roles = adminData?.roles;
	let isSupport = roles?.includes('Support');
	return (
		<Route {...restProps} render={(props) => (
			!isSupport ? (
				<Component {...props} />
			) : (
				<Redirect to={{pathname: '/admin/panel/all-users', state: {from: props?.location}}}/> // fixme
			)
		)}
		/>
	)
}

export default SuperAdminPrivateRoute;
