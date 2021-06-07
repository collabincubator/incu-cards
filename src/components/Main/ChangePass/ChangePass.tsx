import React, {ChangeEvent, useCallback, useState} from 'react';
import {Redirect, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { RestorePassTC } from '../../../redux/changePassReducer/changePassReducer';
import {AppStateType} from "../../../redux/store";
import {FormControl, FormHelperText, IconButton, Input, InputAdornment, InputLabel} from '@material-ui/core';
import {Visibility, VisibilityOff} from '@material-ui/icons';

type PropsType = {
    styles: any
}

const ChangePass: React.FC<PropsType> = ({styles, ...props}) => {
    const [requestNewPass, setRequestNewPass] = useState('');
    const [requestRepeatNewPass, setRequestRepeatNewPass] = useState('');
    const success = useSelector<AppStateType,boolean>(state => state.changePassReducer.successChangePass)
    const error = useSelector<AppStateType,string>(state => state.changePassReducer.error)
    const dispatch = useDispatch()
    const {token} = useParams<{ token: string }>()

    const onClickHandler = () => {
        dispatch(RestorePassTC(requestNewPass,token))
    }

    let [isBlind, setIsBlind] = useState(true)
    let [isBlindRepeat, setIsBlindRepeat] = useState(true)


    const eyeToggle = () => {
        setIsBlind(prev => !prev)
    }

    const eyeRepeatToggle = () => {
        setIsBlindRepeat(prev => !prev)
    }

    const setRequestNewPassHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setRequestNewPass(e.currentTarget.value)
    }, [requestNewPass])

    const setRequestRepeatNewPassHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setRequestRepeatNewPass(e.currentTarget.value)
    }, [requestRepeatNewPass])

    if(success) {
        return <Redirect to={'/login'}/>
    }
    return (
        <>
            <h1>Cards</h1>
            <h2>Sign Up</h2>

            <FormControl className={styles.controlInputs}>
                <InputLabel htmlFor={"password"}>Password</InputLabel>
                <Input
                    color={'primary'}
                    id={"password"}
                    type={isBlind ? 'password' : 'text'}
                    value={requestNewPass}
                    onChange={setRequestNewPassHandler}
                    aria-describedby={'requestNewPass-error'}
                    endAdornment={
                        <InputAdornment position={"end"}>
                            <IconButton
                                aria-label={"toggle password visibility"}
                                onClick={eyeToggle}
                            >
                                {isBlind ? <VisibilityOff/> : <Visibility/>}
                            </IconButton>
                        </InputAdornment>
                    }
                />
            </FormControl>
            <FormControl className={styles.controlInputs}>
                <InputLabel htmlFor={"requestRepeatNewPass"}>Repeat password</InputLabel>
                <Input

                    color={'primary'}
                    id={"requestRepeatNewPass"}
                    type={isBlind ? 'password' : 'text'}
                    value={requestRepeatNewPass}
                    onChange={setRequestRepeatNewPassHandler}
                    aria-describedby={'requestRepeatNewPass-error'}
                    endAdornment={
                        <InputAdornment position={"end"}>
                            <IconButton
                                aria-label={"toggle passwordRepeat visibility"}
                                onClick={eyeRepeatToggle}
                            >
                                {isBlindRepeat ? <VisibilityOff/> : <Visibility/>}
                            </IconButton>
                        </InputAdornment>
                    }
                />
            </FormControl>
            <p>
                Create new password and we will send you further instructions to email
            </p>
            <button className={styles.btn}
                    onClick={onClickHandler}>Create new password
            </button>
            <span>{error}</span>
        </>
    )
}

export default ChangePass;