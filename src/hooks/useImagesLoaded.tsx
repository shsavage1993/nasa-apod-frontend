import { useState, useEffect } from 'react';

export const useImagesLoaded = (imageSources: string[]) => {
	const [imgsLoaded, setImgsLoaded] = useState(false);

	useEffect(() => {
		setImgsLoaded(false);
		const loadImage = (src: string) => {
			return new Promise((resolve, reject) => {
				const loadImg = new window.Image();
				loadImg.src = src;
				loadImg.onload = () => resolve(src);
				loadImg.onerror = (err) => reject(err);
			});
		};

		Promise.all(imageSources.map((image) => loadImage(image)))
			.then(() => { if (imageSources.length > 0) setImgsLoaded(true) })
			.catch((err) => console.log('Failed to load images', err));
	}, [imageSources]);

	return imgsLoaded;
};

export default useImagesLoaded;
