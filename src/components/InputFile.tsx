import React from "react"
import { FC, useState, useRef } from "react"
import styled from "styled-components"
import InputErrorWrapper from "../shared/components/InputErrorWrapper"


const InputDiv = styled.div`
`

const Label = styled.label`
    color: white;
    background-color: black;
    display: inline-block;
    cursor: pointer;

    &.error {
        color: rgb(220,53,69);
    }

    &.success {
        color: rgb(152,251,152);
    }

    & svg {
        width: 1em;
        height: 1em;
        vertical-align: middle;
        fill: currentColor;
        margin-top: -0.25em;
        margin-right: 0.25em;
    }
`

const Input = styled.input`
    opacity: 0;
    position: absolute;
    z-index: -1;

    &:focus + label {
        outline: -webkit-focus-ring-color auto 1px;
    }

    &:focus + label,
    & + label:hover {
        background-color: red;

    & + label * {
        pointer-events: none;
    }
}
`

interface InputFileProps {
    id: string;
    handleChange: (e: React.ChangeEvent<any>) => void;
    error?: string;
}

const InputFile: FC<InputFileProps> = ({ id, handleChange, error }) => {
    const defaultText = 'Upload CV (Optional)'
    const [labelText, setLabelText] = useState(defaultText);

    return <InputDiv>
        <InputErrorWrapper error={error}>
            <Label className={`${error && 'error'} ${(!error && labelText !== defaultText) && 'success'}`} htmlFor={id}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 20 17"><path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z"></path></svg>
                {` ${labelText}`}
            </Label>
        </InputErrorWrapper>
        <Input
            type="file"
            id={id}
            name={id}
            onChange={(event) => {
                handleChange(event)
                const fileName = event.target.value.split('\\').pop();
                if (fileName)
                    setLabelText(fileName)
                else
                    setLabelText(defaultText)
            }}
        />
    </InputDiv>
}

export default InputFile;