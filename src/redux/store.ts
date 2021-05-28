import { createStore, combineReducers, applyMiddleware } from 'redux';
import testReducer from './testReducer/testReducer';
import thunk from 'redux-thunk';
import loginReducer from './loginReducer/loginReducer';
import profileReducer from './profileReducer/profileReducer';
import registrationReducer from './registrationReducer/registrationReducer';
import restorePassReducer from './restorePassReducer/restorePassReducer';
import changePassReducer from './changePassReducer/changePassReducer';

export const rootReducer = combineReducers({
    testReducer,
    loginReducer,
    profileReducer,
    registrationReducer,
    restorePassReducer,
    changePassReducer
});

export type AppStateType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer, applyMiddleware(thunk));

