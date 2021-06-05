import React, {ChangeEvent, useCallback, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {loginTC} from '../../../redux/authReducer/authReducer';
import {NavLink} from 'react-router-dom';
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
type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}

export const Login: React.FC<PropsType> = ({styles, ...props}) => {

    let [email, setEmail] = useState('collabincubator@gmail.com')
    let [pass, setPass] = useState('collaborators')
    const dispatch = useDispatch();
    // const isLoggedIn = useSelector<AppStateType, boolean>(state => state.authReducer.isLoggedIn);

    const error = useSelector<AppStateType, string>(state => state.authReducer.error);

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
            email: 'collabincubator@gmail.com',
            password: 'collaborators'
        },
        validate: values => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'email is required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.password) {
                errors.password = 'password is required';
            } else if (values.password.length <= 7) {
                errors.password = 'password must be at least 7 letters long';
            }
            return errors;
        },
        onSubmit: values => {
            dispatch(loginTC(values.email, values.password))
            formik.resetForm()
        }
    })

    return (
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
                <div>{error && 'email or password invalid' }</div>
                <Button disabled={false} type={'submit'} className={styles.formButtons} variant="contained"
                        color="primary">
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