import React, {useEffect, useState} from 'react';
import styles from './fadeComponent.module.css';

const FadeComponent = ({children, className}) => {
	const [fadeOut, setFadeOut] = useState(false);

	useEffect(() => {
		return () => {
			setFadeOut(true);
		};
	}, []);

	return (
		<div className={`${styles.cModalCustomContainer} ${fadeOut ? styles.customVisible : ''} ${className}`}>
			{children}
		</div>
	);
}

export default FadeComponent;
