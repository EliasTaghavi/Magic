import React from 'react';

const generateRoleBadge = (roles) => {
	const colors = ['#529f18', '#c68107', '#0990c6', '#bf06e9', '#aab50a'];
	return roles.forEach((item) => {
		let role = item?.role;
		if (role = '') {
			return <span className="" style={{color: colors[0]}}>{item}</span>;
		} else if (role === '') {
			return <span className="" style={{color: colors[1]}}>{item}</span>
		} else if (role === '') {
			return <span className="" style={{color: colors[2]}}>{item}</span>
		} else if (role === '') {
			return <span className="" style={{color: colors[3]}}>{item}</span>
		} else {
			return <span className="" style={{color: colors[4]}}>{item}</span>
		}
	});
};

export default generateRoleBadge;
