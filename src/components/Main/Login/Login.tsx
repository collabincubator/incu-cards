import React, {ChangeEvent, useCallback, useState} from 'react';
import {useDispatch} from 'react-redux';
import {loginTC} from '../../../redux/loginReducer/loginReducer';
import styles from './Login.module.scss';
import {NavLink} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';
import {Input} from '../../common/Input/Input';

const Login = (props: any) => {

    let [email, setEmail] = useState('')
    let [pass, setPass] = useState('')
    let [isBlind, setIsBlind] = useState(true)
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

    const eyeToggle = () => {
        setIsBlind(prev => !prev)
    }


    return <div className={styles.container}>
        <div className={styles.box}>
                <div className={styles.inner}>
                    <h1>Cards</h1>
                    <h2>Sign In</h2>
                    <label className={styles.inputsLabel}>
                        <span>Email</span>
                        <Input className={styles.textInput} value={email} onChange={setEmailHandler} />
                    </label>
                    <label className={styles.inputsLabel}>
                        <span>Password</span>
                        <button><FontAwesomeIcon icon={isBlind ? faEye : faEyeSlash} className={styles.eyeToggleIcon} onClick={eyeToggle}/></button>
                        <Input type={isBlind ? 'password' : 'text'} className={styles.textInput} value={pass} onChange={setPassHandler} />
                    </label>

                    <div className={styles.forgotBox}>
                        <NavLink className={styles.navLinkForgotBox} to={'/restorepass'} >
                            <span>Forgot Password</span>
                        </NavLink>
                    </div>
                    <button className={styles.btn} onClick={onClickHandler}>Login</button>
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