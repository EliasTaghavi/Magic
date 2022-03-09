import React from 'react';
import {Carousel} from "react-bootstrap";
import {imagePreUrl} from "../usersArea/api/imagePreUrl";

const MyCarousel = (props) => {
	let images = props.images;
	return (
		<Carousel className="w-100 d-flex bg-light centered" style={{minHeight: 350}}>
			{images?.length > 0 && images.map((item) => {
				return (
					<Carousel.Item key={Math.random().toString()} className="w-100 position-relative">
						<div className="w-100 bgImageBlur" style={{backgroundImage: `url(${imagePreUrl(item)})`, zIndex: 10}}>

						</div>
						<img className="d-block w-100 shopDetailsImage" src={imagePreUrl(item)} alt="magicoff.ir"/>
					</Carousel.Item>
				)
			})}
			{images?.length < 1 && <img
				className="w-100"
				src={require('../assets/images/noImage.png')}
				alt="magicoff.ir"
				style={{height: 290, objectFit: 'contain', minHeight: 290, maxHeight: 290}}
			/>}
		</Carousel>
	)
};

export default MyCarousel;
