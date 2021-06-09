import React from 'react';
import { useSelector} from 'react-redux';
import {NavLink} from 'react-router-dom';
import {AppStateType} from '../../../redux/store';
import {LoginForm} from "./LoginForm/loginForm";

type PropsType = {
    styles: any
}

export const Login: React.FC<PropsType> = ({styles, ...props}) => {

    const error = useSelector<AppStateType, string>(state => state.authReducer.error);
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
