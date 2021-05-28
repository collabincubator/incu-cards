export const CHANGEPASS_ACTION: string = 'registrationReducer/CHANGEPASS-ACTION';

type InitialStateType = {
    oldPassword: string,
    newPassword: string
}

type ActionsType = ChangePassActionType;

export const initialState: InitialStateType =  {
    oldPassword: 'gladiko',
    newPassword: 'gladilko'
}

const changePassReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        default: return state
    }
}

type ChangePassActionType = {
    type: typeof CHANGEPASS_ACTION
}

const changePassAction: ChangePassActionType = {
    type: CHANGEPASS_ACTION
}

export default changePassReducer;