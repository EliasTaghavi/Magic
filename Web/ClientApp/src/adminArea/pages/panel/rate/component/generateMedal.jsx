import React from 'react';
import {faMedal} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export const generateMedal = (index) => {
	switch (index) {
		case 0:
			return <FontAwesomeIcon icon={faMedal} className="fs22 textGold" />;
		case 1:
			return <FontAwesomeIcon icon={faMedal} className="fs22 textSilver" />;
		case 2:
			return <FontAwesomeIcon icon={faMedal} className="fs22 textBronze" />;
		case 3:
			return <FontAwesomeIcon icon={faMedal} className="fs22 textBronze1" />;
		default:
			return null;
	}
}
