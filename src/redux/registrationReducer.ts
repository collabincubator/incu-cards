export const REGISTRATION_ACTION: string = 'registrationReducer/REG-ACTION';

type RegistrationDataType = {
    email: string
    sex: string
    dateOfBirth: string
    city: string
    country: string
}

type InitialStateType = {
    profileInfo: RegistrationDataType
}

type ActionsType = RegActionType;

export const initialState: InitialStateType =  {
    profileInfo: { email: 'valakas@gmail.com', sex: 'male', dateOfBirth: '29.02.1966', city: 'Samara', country: 'Ukraine' }
}

const registrationReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        default: return state
    }
}

type RegActionType = {
    type: typeof REGISTRATION_ACTION
}

const regAction: RegActionType = {
    type: REGISTRATION_ACTION
}

export default registrationReducer;