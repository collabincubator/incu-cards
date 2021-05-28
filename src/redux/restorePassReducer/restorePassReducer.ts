export const RESTORE_ACTION: string = 'registrationReducer/RESTORE-ACTION';

type InitialStateType = {
    email: string
}

type ActionsType = RestoreActionType;

export const initialState: InitialStateType =  {
    email: 'valakas54@gmail.com'
}

const restorePassReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        default: return state
    }
}

type RestoreActionType = {
    type: typeof RESTORE_ACTION
}

const restoreAction: RestoreActionType = {
    type: RESTORE_ACTION
}

export default restorePassReducer;