import {authAPI} from '../../api/cards-api';

// export enum ACTIONS {
//     LOGIN = 'loginReducer/LOG-IN',
//     LOGOUT = 'loginReducer/LOG-OUT'
// }

export const LOGIN = 'loginReducer/LOG-IN' as const;
export const LOGOUT = 'loginReducer/LOG-OUT' as const;
export const ERROR = 'loginReducer/ERROR' as const;
export const LOG_FLOW = 'loginReducer/LOG-FLOW' as const;

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
    error:string | null
}

export const initialState: InitialStateType =  {
    users: [],
    isLoggedIn: false,
    error:''
}

type PropertiesType<ActionType> = ActionType extends {[key: string]: infer ResponseType } ? ResponseType : never;
type ActionsType = ReturnType<PropertiesType<typeof actions>>

export const loginReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case LOG_FLOW: {
            return ({
                ...state,
                isLoggedIn: action.payload.isLoggedIn
            })
        }
        case LOGIN: {
            return ({
                ...state,
                users: [{...action.payload.data}]
            })
        }

        case ERROR: {
            return ({
                ...state,
                isLoggedIn: false,
                error: action.payload.error
            })
        }
        default: return state
    }
}

export const actions = {
    logFlowAC: (isLoggedIn: boolean) => {
        return ({
            type: LOG_FLOW,
            payload: {
                isLoggedIn
            }
        })
    },
    loginAC:(data: any) => {
        return ({
            type: LOGIN,
            payload: {
                data
            },
        })
    },
    LoginErrorAC: (error: string) => {
        return ({
            type: ERROR,
            payload: {
                error
            }
        })
    }
}


export const loginTC = (email: string, password: string, rememberMe?: boolean) => (dispatch: any) => {
    authAPI.logIn(email, password, rememberMe = true)
        .then(data => {
            dispatch(actions.loginAC(data))
            dispatch(actions.logFlowAC(true))
        }).catch((error) => {
        console.log(error)
        dispatch(actions.LoginErrorAC(error))
    })
}
export const LogoutTC = () => (dispatch: any) => {
    authAPI.logOut()
        .then((data) => {
            dispatch(actions.logFlowAC(false))
        })
        .catch((error) => {
            console.log(error)
        })
}


export default loginReducer;