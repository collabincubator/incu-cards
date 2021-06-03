import React from 'react';
import Header from './components/Header/Header';
import {Redirect, Route, Switch} from "react-router-dom";
import Login from "./components/Main/Login/Login";
import Profile from "./components/Main/Profile/Profile";
import RestorePass from "./components/Main/RestorePass/RestorePass";
import ChangePass from "./components/Main/ChangePass/ChangePass";
import Registration from "./components/Main/Registration/Registration";
import {PageNotFounded} from "./components/Main/PageNotFounded/PageNotFounded";
import Main from "./components/Main/Main";

const PATH = {
    LOGIN: '/login',
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
              <Route path={'/'} exact render={() => <Redirect to={PATH.LOGIN}/>}/>
              <Route path={PATH.LOGIN} render={() => <Login/>}/>
              <Route path={PATH.PROFILE} render={() => <Profile/>}/>
              <Route path={PATH.RESTORE_PASS} render={() => <RestorePass/>}/>
              <Route path={PATH.NEW_PASSWORD} render={() => <ChangePass/>}/>
              <Route path={PATH.REGISTER} render={() => <Registration/>}/>
              <Route render={() => <PageNotFounded/>}/>
          </Switch>
      </div>
  );
}

export default App;
