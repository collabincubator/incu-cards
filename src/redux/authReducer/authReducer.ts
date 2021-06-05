import {authAPI, serverUserType} from '../../api/cards-api';
import {Dispatch} from "redux";


export const SET_USER_DATA = 'authReducer/SET_USER_DATA' as const;
export const LOGIN_FLOW = 'authReducer/SET-LOGIN' as const;
export const LOADING = 'authReducer/SET-LOADING' as const;
export const ERROR = 'authReducer/SET-ERROR' as const;
export const INFO = 'authReducer/SET-INFO' as const;


type InitialStateType = {
    user: null | serverUserType
    isLoggedIn: boolean
    loading: boolean
    error: string
    info: string
}

export const initialState: InitialStateType = {
    user: null as serverUserType | null,
    isLoggedIn: false,
    loading: false,
    error: '',
    info: ''
}

type PropertiesType<ActionType> = ActionType extends { [key: string]: infer ResponseType } ? ResponseType : never;
type ActionsType = ReturnType<PropertiesType<typeof authActions>>

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case SET_USER_DATA: {
            return ({
                ...state,
                user: {...action.payload.data},
            })
        }
        case LOGIN_FLOW: {
            return ({
                ...state,
                isLoggedIn: action.payload.isLoggedIn
            })
        }
        case LOADING: {
            return ({
                ...state,
                loading: action.payload.loading
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
    setUserDataAC: (data: serverUserType) => {
        return ({
            type: SET_USER_DATA,
            payload: {
                data
            },
        })

    },
    loginFlowAC: (isLoggedIn: boolean) => {
        return ({
            type: LOGIN_FLOW,
            payload: {
                isLoggedIn
            } as InitialStateType,
        })
    },
    loadingAC: (loading: boolean) => {
        return ({
            type: LOADING,
            payload: {
                loading
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
    dispatch(authActions.loadingAC(true))
    authAPI.logIn(email, password, rememberMe = true)
        .then(data => {
            dispatch(authActions.setUserDataAC(data))
            dispatch(authActions.loginFlowAC(true))
        })
        .catch((error) => {
            dispatch(authActions.loginFlowAC(false))
            dispatch(authActions.errorAC(error.message))
        })
        .finally(() => {
            dispatch(authActions.loadingAC(false))
        })
}
export const LogoutTC = () => (dispatch: any) => {
    dispatch(authActions.loadingAC(true))
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
            dispatch(authActions.loadingAC(false))
        })
}

export const authMeTC = () => (dispatch: Dispatch) => {
    dispatch(authActions.loadingAC(true))
    authAPI.me()
        .then(data => {
            dispatch(authActions.setUserDataAC(data))
            dispatch(authActions.loginFlowAC(true))
        })
        .catch(err => {
            dispatch(authActions.errorAC(err.message))
            dispatch(authActions.loginFlowAC(false))
        })
        .finally(() => {
            dispatch(authActions.loadingAC(false))
        })
}


export default authReducer;