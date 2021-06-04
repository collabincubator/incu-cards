import {authAPI} from "../../api/cards-api";

const RESTORE = 'restoreReducer/RESTORE' as const;
const ERROR = 'restoreReducer/ERROR' as const;
const LOADING = 'restoreReducer/LOADING' as const;

type InitialStateType = {
    email: boolean
    from: string
    message: string
    error: string
    loading: boolean
}

type PropertiesType<ActionType> = ActionType extends { [key: string]: infer ResponseType } ? ResponseType : never;
type ActionsType = ReturnType<PropertiesType<typeof actions>>


export const initialState: InitialStateType = {
    email: false,
    error: '',
    loading: false,
    from: 'test-front-admin <valtika>',
    message: `<div style="background-color: lime; padding: 15px">	
	password recovery link: 
	<a href='http://localhost:3000/#/auth/change-password/$token$'>
	link</a></div>` // хтмп-письмо, вместо $token$ бэк вставит токен
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

const actions = {
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

export const RestoreMailTC = (email: string, from: string, message: string) => (dispatch: any) => {
    dispatch(actions.restoreEmailLoadingAC(true))
    authAPI.restorePassword(email, from, message)
        .then(data => {
            console.log(data.info)
            dispatch(actions.restoreEmailSuccessAC(true))
        }).catch((error) => {
        dispatch(actions.restoreEmailErrorAC('error'))
        console.log('error')
    })

}
export default restorePassReducer;