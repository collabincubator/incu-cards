import React, {useEffect} from 'react';
import styles from '../Auth/Auth.module.scss';
import {Switch, Route} from 'react-router-dom';
import Login from '../Login/Login';
import Registration from '../Registration/Registration';
import RestorePass from '../RestorePass/RestorePass';
import ChangePass from '../ChangePass/ChangePass';
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../redux/store";
import {appActions, fetchProfileDataTC} from '../../../redux/appReducer/appReducer';
import {UserResponeType} from '../../../redux/loginReducer/authReducer';

export const Auth: React.FC = (props) => {
    const dispatch = useDispatch()
    const isLoggedIn = useSelector<AppStateType, boolean>(state => state.authReducer.isLoggedIn)
    const usersData = useSelector<AppStateType, UserResponeType[]>(state => state.authReducer.users)
    useEffect(() => {
        if (usersData.length === 0) {
            dispatch(fetchProfileDataTC());
        } else if (isLoggedIn) {
            dispatch(appActions.setInitializedAC(true))
        }
    }, [usersData])

    return (
        <div className={styles.container}>
            <div className={styles.box}>
                <div className={styles.inner}>
                    <Switch>
                        <Route path={'/auth/login'} exact={true} render={(props) => <Login styles={styles}/>}/>
                        <Route path={'/auth/registration'} exact={true}
                               render={(props) => <Registration styles={styles}/>}/>
                        <Route path={'/auth/restore-password'} exact={true}
                               render={(props) => <RestorePass styles={styles}/>}/>
                        <Route path={'/auth/change-password/:token?'} exact={true}
                               render={(props) => <ChangePass styles={styles}/>}/>
                    </Switch>
                </div>
            </div>
        </div>
    )
}

export default Auth;