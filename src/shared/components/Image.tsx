import React from "react";
import { FC } from "react";
import styled from "styled-components";

interface ImageProps {
    url: string;
    title: string;
}

const Img = styled.img`
    height: 100%;
    width: 100%;
    object-fit: cover;
`

const Image: FC<ImageProps> = ({ url, title }) => {
    return <Img src={url} alt={title} />
}

export default Image;