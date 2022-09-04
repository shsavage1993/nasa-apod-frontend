import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import { MotionDiv } from '../shared/components/MotionDiv';

const HeaderDiv = styled.div`
display: flex;
position: sticky;
width: 100%;
margin: 2.5em 0;
justify-content: space-between;
align-items: center;
`

const AppHeading = styled.h1`
    font-weight: bold;
`

const BackButton = styled.button`
    background: white;
    color: black;
    font-family : inherit;
    font-weight: bold;
    padding: 0.5em;
`

const Header: FC = () => {
    const { imageTitleParam } = useParams();

    return (
        <>
            <HeaderDiv>
                <AppHeading>NASA APOD APP</AppHeading>
                {imageTitleParam &&
                    <MotionDiv>
                        <Link to='..'>
                            <BackButton>BACK</BackButton>
                        </Link>
                    </MotionDiv>
                }
            </HeaderDiv>
            <Outlet />
        </>
    )
}

export default Header;