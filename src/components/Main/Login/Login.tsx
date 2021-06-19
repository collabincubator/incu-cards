import React, {useEffect, useState} from 'react';
import {NavLink} from 'react-router-dom';
import {LoginForm} from "./LoginForm/loginForm";
import {useDispatch, useSelector} from 'react-redux';
import {authMeTC} from '../../../redux/authReducer/authReducer';
import {AppStateType} from '../../../redux/store';
import {ProfileResponseType} from '../../../api/cards-api';


type PropsType = {
    styles: any
}

export const Login: React.FC<PropsType> = ({styles, ...props}) => {

    return (
        <>
            <h1>Cards</h1>
            <h2>Sign In</h2>
            <LoginForm
                styles={styles}/>

            <div className={styles.footerBox}>
                <p>Don't have an account?</p>
                <NavLink to={'registration'} className={styles.footerLink}>
                    <span>Sign Up</span>
                </NavLink>

            </div>
        </>
    )

}

export default Login;
