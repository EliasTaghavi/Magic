import {Redirect, Route} from "react-router";
import React from "react";
import TokenStore from "../../utils/tokenStore";

const PrivateRouteReverseUser = (props) => {
	let {component: Component, ...restProps} = props;
	const userToken = TokenStore.getUserToken();
	return (
		<Route {...restProps} render={(props) => (
			!userToken ? (
				<Component {...props} />
			) : (
				<Redirect to={{pathname: '/user-panel', state: {from: props?.location}}}/>
			)
		)}
		/>
	)
}

export default PrivateRouteReverseUser;
