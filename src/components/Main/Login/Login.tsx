import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {loginTC} from '../../../redux/loginReducer/loginReducer';
import styles from './Login.module.scss';

const Login = (props: any) => {

    let [email, setEmail] = useState('')
    let [pass, setPass] = useState('')

    const dispatch = useDispatch();

    const onClickHandler = () => {
        dispatch(loginTC(email, pass, true))
    }

    return <div className={styles.container}>
        <div className={styles.box}>
            <div className={styles.forms}>
                <div className={styles.inner}>
                    <h1>Cards</h1>
                    <h2>Sign In</h2>
                    <input className={styles.textInput} value={email} onChange={(e)=> {setEmail(e.currentTarget.value)}} />
                    <input className={`${styles.textInput} ${styles.passInput}`} value={pass} onChange={(e)=> {setPass(e.currentTarget.value)}} />
                    <button className={styles.btn} onClick={onClickHandler}>Login</button>
                </div>
            </div>
        </div>
    </div>
}

export default Login;