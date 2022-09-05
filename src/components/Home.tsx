import React from 'react';
import { FC } from 'react';
import ImageGrid from './ImageGrid';
// import styled from 'styled-components';
import { ApodImageData } from '../shared/types';
import { ContactForm } from './ContactForm';
import styled from 'styled-components';
import { MotionDiv } from '../shared/components/MotionDiv';

// const HomeDiv = styled.div`
// 	border: 3px solid black;
// 	border-radius: 1%;
// 	flex-grow: 1;
// 	height: calc(100vh - 6em);
// 	margin: 3em;
// 	display: flex;
// 	justify-content: center;
// 	align-items: center;

// 	@media (max-width: 1000px) {
// 		height: calc(100vh - 4em);
// 		margin: 2em;
// 	}
// `;
const Sep = styled.div`
	height: 4em;
`

interface HomeProps {
	apodData: ApodImageData[] | undefined;
}

const Home: FC<HomeProps> = ({ apodData }) => {
	return (
		<MotionDiv>
			<ImageGrid apodData={apodData} />
			<Sep />
			<ContactForm />
		</MotionDiv>
	);
}

export default Home;
