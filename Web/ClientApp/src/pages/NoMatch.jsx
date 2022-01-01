import React from 'react';

const NoMatch = () => {
	return (
		<div className="d-flex justify-content-center align-items-center flex-column"
				style={{height: '50vh', fontSize: 30, textAlign: 'center'}}>
			<span style={{fontSize: 80}}>404</span>
			<span>متاسفانه صفحه ای با این آدرس پیدا نشد!</span>
			{/*<img src={require('./../Pictures/error-monster.png')} />*/}
		</div>
	);
}

export default NoMatch;
