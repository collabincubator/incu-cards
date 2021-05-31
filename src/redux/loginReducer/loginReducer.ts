import {authAPI} from '../../api/cards-api';

// export enum ACTIONS {
//     LOGIN = 'loginReducer/LOG-IN',
//     LOGOUT = 'loginReducer/LOG-OUT'
// }

const LOGIN = 'loginReducer/LOG-IN' as const;
const LOGOUT = 'loginReducer/LOG-OUT' as const;

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
    isLoggedIn: boolean
}

export const initialState: InitialStateType =  {
    users: [],
    isLoggedIn: false
}

type PropertiesType<ActionType> = ActionType extends {[key: string]: infer ResponseType } ? ResponseType : never;
type ActionsType = ReturnType<PropertiesType<typeof actions>>

export const loginReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case LOGIN: {
            return ({
                ...state,
                ...action.payload
            })
        }
        case LOGOUT: {
            return ({
                ...state,
                isLoggedIn: action.payload.value
            })
        }
        default: return state
    }
}

export const actions = {
    loginAC:(data: any) => {
        let [email, password, rememberMe, _id, publicCardPacksCount, avatar] = data;
        return ({
            type: LOGIN,
            payload: {
                email,
                password,
                rememberMe,
                _id,
                publicCardPacksCount,
                avatar
            }
        })
    },
    logOutAC: (value: boolean) => {
        return ({
            type: LOGOUT,
            payload: {
                value
            }
        })
    }
}

export const loginTC = (email: string, password: string, rememberMe: boolean) => (dispatch: any) => {
    return (
        authAPI.logIn(email, password, rememberMe)
            .then( data => {
                dispatch(actions.loginAC(data))
            }).catch((error)=>{
                console.log(error)
        })
    )
}
export const LogoutTC = () => (dispatch: any) => {
    return (
        authAPI.logOut()
            .then((data) => {
                dispatch(actions.logOutAC(true))
            })
            .catch((error) => {
                console.log(error)
            })
    )
}


export default loginReducer;