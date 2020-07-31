import React from 'react';
import styles from './Main.module.css';
import Profile from './Profile/Profile';
import Login from './Login/Login';
import RestorePass from './RestorePass/RestorePass';
import ChangePass from './ChangePass/ChangePass';
import Registration from './Registration/Registration';
import { Route } from 'react-router-dom';
import Button from '../common/Button/Button';
import Input from '../common/Input/Input';

const Main = (props: any) => {

    return(
        <div className={styles.wrap}>
            <p className={styles.testText}>Main</p>
            <div className={styles.col}>
                <Input/>
                <Button />
            </div>
            <Route path='/login' render={() => <Login/>}/>
            <Route path='/profile' render={() => <Profile/>}/>
            <Route path='/restorepass' render={() => <RestorePass/>}/>
            <Route path='/changepass' render={() => <ChangePass/>}/>
            <Route path='/registration' render={() => <Registration/>}/>
        </div>
    )
}

export default Main;