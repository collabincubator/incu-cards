import {authAPI, ProfileResponseType} from '../../api/cards-api';
import {Dispatch} from 'redux';

export const SET_PROFILE_DATA = 'profileReducer/SET-PROFILE-DATA' as const;
export const SET_PROFILE_UPDATE = 'profileReducer/SET_PROFILE_UPDATE' as const;

type InitialStateType = {
    profile: null | ProfileResponseType
}

export const initialState: InitialStateType = {
    profile: null as ProfileResponseType | null,
}

type PropertiesType<ActionType> = ActionType extends { [key: string]: infer ResponseType } ? ResponseType : never;
type ActionsType = ReturnType<PropertiesType<typeof profileActions>>

const profileReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case SET_PROFILE_DATA: {
            return ({
                ...state,
                profile: {...action.payload.data}
            })
        }
        case SET_PROFILE_UPDATE: {
            return ({
                ...state,
                profile: {...state.profile, ...action.payload.data}

            })
        }
        default:
            return state
    }
}
export const profileActions = {
    setProfileDataAC: (data: ProfileResponseType) => {
        return ({
            type: SET_PROFILE_DATA,
            payload: {
                data
            }
        })
    },
    setProfileUpdateAC: (data: any) => {
        return({
            type: SET_PROFILE_UPDATE,
            payload: {
                data
            }
        })
    }
}
export const changeProfileNameTC = (name: string) => (dispatch: Dispatch) => {
    authAPI.updateMe(name)
        .then(data => {
            profileActions.setProfileUpdateAC(data)
        })
}



export default profileReducer;