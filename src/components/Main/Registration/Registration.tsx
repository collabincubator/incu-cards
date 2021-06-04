import React, {ChangeEvent, useCallback, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RegistrationTC} from '../../../redux/registrationReducer/registrationReducer';
import {Redirect, useHistory} from 'react-router-dom';
import {AppStateType} from "../../../redux/store";
import preloader from '../../../assets/icons/preloader.svg'
import classNames from "classnames";
import {Button, FormControl, FormHelperText, IconButton, Input, InputAdornment, InputLabel} from '@material-ui/core';
import {useFormik} from 'formik';
import {Visibility, VisibilityOff} from '@material-ui/icons';

type PropsType = {
    styles: any
}

const Registration: React.FC<PropsType> = ({styles, ...props}) => {

    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [passSecond, setPassSecond] = useState('');
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            passwordConfirm: ''
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
            alert(JSON.stringify(values, null, 2));
        }
    });
    const history = useHistory()
    const succeess = useSelector<AppStateType,boolean>(state => state.registrationReducer.registrationSuccess)
    const loading = useSelector<AppStateType,boolean>(state => state.registrationReducer.loading)
    const err = useSelector<AppStateType,string>(state => state.registrationReducer.error)

    const setEmailHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.currentTarget.value)
    }, [email])

    const setPassHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setPass(e.currentTarget.value)
    }, [pass])
    const setPassConfHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
            setPassSecond(e.currentTarget.value)
        }, [passSecond])

    let [isBlind, setIsBlind] = useState(true)
    let [isBlindPassConf, setIsBlindPassConf] = useState(true)

    const eyeToggle = () => {
        setIsBlind(prev => !prev)
    }
    const eyeTogglePassConf = () => {
        setIsBlindPassConf(prev => !prev)
    }

    const onClickHandler = () => {
        pass === passSecond &&
        dispatch(RegistrationTC(email, pass))

    }
    const onClickBack = () => {
       history.goBack()
    }

    if(succeess) {
        return <Redirect to={'/auth/login'}/>
    }
    return (
        <>
            <h1>Cards</h1>
            <h2>Sign Up</h2>
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
                                {isBlind ? <VisibilityOff/>: <Visibility/>}
                            </IconButton>
                        </InputAdornment>
                    }
                />
                {!!formik.errors.password &&
                <FormHelperText id="password-error">{formik.errors.password}</FormHelperText>}
            </FormControl>

            <FormControl {...formik.getFieldProps('passwordConfirm')}
                         error={!!formik.errors.password}
                         className={styles.controlInputs}>
                <InputLabel htmlFor={"passwordConfirm"}>Confirm password</InputLabel>
                <Input

                    color={'primary'}
                    id={"passwordConfirm"}
                    type={isBlindPassConf ? 'password' :'text' }
                    value={passSecond}
                    onChange={setPassConfHandler}
                    aria-describedby={'passwordConfirm-error'}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label={"toggle password visibility"}
                                onClick={eyeTogglePassConf}
                            >
                                {isBlindPassConf ? <VisibilityOff/> : <Visibility/>}
                            </IconButton>
                        </InputAdornment>
                    }
                />
                {!!formik.errors.password &&
                <FormHelperText id="passwordConfirm">{formik.errors.password}</FormHelperText>}
            </FormControl>

            {err !== '' && <span style={{color: "red"}}> {err}</span>}

            <div className={styles.btnContainer}>
                <Button disabled={false} type={'button'} variant={"contained"}
                        className={styles.formButtons}
                        onClick={onClickBack}>
                    Login
                </Button>
                <Button disabled={false} type={'submit'} variant={"contained"}
                        className={styles.formButtons}
                        color="primary" onClick={onClickHandler}>
                    Login
                </Button>
            </div>

            {/*<div className={styles.btn_group}>*/}
            {/*    <button className={styles.btnSecond} onClick={onClickBack}>Cancel</button>*/}
            {/*    <button className={classNames(styles.btn, {*/}
            {/*        [styles.disable]: loading*/}
            {/*    })} disabled={loading} onClick={onClickHandler}>Registr {loading &&*/}
            {/*    <img src={preloader} className={styles.preloader} alt=""/>}</button>*/}
            {/*</div>*/}
        </>
    )
}

export default Registration;