import React from 'react';
import Navigation from './Navigation/Navigation';
import styles from './Header.module.css';
import {FormControlLabel, FormGroup, Switch} from "@material-ui/core";

const Header = (props: any) => {
    return <div className={styles.header}>
        <Navigation/>
    </div>
}

export default Header;
