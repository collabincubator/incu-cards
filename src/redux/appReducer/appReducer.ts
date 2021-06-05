import {authAPI} from '../../api/cards-api';
import {Dispatch} from "redux";


export const STATUS = 'appReducer/SET-STATUS' as const;
export const ERROR = 'appReducer/SET-ERROR' as const;
export const INITIALIZE = 'appReducer/SET-INITIALIZE' as const;
export const SET_PROFILE_DATA = 'appReducer/SET-PROFILE-DATA' as const;

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type InitialStateType = {
    status: RequestStatusType
    error: string
    isInitialized: boolean
}


const initialState: InitialStateType = {
    status: 'idle',
    error: '',
    isInitialized: false
}


type PropertiesType<ActionType> = ActionType extends { [key: string]: infer ResponseType } ? ResponseType : never;
type ActionsType = ReturnType<PropertiesType<typeof appActions>>

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case INITIALIZE: {
            return ({
                ...state,
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
}



export default appReducer;