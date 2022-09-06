import React from 'react';
import { FC, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ApodImageData } from '../shared/types';
import { lowerCaseDashed } from '../shared/functions';
import Image from '../shared/components/Image';
import { MotionDiv } from '../shared/components/MotionDiv';


const DetailsDiv = styled.div`
	display: flex;
	justify-content: space-between;

	// @media (max-width: 1000px) {
	// 	height: calc(100vh - 4em);
	// 	margin: 2em;
	// }
`;

const InfoDiv = styled.div`
	width: 46%;

	// @media (max-width: 1000px) {
	// 	height: calc(100vh - 4em);
	// 	margin: 2em;
	// }
`;

const ImageDiv = styled.div`
	width: 46%;
	aspect-ratio: 4 / 3;

	// @media (max-width: 1000px) {
	// 	height: calc(100vh - 4em);
	// 	margin: 2em;
	// }
`;

const ImgTitle = styled.h2`
	margin-top: 0;
`

interface ImageDetailsProp {
	apodData: ApodImageData[] | undefined
}

const ImageDetails: FC<ImageDetailsProp> = ({ apodData }) => {
	const navigate = useNavigate();
	const { imageTitleParam } = useParams();
	const imageData = apodData?.find(img => lowerCaseDashed(img.title) === imageTitleParam)

	useEffect(() => {
		if (!imageData) {
			navigate("/", { replace: true })
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<MotionDiv>
			<DetailsDiv>
				<InfoDiv>
					<ImgTitle>{imageData?.title}</ImgTitle>
					<p>{imageData?.explanation}</p>
				</InfoDiv>
				<ImageDiv>
					{imageData && <Image url={imageData.url} title={imageData.title}></Image>}
				</ImageDiv>
			</DetailsDiv>
		</MotionDiv>
	);
};

export default ImageDetails;
