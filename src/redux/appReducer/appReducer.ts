import {authAPI} from '../../api/cards-api';
import {Dispatch} from "redux";
import {authActions} from "../loginReducer/authReducer";

export const STATUS = 'appReducer/SET-STATUS' as const;
export const ERROR = 'appReducer/SET-ERROR' as const;
export const INITIALIZE = 'appReducer/SET-INITIALIZE' as const;
export const SET_PROFILE_DATA = 'appReducer/SET-PROFILE-DATA' as const;

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialStateType = {
    users: UserResponeType[],
    status: RequestStatusType
    error: string
    isInitialized: boolean
}
type UserResponeType = {
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

const initialState: InitialStateType = {
    users: [],
    status: 'idle',
    error: '',
    isInitialized: false
}


type PropertiesType<ActionType> = ActionType extends { [key: string]: infer ResponseType } ? ResponseType : never;
type ActionsType = ReturnType<PropertiesType<typeof appActions>>

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case SET_PROFILE_DATA: {
            return ({
                ...state,
                users: [{...action.payload.data}],
                isInitialized: action.payload.value
            })
        }
        case ERROR: {
            return ({
                ...state,
                error: action.payload.error
            })
        }
        case STATUS: {
            return ({
                ...state,
                status: action.payload.status
            })
        }
        default:
            return state
    }
}

export const appActions = {
    setAppErrorAC(error: string) {
        return ({
            type: ERROR,
            payload: {
                error
            }
        })
    },
    setAppStatusAC(status: RequestStatusType) {
        return ({
            type: STATUS,
            payload: {
                status
            }
        })
    },
    setInitializedAC(value: boolean) {
        return ({
            type: INITIALIZE,
            payload: {
                value
            }
        })
    },
    setProfileDataAC(data: any, value: boolean) {
        return ({
            type: SET_PROFILE_DATA,
            payload: {
                data,
                value
            }
        })
    },
}
export const fetchProfileDataTC = () => (dispatch: Dispatch) => {
    authAPI.me()
        .then(data => {
            dispatch(authActions.logFlowAC(true))
            dispatch(appActions.setProfileDataAC(data, true))
        })
        .catch(err => {
            dispatch(appActions.setAppErrorAC(err.message))
        })
}


export default appReducer;