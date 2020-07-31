import { createStore, combineReducers, applyMiddleware } from 'redux';
import testReducer from './testReducer';
import thunk from 'redux-thunk';
import loginReducer from './loginReducer';
import profileReducer from './profileReducer';
import registrationReducer from './registrationReducer';
import restorePassReducer from './restorePassReducer';
import changePassReducer from './changePassReducer';

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

