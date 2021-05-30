import React, {useState} from 'react';
import styles from './Navigation.module.css';
import { NavLink } from 'react-router-dom';

const Navigation = (props: any) => {

    let [tempState, setTempState] = useState( [{name: 'Login'}, {name: 'Registration'}, {name: 'RestorePass'}, {name: 'ChangePass'}, {name: 'Profile'}]);

    let navLinks = tempState.map((link:{name:string}, index:number) => {
        return <li key={index} className={styles.navLinkItem}>
            <NavLink to={`/${(link.name).toLowerCase()}`} className={styles.menuLink} activeClassName={styles.menuLinkActive}>
                <span>{link.name}</span>
            </NavLink>
        </li>
    })

    return <ul className={styles.navList}>
        {navLinks}
    </ul>
}

export default Navigation;