
export const PROFILE_ACTION = 'profileReducer/SET-PROFILE' as const;

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

type ActionsType = ReturnType<typeof setProfileAC>;


export const initialState: InitialStateType =  {
    profileInfo: {id: 1, sex: 'male', email: 'valakas@gmail.com', dateOfBirth: '29.02.1966', city: 'Samara', country: 'Ukraine', status: '---'}
}

const profileReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case PROFILE_ACTION: {
            return({
                ...state,
                profileInfo: action.data
            })
        }
        default:
            return state
    }
}

const setProfileAC = (data: any) => {
    return({
        type: PROFILE_ACTION,
        data
    })
}

// export const fetchProfileTC = () => (dispatch: any) => {
//     console.log('fetch')
//     authAPI.me()
//         .then(data => {
//             dispatch(setProfileAC(data))
//             console.log(data)
//             dispatch(actions.logFlowAC(true))
//         })
// }

export default profileReducer;