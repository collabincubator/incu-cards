import React, {ChangeEvent, useCallback, useState} from 'react';
import {useDispatch} from 'react-redux';
import {loginTC} from '../../../redux/loginReducer/loginReducer';
import styles from './Login.module.scss';
import {NavLink} from 'react-router-dom';
import {
    FormControl,
    IconButton,
    Input,
    InputLabel,
    InputAdornment, Button,
} from '@material-ui/core';
import {Visibility, VisibilityOff} from '@material-ui/icons';

export const Login = (props: any) => {

    let [email, setEmail] = useState('')
    let [pass, setPass] = useState('')
    const dispatch = useDispatch();

    const onClickHandler = () => {
        dispatch(loginTC(email, pass, true))
    }

    const setEmailHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.currentTarget.value)
    }, [email])
    const setPassHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setPass(e.currentTarget.value)
    }, [pass])

    let [isBlind, setIsBlind] = useState(true)

    const eyeToggle = () => {
        setIsBlind(prev => !prev)
    }

    return <div className={styles.container}>
        <div className={styles.box}>
                <div className={styles.inner}>

                    <h1>Cards</h1>
                    <h2>Sign In</h2>
                    <FormControl className={styles.controlInputs}>
                        <InputLabel htmlFor="component-simple">Email</InputLabel>
                        <Input error={false} id={"component-simple"} value={email} onChange={setEmailHandler}/>
                    </FormControl>
                    <FormControl className={styles.controlInputs}>
                        <InputLabel htmlFor={"password"}>Password</InputLabel>
                        <Input
                            color={'primary'}
                            error={false}
                            id={"password"}
                            type={isBlind ? 'text' : 'password'}
                            value={pass}
                            onChange={setPassHandler}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label={"toggle password visibility"}
                                        onClick={eyeToggle}
                                    >
                                        {isBlind ? <Visibility/> : <VisibilityOff/>}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    <div className={styles.forgotBox}>
                        <NavLink className={styles.navLinkForgotBox} to={'/restorepass'} >
                            <span>Forgot Password</span>
                        </NavLink>
                    </div>
                    <Button className={styles.formButtons} variant="contained" color="primary" onClick={onClickHandler} >
                        Primary
                    </Button>
                    <div className={styles.signUpBox}>
                        <p>Don't have an account?</p>
                        <NavLink to={'registration'} className={styles.signUpLink}>
                            <span>Sign Up</span>
                        </NavLink>
                    </div>
                </div>
        </div>
    </div>
}

export default Login;