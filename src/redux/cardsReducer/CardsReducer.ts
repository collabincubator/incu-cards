import {cardsAPI, cardType} from "../../api/cards-api";
import {Dispatch} from "redux";
import {AppStateType} from "../store";
import {appActions} from "../appReducer/appReducer";
import {batch} from 'react-redux';


const SET_CARDS = 'changePasswordReducer/SET_CARDS' as const;
const SET_PAGE_COUNT = 'cardsReducer/SET-PAGE-COUNT' as const;
const SET_PAGE_NUMBER = 'cardsReducer/SET-PAGE-NUMBER' as const;
const SET_RANGE_SIZE_CARDS = 'cardsReducer/SET-RANGE-SIZE-CARDS' as const;
const SET_SORT_CARDS = 'cardsReducer/SET-RANGE-CARDS' as const;
const SET_IS_OPEN_POPUP = 'cardsReducer/SET-IS-OPEN-POPUP' as const;
const SET_CARDS_TOTAL_COUNT = 'cardsReducer/SET-CARDS-TOTAL-COUNT' as const;

export type CardsParamsType = {
    cardsPack_id?: string
    cardQuestion?: string
    cardAnswer?: string
    min?: number
    max?: number
    sortCards?: string
    page?: number
    pageCount?: number
}

type InitialStateType = {
    cards: cardType[]
    cardsParams: CardsParamsType
    cardsTotalCount: number
    activePopupId: string | undefined
}

type PropertiesType<ActionType> = ActionType extends { [key: string]: infer ResponseType } ? ResponseType : never;
type ActionsType = ReturnType<PropertiesType<typeof cardsActions>>


export const initialState: InitialStateType = {
    cards: [],
    cardsParams: {
        min: 0,
        max: 1000,
        page: 1,
        pageCount: 1000
    },
    cardsTotalCount: 0,
    activePopupId: undefined
}

export const cardsReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case SET_CARDS: {
            return ({
                ...state,
                cards: action.payload.cards
            })
        }
        case SET_RANGE_SIZE_CARDS: {
            return ({
                ...state,
                cardsParams: {...state.cardsParams, ...action.payload}
            })
        }
        case SET_PAGE_COUNT: {
            return ({
                ...state,
                cardsParams: {...state.cardsParams, pageCount: action.payload.pageCount}
            })
        }
        case SET_PAGE_NUMBER: {
            return ({
                ...state,
                cardsParams: {...state.cardsParams, page: action.payload.page}
            })
        }
        case SET_CARDS_TOTAL_COUNT: {
            return ({
                ...state,
                cardsTotalCount: action.payload.cardsTotalCount
            })
        }
        case SET_SORT_CARDS: {
            return ({
                ...state,
                cardsParams: {...state.cardsParams, sortCards: action.payload.sortCards}
            })
        }
        case SET_IS_OPEN_POPUP: {
            return ({
                ...state,
                ...action.payload
            })
        }
        default:
            return state
    }
}

export const cardsActions = {
    setCardsAC(cards: cardType[]) {
        return ({
            type: SET_CARDS,
            payload: {
                cards
            }
        })
    },
    setRangeSizeCardsAC (rangeCardsSize: number[]) {
        return ({
            type: SET_RANGE_SIZE_CARDS,
            payload: {
                min: rangeCardsSize[0],
                max: rangeCardsSize[1]
            }
        })
    },
    setPageAC(page: number) {
        return ({
            type: SET_PAGE_NUMBER,
            payload: {
                page
            }
        })
    },
    setPageCountAC(pageCount: number) {
        return ({
            type: SET_PAGE_COUNT,
            payload: {
                pageCount
            }
        })
    },
    setCardsTotalCountAC (cardsTotalCount: number) {
        return ({
            type: SET_CARDS_TOTAL_COUNT,
            payload: {
                cardsTotalCount
            }
        })
    },
    setSortCardsAC (sortCards: string) {
        return ({
            type: SET_SORT_CARDS,
            payload: {
                sortCards
            }
        })
    },
    setActivePopupIdAC(activePopupId: string) {
        return ({
            type: SET_IS_OPEN_POPUP,
            payload: {
                activePopupId
            }
        })
    }
}
export const requestCardsTC = (cardsPackId: string ) => async (dispatch: Dispatch) => {
    const params = {
        cardsPack_id: cardsPackId
    }
    dispatch(appActions.setAppStatusAC('loading'));
    try {
        const res = await cardsAPI.getCards(params)
        batch(()=>{
            dispatch(cardsActions.setCardsAC(res.cards))
            dispatch(cardsActions.setCardsTotalCountAC(res.cardsTotalCount))
        })

    } catch (err) {
        batch(()=>{
            dispatch(appActions.setAppErrorAC('error'))
            dispatch(appActions.setAppStatusAC('failed'))
        })
    }
}
export const requestCardsPopupTC = (cardsPackId: string) => async (dispatch: Dispatch, getState: () => AppStateType) => {
    const params = {
        min: 0,
        max: 1000,
        page: 1,
        pageCount: 1000,
        cardsPack_id: cardsPackId
    }
    dispatch(appActions.setAppStatusAC('loading'));
    try {
        const res = await cardsAPI.getCards(params)
        batch(()=>{
            dispatch(cardsActions.setCardsAC(res.cards))
            dispatch(cardsActions.setCardsTotalCountAC(res.cardsTotalCount))
            dispatch(cardsActions.setActivePopupIdAC(cardsPackId))
        })
    } catch (err) {
        batch(()=>{
            dispatch(appActions.setAppErrorAC('error'))
            dispatch(appActions.setAppStatusAC('failed'))
        })
    }
}

export default cardsReducer;
