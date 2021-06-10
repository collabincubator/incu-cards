import React from 'react';
import Header from './components/Header/Header';
import {Redirect, Route, Switch} from "react-router-dom";
import Profile from "./components/Main/Profile/Profile";
import {PageNotFounded} from "./components/Main/PageNotFounded/PageNotFounded";
import Auth from './components/Main/Auth/Auth';
import { useSelector} from "react-redux";
import {AppStateType} from "./redux/store";

import preloader from './assets/icons/preloaderAppleLight.svg';
import { ProfileResponseType } from './api/cards-api';
import {Packs} from "./components/Main/Packs/Packs";
import {Cards} from "./components/Main/Cards/Cards";

const PATH = {
    AUTH: '/auth',
    LOGIN: 'auth/login',
    PROFILE: '/profile',
    PACKS: '/packs',
    CARDS: '/cards/:id/:name',
}


const App = (props: any) => {
    const initializing = useSelector<AppStateType, boolean>(state => state.appReducer.initializing);
    const profile = useSelector<AppStateType, ProfileResponseType | null>(state => state.profileReducer.profile);




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
                    if ( profile !== null) {
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
