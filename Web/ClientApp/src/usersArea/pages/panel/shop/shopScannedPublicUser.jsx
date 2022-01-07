import React, {useEffect} from 'react';
import {useHistory} from "react-router-dom";

const ShopScannedPublicUser = () => {
	const history = useHistory();

	useEffect(() => {
		console.log(45555, history);
	}, []);
	return (
		<div>

		</div>
	);
};

export default ShopScannedPublicUser;
