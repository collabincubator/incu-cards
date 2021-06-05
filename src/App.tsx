import React, {useEffect} from 'react';
import Header from './components/Header/Header';
import {Redirect, Route, Switch} from "react-router-dom";
import Profile from "./components/Main/Profile/Profile";
import {PageNotFounded} from "./components/Main/PageNotFounded/PageNotFounded";
import Auth from './components/Main/Auth/Auth';
import {useDispatch, useSelector} from "react-redux";
import {authMeTC} from "./redux/authReducer/authReducer";
import {AppStateType} from "./redux/store";
import {ProfileResponseType} from "./api/cards-api";
import preloader from './assets/icons/preloaderAppleLight.svg';

const PATH = {
    AUTH: '/auth',
    LOGIN: 'auth/login',
    PROFILE: '/profile',
}


const App = (props: any) => {
    const dispatch: Function = useDispatch()
    const isLoggedIn = useSelector<AppStateType, boolean>(state => state.authReducer.isLoggedIn);
    const initializing = useSelector<AppStateType, boolean>(state => state.appReducer.initializing);
    const profile = useSelector<AppStateType, ProfileResponseType | null>(state => state.profileReducer.profile);

    useEffect(() => {
        if (profile === null) {
            dispatch(authMeTC())
        }
    }, [])


    if (initializing) {
        return (<div className={'initializePreloader'}>
            <img src={preloader} alt={'initialize preloader'}/>
        </div>)
    }


    return (
        <div>
            <Header/>

            <Switch>
                <Route path={'/'} exact render={() => {
                    if (isLoggedIn && profile !== null) {
                        return (<Redirect to={PATH.PROFILE}/>);
                    }
                    return (<Redirect to={PATH.LOGIN}/>)
                }}/>
                <Route path={PATH.AUTH} render={() => <Auth/>}/>
                <Route path={PATH.PROFILE} render={() => <Profile/>}/>
                <Route render={() => <PageNotFounded/>}/>
            </Switch>
        </div>
    );
}

export default App;
