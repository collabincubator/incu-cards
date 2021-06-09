import React, {ChangeEvent, FC, useState} from 'react'
import {IconButton, Input, InputAdornment} from "@material-ui/core";
import {Visibility, VisibilityOff} from "@material-ui/icons";

interface inputType {
    color?: "primary" | "secondary"
    id:string
    value:string
    onChange:(e:ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void
    position:'end'|'start'
    name?:string
}
export const FormikCustomInput:FC<inputType> = ({id,value,color,onChange,position,name}) => {
    let [isBlind, setIsBlind] = useState(true)
    const eyeToggle = () => {
        setIsBlind(!isBlind)
    }

    return (
        <Input
            color={color}
            id={id}
            type={isBlind ? 'password' : 'text'}
            value={value}
            name={name ? name : id}
            onChange={onChange}
            endAdornment={
                <InputAdornment position={position}>
                    <IconButton
                        aria-label={"toggle password visibility"}
                        onClick={eyeToggle}
                    >
                        {isBlind ? <VisibilityOff/> : <Visibility/>}
                    </IconButton>
                </InputAdornment>
            }
        />
    )
}
