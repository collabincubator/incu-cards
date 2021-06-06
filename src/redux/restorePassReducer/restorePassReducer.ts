import {authAPI} from "../../api/cards-api";

const RESTORE = 'restoreReducer/RESTORE' as const;
const ERROR = 'restoreReducer/ERROR' as const;
const LOADING = 'restoreReducer/LOADING' as const;

type InitialStateType = {
    email: boolean
    error: string
    loading: boolean
}

type PropertiesType<ActionType> = ActionType extends { [key: string]: infer ResponseType } ? ResponseType : never;
type ActionsType = ReturnType<PropertiesType<typeof restoreActions>>


export const initialState: InitialStateType = {
    email: false,
    error: '',
    loading: false,
}

const restorePassReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case RESTORE : {
            return ({
                ...state,
                email: action.payload.email,
                loading: false,
                error: ''
            })

        }
        case ERROR : {
            return ({
                ...state,
                email: false,
                loading: false,
                error: action.payload.error
            })

        }
        case LOADING : {
            return ({
                ...state,
                email: false,
                loading: action.payload.loading,
                error: ''
            })

        }
        default:
            return state
    }
}

export const restoreActions = {
    restoreEmailSuccessAC(email: boolean) {
        return ({
            type: RESTORE,
            payload: {
                email,
            }
        })
    },
    restoreEmailLoadingAC(loading: boolean) {
        return ({
            type: LOADING,
            payload: {
                loading,
            }
        })
    },
    restoreEmailErrorAC(error: string) {
        return ({
            type: ERROR,
            payload: {
                error,
            }
        })
    }
}

export const RestoreMailTC = (email: string) => (dispatch: any) => {
    dispatch(restoreActions.restoreEmailLoadingAC(true))
    authAPI.restorePassword(email)
        .then(data => {
            console.log(data.info)
            dispatch(restoreActions.restoreEmailSuccessAC(true))
        }).catch((error) => {
        dispatch(restoreActions.restoreEmailErrorAC('error'))
        console.log('error')
    })

}
export default restorePassReducer;