import { useState, useEffect } from 'react';
import axios from 'axios';
import { apodDataType, ApodImageData } from '../shared/types';

const useGetApodImageData = () => {
	const [apodImageData, setApodImageData] = useState<ApodImageData[] | undefined>(undefined);

	useEffect(() => {
		const getApodImageData = async () => {
			try {
				const response = await axios.get<apodDataType[]>(
					`https://api.nasa.gov/planetary/apod?api_key=${process.env.REACT_APP_NASA_API_KEY}&count=6&thumbs=true`
				);
				const rawData = response.data;

				const data = rawData?.map(img => {
					let url = '';

					if (img.media_type === 'image') {
						url = img.url
					}
					else if (img.media_type === 'video') {
						url = img.thumbnail_url
					}

					return { url: url, title: img.title, explanation: img.explanation };
				})

				setApodImageData(data);
			} catch (err) {
				console.log(err);
			}
		};

		getApodImageData();
	}, []);

	return apodImageData;
};

export default useGetApodImageData;
