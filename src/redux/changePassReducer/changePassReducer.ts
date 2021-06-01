import {authAPI} from "../../api/cards-api";

export const CHANGE_PASS: string = 'changePassreducer/CHANGE_PASS';


const CHANGE = 'changePasswordReducer/CHANGE' as const;
const ERROR = 'changePasswordReducer/ERROR' as const;
const LOADING = 'changePasswordReducer/LOADING' as const;


type InitialStateType = {
    successChangePass:boolean
    loading:boolean
    error:string
}

type PropertiesType<ActionType> = ActionType extends {[key: string]: infer ResponseType } ? ResponseType : never;
type ActionsType = ReturnType<PropertiesType<typeof actions>>


export const initialState: InitialStateType =  {
    successChangePass:false,
    loading:false,
    error:''
}

const changePassReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case CHANGE: {
            return ({
                ...state,
                successChangePass:action.payload.success,
                loading:false,
                error:''
            })
        }
        case ERROR: {
            return ({
                ...state,
                successChangePass:false,
                loading:false,
                error:action.payload.error
            })
        }
        case LOADING: {
            return ({
                ...state,
                successChangePass:false,
                loading:action.payload.loading,
                error:''
            })
        }
        default: return state
    }
}

const actions = {
    successChangePassAC (success:boolean) {
        return ({
            type:CHANGE,
            payload: {
                success
            }
        })
    },
    loagingAC (loading:boolean) {
        return ({
            type:LOADING,
            payload: {
                loading
            }
        })
    },
    errorAc (error:string) {
        return ({
            type:ERROR,
            payload: {
                error
            }
        })
    }
}
export const RestorePassTC = (password:string,resetPasswordToken:string) => (dispatch: any) => {
        dispatch(actions.loagingAC(true))
        authAPI.setNewPassword(password,resetPasswordToken)
            .then( data => {
                console.log(`${data.data.info}`)
               dispatch(actions.successChangePassAC(true))
                dispatch(actions.loagingAC(false))
            }).catch((error)=>{
            dispatch(actions.errorAc('error'))
        })
}

export default changePassReducer;