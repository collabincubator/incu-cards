import React from 'react';
import styles from '../Auth/Auth.module.scss';
import {Switch, Route, Redirect} from 'react-router-dom';
import Login from '../Login/Login';
import Registration from '../Registration/Registration';
import RestorePass from '../RestorePass/RestorePass';
import ChangePass from '../ChangePass/ChangePass/ChangePass';
import {useSelector} from "react-redux";
import { AppStateType } from '../../../redux/store';
import classNames from "classnames";
import {ProfileEdit} from '../ProfileEdit/ProfileEdit';


export const Auth: React.FC = (props) => {
    const isLoggedIn = useSelector<AppStateType, boolean>(state => state.authReducer.isLoggedIn)
    const theme = useSelector<AppStateType, 'light'|'dark'>(state => state.appReducer.theme);

    return (
        <div className={styles.container}>
            <div className={classNames(styles.box,({
                [styles.dark] : theme === 'dark'
            }))}>
                <div className={styles.inner}>
                    <Switch>
                        <Route path={'/auth'} exact render={(props) => {
                            if (isLoggedIn) {
                                return (<Redirect to={'/profile'}/>)
                            }
                            return (<Login styles={styles}/>)
                        }}/>
                        <Route path={'/auth/login'} render={(props) => {
                            if (isLoggedIn) {
                                return (<Redirect to={'/profile'}/>)
                            }
                            return (<Login styles={styles}/>)
                        }}/>
                        <Route path={'/auth/registration'}
                               render={(props) => {
                                   if (isLoggedIn) {
                                       return (<Redirect to={'/profile'}/>)
                                   }
                                   return (<Registration styles={styles}/>)
                               }}
                        />
                        <Route path={'/auth/restore-password'}
                               render={(props) => <RestorePass styles={styles}/>}/>
                        <Route path={'/auth/change-password/:token?'}
                               render={(props) => <ChangePass styles={styles}/>}/>
                        <Route path={'/auth/profile-edit'}
                               render={(props) => <ProfileEdit styles={styles}/>}/>
                    </Switch>
                </div>
            </div>
        </div>
    )
}

export default Auth;
