import React, {useState} from 'react';
import styles from './ChangePass.module.scss'
import {Redirect, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { RestorePassTC } from '../../../redux/changePassReducer/changePassReducer';
import {AppStateType} from "../../../redux/store";

const ChangePass = (props: any) => {
    const [pass, setPass] = useState('');
    const success = useSelector<AppStateType,boolean>(state => state.changePassReducer.successChangePass)
    const error = useSelector<AppStateType,string>(state => state.changePassReducer.error)
    const dispatch = useDispatch()
    const {token} = useParams<{ token: string }>()

    const onClickHandler = () => {
        dispatch(RestorePassTC(pass,token))
    }

    if(success) {
        return <Redirect to={'/login'}/>
    }
    return (
        <>
            <h1>Cards</h1>
            <h2>Sign Up</h2>
            <span>Password</span>
            <input type='password'
                   value={pass}
                   onChange={(e) => setPass(e.currentTarget.value)}
                   className={`${styles.textInput} ${styles.passInput}`}
                   placeholder={'password'}/>
            <div className={styles.describe}>
                Create new password and we will send you further instructions to email
            </div>
            <button className={styles.btn}
                    onClick={onClickHandler}>Create new password
            </button>
            <span>{error}</span>
        </>
    )
}

export default ChangePass;