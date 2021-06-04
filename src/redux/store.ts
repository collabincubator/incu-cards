import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import authReducer from './loginReducer/authReducer';
import profileReducer from './profileReducer/profileReducer';
import registrationReducer from './registrationReducer/registrationReducer';
import restorePassReducer from './restorePassReducer/restorePassReducer';
import changePassReducer from './changePassReducer/changePassReducer';
import appReducer from "./appReducer/appReducer";

export const rootReducer = combineReducers({
    authReducer,
    profileReducer,
    registrationReducer,
    restorePassReducer,
    changePassReducer,
    appReducer
});

export type AppStateType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer, applyMiddleware(thunk));



