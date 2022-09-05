import React from "react"
import { FC } from "react"
import styled from "styled-components"
import InputErrorWrapper from "./InputErrorWrapper"


const InputDiv = styled.div`
	display: flex;
	align-items: center;
    column-gap: 100px;
`

const Label = styled.label`
    width: 101px;
`

const Input = styled.input`
	margin: 0.25em 0;
	flex-grow: 1;
`

interface InputLabelledProps {
    type?: string;
    id: string;
    label: string;
    handleChange: (e: React.ChangeEvent<any>) => void;
    value?: string | number | readonly string[] | undefined;
    error?: string;
}

const InputLabelled: FC<InputLabelledProps> = ({ type = 'text', id, label, handleChange, value, error }) => {
    return <InputDiv>
        <Label htmlFor={id}>{label}</Label>
        <InputErrorWrapper error={error}>
            <Input
                type={type}
                id={id}
                name={id}
                // placeholder={label}
                onChange={handleChange}
                value={value}
            />
        </InputErrorWrapper>
    </InputDiv>
}

export default InputLabelled;
