import React from 'react';
import { useSelector} from "react-redux";
import {Redirect} from 'react-router-dom';
import {AppStateType} from "../../../redux/store";
import {RegistrationForm} from "./registrationForm/registrationForm";

type PropsType = {
    styles: any
}

const Registration: React.FC<PropsType> = ({styles}) => {
    const success = useSelector<AppStateType,boolean>(state => state.registrationReducer.registrationSuccess)


    if(success) {
        return <Redirect to={'/auth/login'}/>
    }

    return (
        <>
            <h1>Cards</h1>
            <h2>Sign Up</h2>
            <RegistrationForm styles={styles}/>
        </>
    )
}

export default Registration;
