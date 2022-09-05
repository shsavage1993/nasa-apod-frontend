import React from 'react';
import { FC, PropsWithChildren } from 'react';
import styled from 'styled-components';

const Container = styled.div`
    position: relative;
    flex-grow: 1;
    display: flex;

    &.invalid input,
    &.invalid textarea {
        border-color: red;
    }

    &.invalid input:hover + .error,
    &.invalid input:focus + .error,
    &.invalid textarea:hover + .error,
    &.invalid textarea:focus + .error {
        display: block;
        bottom: -1.4em;
        right: 0;
    }

    &.invalid label:hover + .error {
        display: block;
        bottom: -1.4em;
    }
`

const Error = styled.div`
    position: absolute;
    z-index: 1;
    max-width: 100%;
    // margin-top: 0.1rem;
    padding: 0.1rem;
    font-size: .8rem;
    border-radius: 0.375rem;
    background-color: rgba(220,53,69,.9);
    color: white;
    display: none;
    font-weight: 400!important;
`

interface InputErrorWrapperProps extends PropsWithChildren {
    error?: string;
}

export const InputErrorWrapper: FC<InputErrorWrapperProps> = ({
    children,
    error,
}) => {

    return <Container className={error && 'invalid'}>
        {children}
        <Error className='error'>{error}</Error>
    </Container>
};

export default InputErrorWrapper;
