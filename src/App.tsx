import React from 'react';
import Header from './components/Header/Header';
import {Redirect, Route, Switch} from "react-router-dom";
import Profile from "./components/Main/Profile/Profile";
import RestorePass from "./components/Main/RestorePass/RestorePass";
import ChangePass from "./components/Main/ChangePass/ChangePass";
import Registration from "./components/Main/Registration/Registration";
import {PageNotFounded} from "./components/Main/PageNotFounded/PageNotFounded";
import Main from "./components/Main/Main";
import Auth from './components/Main/Auth/Auth';

const PATH = {
    AUTH: '/auth',
    PROFILE: '/profile',
    NEW_PASSWORD:'/changepass/', //:token
    REGISTER:'/registration',
    RESTORE_PASS:'/restorepass',
    TEST_STAND:'/stand',
    ALL:'*',
}

const App = (props: any) => {

  return (
      <div>
          <Header/>
          <Switch>
              <Route path={'/main'} exact render={() => <Main/>}/>
              <Route path={'/'} exact render={() => <Redirect to={PATH.AUTH}/>}/>
              <Route path={PATH.AUTH} render={(props) => <Auth />}/>
              <Route path={PATH.PROFILE} render={() => <Profile/>}/>
              <Route render={() => <PageNotFounded/>}/>
          </Switch>
      </div>
  );
}

export default App;
