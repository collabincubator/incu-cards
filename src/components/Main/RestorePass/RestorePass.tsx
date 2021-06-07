import React, {ChangeEvent, useCallback, useState} from 'react';
import { RestoreMailTC} from "../../../redux/restorePassReducer/restorePassReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../redux/store";
import {CheckEmail} from "../Registration/CheckEmail";
import {Button, FormControl, FormHelperText, Input, InputLabel} from '@material-ui/core';
import {NavLink} from 'react-router-dom';

type PropsType = {
    styles: any
}

const RestorePass: React.FC<PropsType> = ({styles, ...props}) => {
    const [requestedEmail, setRequestedEmail] = useState('');
    const dispatch = useDispatch()
    const email = useSelector<AppStateType,boolean>(state => state.restorePassReducer.email)

    const onClickHandler = () => {
        dispatch(RestoreMailTC(requestedEmail))
    }

    const setEmailHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setRequestedEmail(e.currentTarget.value);
    }, [requestedEmail])


    return (
        <>
            {email ? <CheckEmail styles={styles}/>
                :
                <>
                    <h1>Cards</h1>
                    <h2>Forgot your password?</h2>
                    <FormControl className={styles.controlInputs}>
                        <InputLabel htmlFor={"requestedEmail"}>Enter your email</InputLabel>
                        <Input id={"requestedEmail"}
                               value={requestedEmail}
                               onChange={setEmailHandler}
                               aria-describedby={'requestEmail-error'}/>
                    </FormControl>
                    <p>
                        Enter your email address and we will send you further instructions
                    </p>
                    <Button disabled={false} type={'submit'}
                            className={styles.formButtons}
                            variant={"contained"}
                            color={"primary"}
                            onClick={onClickHandler}
                    >
                        Send Instructions
                    </Button>
                    <div className={styles.footerBox}>
                        <p>Did you remember your password?</p>
                        <NavLink to={'registration'} className={styles.footerLink}>
                            <span>Sign Up</span>
                        </NavLink>
                    </div>


                </>}</>
    )
}

export default RestorePass;