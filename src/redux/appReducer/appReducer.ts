export const STATUS = 'appReducer/SET-STATUS' as const;
export const ERROR = 'appReducer/SET-ERROR' as const;
export const INITIALIZING = 'appReducer/SET-INITIALIZING' as const;


export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type InitialStateType = {
    status: RequestStatusType
    error: string
    initializing: boolean
}


const initialState: InitialStateType = {
    status: 'idle',
    error: '',
    initializing: false
}


type PropertiesType<ActionType> = ActionType extends { [key: string]: infer ResponseType } ? ResponseType : never;
type ActionsType = ReturnType<PropertiesType<typeof appActions>>

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case INITIALIZING: {
            return ({
                ...state,
                initializing: action.payload.value
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
    setInitializingAC(value: boolean) {
        return ({
            type: INITIALIZING,
            payload: {
                value
            }
        })
    },
}



export default appReducer;