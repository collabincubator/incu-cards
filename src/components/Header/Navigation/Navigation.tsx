import React, {useEffect, useRef, useState} from 'react';
import styles from './Navigation.module.css';
import { NavLink, Redirect } from 'react-router-dom';
import {Button} from '@material-ui/core';
import {useDispatch, useSelector} from 'react-redux';
import {LogoutTC} from '../../../redux/authReducer/authReducer';
import {AppStateType} from '../../../redux/store';

const Navigation = (props: any) => {

    const dispatch = useDispatch();

    let [tempState, setTempState] = useState( [

        {name: 'Login', path: 'auth/login'},
        {name: 'Registration', path: 'auth/registration'},
        {name: 'Restore Password', path: 'auth/restore-password'},
        {name: 'Change Password', path: 'auth/change-password'},
        {name: 'Packs', path: 'packs'},
        {name: 'Cards', path: 'cards'},
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
    return <ul className={styles.navList}>
        {navLinks}
        <Button variant="contained" color="primary" onClick={onClickLogoutHandler}>
            Logout
        </Button>
    </ul>
}

export default Navigation;