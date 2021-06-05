import {authAPI} from '../../api/cards-api';
import {Dispatch} from "redux";
import {profileActions} from '../profileReducer/profileReducer';
import {appActions} from '../appReducer/appReducer';

export const LOGIN_FLOW = 'authReducer/SET-LOGIN-FLOW' as const;
export const ERROR = 'authReducer/SET-ERROR' as const;
export const INFO = 'authReducer/SET-INFO' as const;


type InitialStateType = {
    isLoggedIn: boolean
    error: string
    info: string
}

export const initialState: InitialStateType = {
    isLoggedIn: false,
    error: '',
    info: ''
}

type PropertiesType<ActionType> = ActionType extends { [key: string]: infer ResponseType } ? ResponseType : never;
type ActionsType = ReturnType<PropertiesType<typeof authActions>>

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {

        case LOGIN_FLOW: {
            return ({
                ...state,
                isLoggedIn: action.payload.isLoggedIn
            })
        }
        case ERROR: {
            return ({
                ...state,
                error: action.payload.error
            })
        }
        case INFO: {
            return ({
                ...state,
                info: action.payload.info
            })
        }

        default:
            return state
    }
}

export const authActions = {

    loginFlowAC: (isLoggedIn: boolean) => {
        return ({
            type: LOGIN_FLOW,
            payload: {
                isLoggedIn
            } as InitialStateType,
        })
    },

    errorAC: (error: string) => {
        return ({
            type: ERROR,
            payload: {
                error
            } as InitialStateType,
        })
    },
    infoAC: (info: string) => {
        return ({
            type: INFO,
            payload: {
                info
            } as InitialStateType,
        })
    }
}


export const loginTC = (email: string, password: string, rememberMe?: boolean) => (dispatch: any) => {
    dispatch(appActions.setInitializingAC(true))
    authAPI.logIn(email, password, rememberMe = true)
        .then(data => {
            dispatch(profileActions.setProfileDataAC(data))
            dispatch(authActions.loginFlowAC(true))
        })
        .catch((error) => {
            dispatch(authActions.loginFlowAC(false))
            dispatch(authActions.errorAC(error.message))
        })
        .finally(() => {
            dispatch(appActions.setInitializingAC(false))
        })
}
export const LogoutTC = () => (dispatch: any) => {
    dispatch(appActions.setInitializingAC(true))
    authAPI.logOut()
        .then((data) => {
            dispatch(authActions.loginFlowAC(false))
            dispatch(authActions.infoAC(data.info))
        })
        .catch((error) => {
            dispatch(authActions.errorAC(error.error))
            dispatch(authActions.loginFlowAC(false))
        })
        .finally(() => {
            dispatch(appActions.setInitializingAC(false))
        })
}

export const authMeTC = () => (dispatch: Dispatch) => {
    dispatch(appActions.setInitializingAC(true))
    authAPI.me()
        .then(data => {
            dispatch(profileActions.setProfileDataAC(data))
            dispatch(authActions.loginFlowAC(true))
        })
        .catch(err => {
            dispatch(authActions.errorAC(err.message))
            dispatch(authActions.loginFlowAC(false))
        })
        .finally(() => {
            dispatch(appActions.setInitializingAC(false))
        })
}


export default authReducer;