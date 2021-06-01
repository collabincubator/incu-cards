import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RegistrationTC} from '../../../redux/registrationReducer/registrationReducer';
import styles from "./Registration.module.scss";
import {Redirect, useHistory} from 'react-router-dom';
import {AppStateType} from "../../../redux/store";
import preloader from '../../../assets/icons/preloader.svg'
import classNames from "classnames";



const Registration = (props: any) => {

    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [passSecond, setPassSecond] = useState('');
    const dispatch = useDispatch()
    const history = useHistory()
    const succeess = useSelector<AppStateType,boolean>(state => state.registrationReducer.registrationSuccess)
    const loading = useSelector<AppStateType,boolean>(state => state.registrationReducer.loading)
    const err = useSelector<AppStateType,string>(state => state.registrationReducer.error)

    const onClickHandler = () => {
        pass === passSecond &&
        dispatch(RegistrationTC(email, pass))

    }
    const onClickRedirect = () => {
       history.goBack()
    }

    if(succeess) {
        return <Redirect to={'/login'}/>
    }

    return (
        <div className={styles.container}>
        <div className={styles.box}>
            <div className={styles.inner}>
                <h1>Cards</h1>
                <h2>Sign Up</h2>
                <span>Email</span>
                <input className={classNames(styles.textInput,{

                })} value={email} onChange={(e) => {
                    setEmail(e.currentTarget.value)
                }}/>
                <span>Password</span>
                <input type='password' className={`${styles.textInput} ${styles.passInput}`}
                       value={pass} onChange={(e) => {
                    setPass(e.currentTarget.value)
                }}/>

                <span>Confirm password</span>
                <input type='password' className={`${styles.textInput} ${styles.passInput}`}
                       value={passSecond} onChange={(e) => {
                    setPassSecond(e.currentTarget.value)
                }}/>
                {err !==  '' && <span style={{color:"red"}}> {err}</span>}
                <div className={styles.btn_group}>
                    <button className={styles.btnSecond} onClick={onClickRedirect}>Cancel</button>
                    <button className={classNames(styles.btn,{
                        [styles.disable] : loading
                    })} disabled={loading} onClick={onClickHandler}>Registr  {loading && <img src={preloader} className={styles.preloader} alt=""/>  }</button>
                </div>
            </div>
        </div>
    </div>)
}

export default Registration;