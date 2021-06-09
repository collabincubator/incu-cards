import React from 'react';
import {Redirect} from "react-router-dom";
import {useSelector} from "react-redux";
import {AppStateType} from "../../../../redux/store";
import {ChangePassForm} from "../ChangePassForm/ChangePassForm";

type PropsType = {
    styles: any
}

const ChangePass: React.FC<PropsType> = ({styles, ...props}) => {

    const success = useSelector<AppStateType, boolean>(state => state.changePassReducer.successChangePass)

    if(success) {
        return <Redirect to={'/login'}/>
    }

    return (
        <>
            <h1>Cards</h1>
            <h2>Sign Up</h2>
            <ChangePassForm
                styles={styles}
            />
            <p>
                Create new password and we will send you further instructions to email
            </p>
        </>
    )
}

export default ChangePass;
