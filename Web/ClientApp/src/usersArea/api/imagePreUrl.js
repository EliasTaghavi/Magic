export const imagePreUrl = (imageId) => {
	return `/ids/${imageId}`
};

export const qrCodePreUrl = (qrId) => {
	return `https://192.168.1.50:3000/shop-panel/public-user?user-token=${qrId}`
};
