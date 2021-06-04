import React, {ChangeEvent, useCallback, useEffect, useReducer, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {loginTC} from '../../../redux/loginReducer/loginReducer';
import {NavLink, Redirect} from 'react-router-dom';
import {
    FormControl,
    IconButton,
    Input,
    InputLabel,
    InputAdornment, Button, FormHelperText,
} from '@material-ui/core';
import {Visibility, VisibilityOff} from '@material-ui/icons';
import {useFormik} from 'formik';
import {AppStateType} from '../../../redux/store';

type PropsType = {
    styles: any
}

export const Login: React.FC<PropsType> = ({styles, ...props}) => {

    let [email, setEmail] = useState('')
    let [pass, setPass] = useState('')
    const dispatch = useDispatch();
    const isLoggedIn = useSelector<AppStateType, boolean>(state => state.loginReducer.isLoggedIn);
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

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validate: values => {
            if (!values.email) {
                return {
                    email: 'email is required'
                }
            }
            if (!values.password) {
                return {
                    password: 'password is required'
                }
            }
        },
        onSubmit: values => {
            dispatch(loginTC(values.email, values.password))
        }
    })

    if (isLoggedIn) {
        return <Redirect to={'/profile'}/>
    }
    return(
        <>
            <h1>Cards</h1>
            <h2>Sign In</h2>
            <form onSubmit={formik.handleSubmit}>
                <FormControl {...formik.getFieldProps('email')}
                             error={!!formik.errors.email}
                             className={styles.controlInputs}>
                    <InputLabel htmlFor="email">Email</InputLabel>
                    <Input id={"email"} value={email} onChange={setEmailHandler} aria-describedby={'email-error'}/>
                    {!!formik.errors.email && <FormHelperText id="email-error">{formik.errors.email}</FormHelperText>}
                </FormControl>
                <FormControl {...formik.getFieldProps('password')}
                             error={!!formik.errors.password}
                             className={styles.controlInputs}>
                    <InputLabel htmlFor={"password"}>Password</InputLabel>
                    <Input

                        color={'primary'}
                        id={"password"}
                        type={isBlind ? 'password' : 'text'}
                        value={pass}
                        onChange={setPassHandler}
                        aria-describedby={'password-error'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label={"toggle password visibility"}
                                    onClick={eyeToggle}
                                >
                                    {isBlind ? <VisibilityOff/> : <Visibility/>}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                    {!!formik.errors.password &&
                    <FormHelperText id="password-error">{formik.errors.password}</FormHelperText>}
                </FormControl>
                <div className={styles.forgotBox}>
                    <NavLink className={styles.navLinkForgotBox} to={'/auth/restore-password'}>
                        <span>Forgot Password</span>
                    </NavLink>
                </div>
                <Button disabled={false} type={'submit'} className={styles.formButtons} variant="contained"
                        color="primary" onClick={onClickHandler}>
                    Login
                </Button>
            </form>
            <div className={styles.signUpBox}>
                <p>Don't have an account?</p>
                <NavLink to={'registration'} className={styles.signUpLink}>
                    <span>Sign Up</span>
                </NavLink>
            </div>
        </>
    )

}

export default Login;