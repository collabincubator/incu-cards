export const LOGIN_ACTION: string = 'loginReducer/TEST-REDUCER';

type UserType = {
    id: number,
    login: string
    email: string
    password: string
}

type InitialStateType = {
    users: UserType[]
}

type ActionsType = loginAction;


export const initialState: InitialStateType =  {
    users: [
        {id: 1, login: 'testName', email: 'glek@gmail.com', password: 'valakas54'}
    ]
}

const loginReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        default: return state
    }
}

type loginAction = {
    type: typeof LOGIN_ACTION
}

const loginAction = {
    type: LOGIN_ACTION
}

export default loginReducer;