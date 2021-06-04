import {authAPI} from '../../api/cards-api';
import {appActions} from "../appReducer/appReducer";



export const LOGIN = 'authReducer/SET-LOGIN' as const;
export const LOGOUT = 'authReducer/SET-LOGOUT' as const;
export const LOG_FLOW = 'authReducer/SET-LOG_FLOW' as const;


export type UserResponeType = {
    _id: string;
    email: string;
    name: string;
    avatar?: string;
    publicCardPacksCount: number; // количество колод
    created: number;
    updated: number;
    isAdmin: boolean;
    verified: boolean; // подтвердил ли почту
    rememberMe: boolean;
    error?: string;
}

type InitialStateType = {
    users: UserResponeType[],
    isLoggedIn: boolean,
    info: string

}

export const initialState: InitialStateType =  {
    users: [],
    isLoggedIn: false,
    info: '',

}

type PropertiesType<ActionType> = ActionType extends {[key: string]: infer ResponseType } ? ResponseType : never;
type ActionsType = ReturnType<PropertiesType<typeof authActions>>

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case LOGIN: {
            return ({
                ...state,
                users: [{...action.payload.data}],
                isLoggedIn: action.payload.isLoggedIn
            })
        }
        case LOGOUT: {
            return ({
                ...state,
                info: action.payload.info,
                isLoggedIn: action.payload.isLoggedIn,

            })
        }
        case LOG_FLOW: {
            return ({
                ...state,
                isLoggedIn: action.payload.isLoggedIn,
            })
        }

        default: return state
    }
}

export const authActions = {
    loginAC:(data:UserResponeType,isLoggedIn:boolean) => {
        return ({
            type: LOGIN,
            payload: {
                data,
                isLoggedIn
            },
        })
    },
    logoutAC : (info:string,isLoggedIn:boolean) => {
        return ({
            type: LOGOUT,
            payload: {
                info,
                isLoggedIn,

            },
        })
    },
    logFlowAC : (isLoggedIn:boolean) => {
        return ({
            type: LOG_FLOW,
            payload: {
                isLoggedIn,
            },
        })
    }

}


export const loginTC = (email: string, password: string, rememberMe?: boolean) => (dispatch: any) => {
    authAPI.logIn(email, password, rememberMe = true)
        .then(data => {
            dispatch(authActions.loginAC(data, true))
        }).catch((error) => {
        dispatch(appActions.setAppErrorAC(error.message))
    })
}
export const LogoutTC = () => (dispatch: any) => {
    authAPI.logOut()
        .then((data) => {
            dispatch(authActions.logoutAC(data.info,false))
        })
        .catch((error) => {
            dispatch(appActions.setAppErrorAC(error.error))
        })
}


export default authReducer;