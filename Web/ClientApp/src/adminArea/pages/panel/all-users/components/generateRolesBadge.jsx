import React from 'react';

const generateRoleBadge = (roles) => {
	const colors = ['#529f18', '#c68107', '#0990c6', '#bf06e9', '#aab50a'];
	return roles.map((item) => {
		if (item === 'بالای بالا') {
			return <span className="badge font-weight-normal fs14 text-white mx-1" style={{backgroundColor: colors[0]}}>{item}</span>;
		} else if (item === 'مدیر سیستم') {
			return <span className="badge font-weight-normal fs14 text-white mx-1" style={{backgroundColor: colors[1]}}>{item}</span>
		} else if (item === 'کاربر') {
			return <span className="badge font-weight-normal fs14 text-white mx-1" style={{backgroundColor: colors[2]}}>{item}</span>
		} else if (item === 'پشتیبان') {
			return <span className="badge font-weight-normal fs14 text-white mx-1" style={{backgroundColor: colors[3]}}>{item}</span>
		} else {
			return <span className="badge font-weight-normal fs14 text-white mx-1" style={{backgroundColor: colors[4]}}>{item}</span>
		}
	});
};

export default generateRoleBadge;
