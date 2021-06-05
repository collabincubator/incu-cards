import React, {useState} from 'react';
import styles from "./Restore.module.scss";
import { RestoreMailTC} from "../../../redux/restorePassReducer/restorePassReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../redux/store";
import {CheckEmail} from "../Registration/CheckEmail";

type PropsType = {
    styles: any
}

const RestorePass: React.FC<PropsType> = ({styles, ...props}) => {
    const [emailIn, setEmailIn] = useState('collabincubator@gmail.com');
    const dispatch = useDispatch()
    const from = useSelector<AppStateType,string>(state => state.restorePassReducer.from)
    const email = useSelector<AppStateType,boolean>(state => state.restorePassReducer.email)
    const message = useSelector<AppStateType,string>(state => state.restorePassReducer.message)

    const onClickHandler = () => {
        dispatch(RestoreMailTC(emailIn,from,message))
    }

    return (
        <>
            {email ? <CheckEmail styles={styles}/>
                :
                <>
                    <h1>Cards</h1>
                    <h2>Forgot your password?</h2>
                    <span>Email</span>
                    <input className={styles.textInput}
                           placeholder={'Email'}
                           value={emailIn}
                           onChange={(e) => {
                               setEmailIn(e.currentTarget.value)
                           }}
                    />
                    <div className={styles.describe}>
                        Enter your email address and we will send you further instructions
                    </div>

                    <button className={styles.btn}
                            onClick={onClickHandler}
                    >Send Instructions
                    </button>

                    <div className={styles.describe}>
                        Did you remember your password?
                    </div>
                    <div>
                        Try logging in
                    </div>

                </>}</>
    )
}

export default RestorePass;