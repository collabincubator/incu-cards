import React, {useEffect, useRef, useState} from 'react';
import styles from './Navigation.module.css';
import { NavLink, Redirect } from 'react-router-dom';
import {Button, FormControlLabel, FormGroup, Switch} from '@material-ui/core';
import {useDispatch, useSelector} from 'react-redux';
import {LogoutTC} from '../../../redux/authReducer/authReducer';
import {AppStateType} from '../../../redux/store';
import { appActions } from '../../../redux/appReducer/appReducer';

const Navigation = (props: any) => {
    const userName = useSelector<AppStateType,string | undefined>(state => state.profileReducer.profile?.email)
    const isLoggerIn = useSelector<AppStateType,boolean>(state => state.authReducer.isLoggedIn)
    const dispatch = useDispatch();

    let [tempState, setTempState] = useState( [

        {name: 'Login', path: 'auth/login'},
        {name: 'Registration', path: 'auth/registration'},
        {name: 'Restore Password', path: 'auth/restore-password'},
        {name: 'Change Password', path: 'auth/change-password'},
        {name: 'Packs', path: 'packs'},
        {name: 'Profile', path: 'profile'}]);

    let navLinks = tempState.map((link:{name: string, path:string}, index:number) => {
        return <li key={index} className={styles.navLinkItem}>
            <NavLink to={`/${(link.path).toLowerCase()}`} className={styles.menuLink} activeClassName={styles.menuLinkActive}>
                <span>{link.name}</span>
            </NavLink>
        </li>
    })

    const onClickLogoutHandler = () => {
        dispatch(LogoutTC())
    }
    const [theme, setTheme] = useState<'light' | 'dark'>('dark');

    const toggleTheme =  () => {
        if (theme === 'light') {
             setTheme('dark');
            dispatch(appActions.setThemeAC(theme))
        } else {
             setTheme('light');
             dispatch(appActions.setThemeAC(theme))
        }
    }


    return <ul className={styles.navList}>

        {navLinks}
        <FormGroup>
            <FormControlLabel
                control={<Switch size={"medium"} onClick={toggleTheme} />}
                label="Change Theme"
            />
        </FormGroup>
        {isLoggerIn ? <><div>{userName}</div> <Button variant="contained" color="primary" onClick={onClickLogoutHandler}>
            Logout
        </Button></>  : ''}

    </ul>
}

export default Navigation;
