import React, {useRef} from 'react';
import Webcam from "react-webcam";
import {Modal} from "react-bootstrap";

const videoConstraints = {
	width: 720,
	height: 720,
	facingMode: "user"
};

const RenderCamera = ({onClose, setScreenShot}) => {
	const webcamRef = useRef(null);

	return (
		<Modal
			size="lg"
			centered={true}
			show={true}
			onHide={onClose}>
			<div className="position-relative d-flex centered rounded overflow-hidden">
				<Webcam
					audio={false}
					height="100%"
					ref={webcamRef}
					screenshotFormat="image/jpeg"
					width="100%"
					videoConstraints={videoConstraints}/>
				<button type="button" className="position-absolute d-flex centered border-0" style={{bottom: 10, width: 60, height: 60, borderRadius: 70, backgroundColor: '#ffffff55'}} onClick={() => {
					setScreenShot(webcamRef?.current?.getScreenshot());
				}}>
					<div style={{width: 40, height: 40, backgroundColor: '#ffffffcc', borderRadius: 50}}></div>
				</button>
			</div>
		</Modal>
	);
};

export default RenderCamera;
