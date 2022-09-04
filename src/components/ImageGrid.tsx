import React from "react";
import { FC } from "react";
import styled from "styled-components";
import { ApodImageData } from "../shared/types";
import LoadingImagesWrapper from "./LoadingImagesWrapper";
import ImageTile from "./ImageTile";

const Grid = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 1.5em;
`

interface ImageGridProps {
    apodData: ApodImageData[] | undefined;
}

const ImageGrid: FC<ImageGridProps> = ({ apodData }) => {
    const imageSources = apodData?.map(img => img.url);

    const images = apodData?.map((img) => {
        return <ImageTile key={img.url} url={img.url} title={img.title}></ImageTile>
    })

    return <LoadingImagesWrapper imageSources={imageSources}>
        <Grid>
            {images}
        </Grid>
    </LoadingImagesWrapper>
}

export default ImageGrid