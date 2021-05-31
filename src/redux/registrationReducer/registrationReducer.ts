import {authAPI} from "../../api/cards-api";

export const REGISTRATION_ACTION: string = 'registrationReducer/REG-ACTION';


type InitialStateType = {
    registrationSuccess: boolean
}
const initialState = {
    registrationSuccess:false
}
type PropertiesType<ActionType> = ActionType extends {[key: string]: infer ResponseType } ? ResponseType : never;
type ActionsType = ReturnType<PropertiesType<typeof actions>>

const registrationReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'REGISTRATION': {
            return {
                ...state,
                registrationSuccess: action.payload.registrationSuccess
            }
        }
        default:
            return state
    }
}


export const actions = {
    registrationAC: () => {
        return ({
            type: 'REGISTRATION',
            payload: {
                registrationSuccess: true
            }
        })
    }

}


export const RegistrationTC = (email: string, password: string) => (dispatch: any) => {
    return (
        authAPI.registration(email, password)
            .then((data) => {
                console.log(data)
                dispatch(actions.registrationAC())
            })
            .catch((error) => {
                console.log(error)
            })
    )
}

export default registrationReducer;