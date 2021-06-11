import React, {useEffect} from 'react';
import Header from './components/Header/Header';
import {Redirect, Route, Switch} from "react-router-dom";
import Profile from "./components/Main/Profile/Profile";
import {PageNotFounded} from "./components/Main/PageNotFounded/PageNotFounded";
import Auth from './components/Main/Auth/Auth';
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "./redux/store";
import styles from './App.module.scss'
import preloader from './assets/icons/preloaderAppleLight.svg';
import { ProfileResponseType } from './api/cards-api';
import {Packs} from "./components/Main/Packs/Packs";
import {Cards} from "./components/Main/Cards/Cards";
import classNames from "classnames";
import {authMeTC} from "./redux/authReducer/authReducer";

const PATH = {
    AUTH: '/auth',
    LOGIN: 'auth/login',
    PROFILE: '/profile',
    PACKS: '/packs',
    CARDS: '/cards/:id/:name',
}


const App = (props: any) => {
    const initializing = useSelector<AppStateType, boolean>(state => state.appReducer.initializing);

    const theme = useSelector<AppStateType, 'light'|'dark'>(state => state.appReducer.theme);
    const isLoggedIn = useSelector<AppStateType, boolean | null>( state => state.authReducer.isLoggedIn);
    const profile = useSelector<AppStateType, ProfileResponseType | null>(state => state.profileReducer.profile);
    const dispatch = useDispatch();



    if (initializing) {
        return (<div className={'initializePreloader'}>
            <img src={preloader} alt={'initialize preloader'}/>
        </div>)
    }


    return (
        <div className={classNames(styles.app,({
            [styles.appDark]: theme === 'dark',
            [styles.app]: theme === 'light'
        }))}>
            <Header/>

            <Switch>
                <Route path={'/'} exact render={() => {
                    if ( profile !== null && isLoggedIn) {
                        return (<Redirect to={PATH.PROFILE}/>);
                    }
                    return (<Redirect to={PATH.LOGIN}/>)
                }}/>
                <Route path={PATH.AUTH} render={() => <Auth/>}/>
                <Route path={PATH.PROFILE} render={() => <Profile/>}/>
                <Route path={PATH.PACKS} render={() => <Packs/>}/>
                <Route path={PATH.CARDS} render={() => <Cards/>}/>
                <Route render={() => <PageNotFounded/>}/>
            </Switch>
        </div>
    );
}

export default App;
