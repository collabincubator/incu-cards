import {cardsAPI, cardType} from "../../api/cards-api";
import {Dispatch} from "redux";
import {AppStateType} from "../store";
import {appActions} from "../appReducer/appReducer";


const SET_CARDS = 'changePasswordReducer/SET_CARDS' as const;


type InitialStateType = {
    cards: cardType[]

}

type PropertiesType<ActionType> = ActionType extends { [key: string]: infer ResponseType } ? ResponseType : never;
type ActionsType = ReturnType<PropertiesType<typeof cardsActions>>


export const initialState: InitialStateType = {
    cards: [],
}

export const cardsReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case SET_CARDS: {
            return ({
                ...state,
                cards: action.payload.cards
            })
        }
        default:
            return state
    }
}

export const cardsActions = {
    setCards(cards: cardType[]) {
        return ({
            type: SET_CARDS,
            payload: {
                cards
            }
        })
    },
}
export const requestCardsTC = (cardsPackId: string ) => async (dispatch: Dispatch) => {
    dispatch(appActions.setAppStatusAC('loading'));
    try {
        const res = await cardsAPI.getCards(cardsPackId)
        dispatch(cardsActions.setCards(res.cards))
    } catch (err) {
        dispatch(appActions.setAppErrorAC('error'))
        dispatch(appActions.setAppStatusAC('failed'))
    }
}

export default cardsReducer;
