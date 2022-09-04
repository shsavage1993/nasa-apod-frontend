import React from 'react';
import { FC, PropsWithChildren } from 'react';
import { motion } from 'framer-motion';
import useImagesLoaded from '../hooks/useImagesLoaded';
import styled, { keyframes } from 'styled-components';
// import { LinearProgress } from '@material-ui/core';

const flash = keyframes`
	0% { opacity: 0 }
	33% { opacity: 1 }
	70% { opacity: 1 }
	100% { opacity: 0 }
`

const Loader = styled.div`
	animation: ${flash} 1.75s ease-out infinite;
`

interface LoadingImagesWrapperProps extends PropsWithChildren {
	imageSources?: string[];
}

export const LoadingImagesWrapper: FC<LoadingImagesWrapperProps> = ({
	children,
	imageSources = []
}) => {
	const imgsLoaded = useImagesLoaded(imageSources);

	return <>{(imageSources.length > 0 && imgsLoaded) ? <>{children}</> : <Loader>Loading images...</Loader>}</>
};

export default LoadingImagesWrapper;
