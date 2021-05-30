import React from 'react';
import Navigation from './Navigation/Navigation';
import styles from './Header.module.css';

const Header = (props: any) => {
    return <div className={styles.header}>
        <Navigation/>
    </div>
}

export default Header;