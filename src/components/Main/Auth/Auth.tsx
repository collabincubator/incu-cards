import React from 'react';
import styles from '../Auth/Auth.module.scss';
import { Switch, Route } from 'react-router-dom';
import Login from '../Login/Login';
import Registration from '../Registration/Registration';

export const Auth: React.FC = (props) => {

    return (
        <div className={styles.container}>
            <div className={styles.box}>
                <div className={styles.inner}>
                    <Switch>
                        <Route path={'/auth/login'} exact={true} render={(props)=><Login styles={styles} /> }/>
                        <Route path={'/auth/registration'} exact={true} render={(props)=><Registration styles={styles} /> }/>
                    </Switch>
                </div>
            </div>
        </div>
    )
}

export default Auth;