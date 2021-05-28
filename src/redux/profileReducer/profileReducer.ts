export const PROFILE_ACTION: string = 'profileReducer/TEST-REDUCER';

type ProfileInfoType = {
    id: number,
    sex: string
    email: string
    dateOfBirth: string
    city: string
    country: string
    status: string
}

type InitialStateType = {
    profileInfo: ProfileInfoType
}

type ActionsType = loginAction;


export const initialState: InitialStateType =  {
    profileInfo: {id: 1, sex: 'male', email: 'valakas@gmail.com', dateOfBirth: '29.02.1966', city: 'Samara', country: 'Ukraine', status: '---'}
}

const profileReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        default: return state
    }
}

type loginAction = {
    type: typeof PROFILE_ACTION
}

const loginAction = {
    type: PROFILE_ACTION
}

export default profileReducer;