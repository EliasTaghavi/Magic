export const imagePreUrl = (imageId) => {
	return imageId ? `/ids/${imageId}` : '';
};

export const qrCodePreUrl = (qrId) => {
	return `https://magicoff.ir/shop-panel/${qrId}`
};
