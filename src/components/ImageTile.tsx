import React from "react";
import { FC } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Image from "../shared/components/Image";
import { getEncodedTitle } from "../shared/functions";

interface ImageTileProps {
    url: string;
    title: string;
}

const ImgLink = styled(Link)`
    position: relative;
    width: calc( (100% - 3em) / 3 );
    aspect-ratio: 4 / 3;
    border: 1px solid white;
    box-sizing: border-box;
`

const ImgTitle = styled.div`
    position: absolute;
    bottom: 0px;
	z-index: 1;
    width: 100%;
    overflow: hidden;
    background-color: rgba(0,0,0,0.5);
    color: white;
    padding: 0.5em;
    line-height: 2em;
    max-height: 3em;
    box-sizing: border-box;
    font-size: small;
    transition: max-height 1s ease-out;

    *:hover > & {
        max-height: 100%;
    }
`

const ImageTile: FC<ImageTileProps> = ({ url, title }) => {
    const encodedTitle = getEncodedTitle(title)

    return <ImgLink to={`image/${encodedTitle}`}>
        <ImgTitle>{title}</ImgTitle>
        <Image url={url} title={title} />
    </ImgLink >
}

export default ImageTile;