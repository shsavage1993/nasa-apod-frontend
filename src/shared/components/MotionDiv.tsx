import React, { useEffect, useRef } from 'react';
import { FC } from 'react';
import { motion } from 'framer-motion';

export const MotionDiv: FC<React.PropsWithChildren> = (props) => {
	const containerElement = useRef<HTMLDivElement>(null);

	useEffect(() => {
		// display page at top
		if (containerElement.current) {
			containerElement.current.style.display = 'block';
		}
	}, []);

	return (
		<motion.div
			ref={containerElement}
			className="pageContainer"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5 }}
			style={{
				display: 'none',
			}}
		>
			{props.children}
		</motion.div>
	);
};
