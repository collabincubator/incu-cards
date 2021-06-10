import {Dispatch} from "redux";
import {packType, packsAPI} from "../../api/cards-api";
import {appActions} from "../appReducer/appReducer";
import {AppStateType} from '../store';

export const SET_PACKS = 'packsReducer/SET-PACKS' as const;
export const SET_USER_PACKS = 'packsReducer/SET-USER-PACKS' as const;
export const SET_PAGE_COUNT = 'packsReducer/SET-PAGE-COUNT' as const;
export const SET_PAGE_NUMBER = 'packsReducer/SET-PAGE-NUMBER' as const;
export const SET_MIN_CARDS_COUNT = 'packsReducer/SET-MIN-CARDS-COUNT' as const;
export const SET_MAX_CARDS_COUNT = 'packsReducer/SET-MAX-CARDS-COUNT' as const;
export const SET_PACKS_TOTAL_COUNT = 'packsReducer/SET-PACKS-TOTAL-COUNT' as const;
export const SET_SORT_PACKS = 'packsReducer/SET-SORT-PACKS-ORDER' as const;


export type PacksParamsType = {
    packName?: 'english'
    min?: number
    max?: number
    page?: number // выбранная страница
    pageCount?: number // количество элементов на странице
    user_id?: string
    sortPacks?: string
}

type InitialStateType = {
    cardPacks:packType[]
    packsParams: PacksParamsType
    cardPacksTotalCount: number
}

export const initialState: InitialStateType = {
    cardPacks: [] as packType[],
    packsParams: {
        min: 1,
        max: 20,
        page: 1,
        pageCount: 10,
        sortPacks: '0updated'
    },
    cardPacksTotalCount: 0
}



type PropertiesType<ActionType> = ActionType extends { [key: string]: infer ResponseType } ? ResponseType : never;
type ActionsType = ReturnType<PropertiesType<typeof packsActions>>

export const packsReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case SET_PACKS:{
            return ({
                ...state,
                cardPacks: action.payload.packs
            })
        }
        case SET_MIN_CARDS_COUNT: {
            return ({
                ...state,
                packsParams: {...state.packsParams, min: action.payload.min}
            })
        }
        case SET_MAX_CARDS_COUNT: {
            return ({
                ...state,
                packsParams: {...state.packsParams, max: action.payload.max}
            })
        }
        case SET_PAGE_COUNT: {
            return ({
                ...state,
                packsParams: {...state.packsParams, pageCount: action.payload.pageCount}
            })
        }
        case SET_PAGE_NUMBER: {
            return ({
                ...state,
                packsParams: {...state.packsParams, page: action.payload.page}
            })
        }
        case SET_PACKS_TOTAL_COUNT: {
            return ({
                ...state,
                cardPacksTotalCount: action.payload.cardPacksTotalCount
            })
        }
        case SET_SORT_PACKS: {
            return ({
                ...state,
                packsParams: {...state.packsParams, sortPacks: action.payload.sortPacks}
            })
        }
        // case SET_USER_PACKS:{
        //     return ({
        //         ...state,
        //         cardPacks: action.payload.cards
        //     })
        // }

        default:
            return state
    }
}

export const packsActions = {
    setPacks(packs: packType[]) {
        return ({
            type: SET_PACKS,
            payload: {
                packs
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
    setPageAC(page: number) {
        return ({
            type: SET_PAGE_NUMBER,
            payload: {
                page
            }
        })
    },
    setMinPacksCountAC(min: number) {
        return ({
            type: SET_MIN_CARDS_COUNT,
            payload: {
                min
            }
        })
    },
    setMaxPacksCountAC(max: number) {
        return ({
            type: SET_MAX_CARDS_COUNT,
            payload: {
                max
            }
        })
    },
    setTotalPacksCountAC(cardPacksTotalCount: number) {
        return ({
            type: SET_PACKS_TOTAL_COUNT,
            payload: {
                cardPacksTotalCount
            }
        })
    },
    setSortPacksAC(order: number, sortBy: string) {
        return ({
            type: SET_SORT_PACKS,
            payload: {
                sortPacks: `${order}${sortBy}`
            }
        })
    },
    setUserPacksAC(userId: string) {
        return ({
            type: SET_USER_PACKS,
            payload: {
                userId
            }
        })
    },
}

export const requestPacksTC = () => async (dispatch: Dispatch, getState: () => AppStateType) => {
    dispatch(appActions.setAppStatusAC('loading'));
    //названия параметров в стейте должно соответствовать параметрам get запроса
    const params: PacksParamsType = getState().packsReducer.packsParams
    try {
        const res = await packsAPI.getPacks(params)
        dispatch(packsActions.setPacks(res.cardPacks))
        dispatch(packsActions.setTotalPacksCountAC(res.cardPacksTotalCount))
        dispatch(appActions.setAppStatusAC('succeeded'))
    }
    catch (err) {
        dispatch(appActions.setAppErrorAC('error'))
        dispatch(appActions.setAppStatusAC('failed'))
    }
}
export const requestUserCardsTC = (user_id:string | undefined) => async (dispatch: Dispatch) => {
    dispatch(appActions.setAppStatusAC('loading'))
    let res = await packsAPI.getUserPacks(1000,4,user_id)
    try {
        dispatch(packsActions.setPacks(res.cardPacks))
        dispatch(appActions.setAppStatusAC('succeeded'))
    }
    catch (err) {
        dispatch(appActions.setAppErrorAC('error'))
        dispatch(appActions.setAppStatusAC('failed'))
    }
}
export const createPackTC = () => async (dispatch: Dispatch) => {
    dispatch(appActions.setAppStatusAC('loading'))
    let res = await packsAPI.createPack()
    let res1 = await packsAPI.getPacks()
    try {
        dispatch(packsActions.setPacks(res1.cardPacks))
        dispatch(appActions.setAppStatusAC('succeeded'))
    }
    catch (err) {
        dispatch(appActions.setAppErrorAC('error'))
        dispatch(appActions.setAppStatusAC('failed'))
    }
}
export const deletePackTC = (packId:string) => async (dispatch: Dispatch) => {
    dispatch(appActions.setAppStatusAC('loading'))
    let res = await packsAPI.deletePack(packId)
    let res1 = await packsAPI.getPacks()
    try {
        dispatch(packsActions.setPacks(res1.cardPacks))
        dispatch(appActions.setAppStatusAC('succeeded'))
    }
    catch (err) {
        dispatch(appActions.setAppErrorAC('error'))
        dispatch(appActions.setAppStatusAC('failed'))
    }
}
export const updatePackTC = (packId:string,name:string) => async (dispatch: Dispatch) => {
    dispatch(appActions.setAppStatusAC('loading'))
    let res = await packsAPI.updatePack(packId,name)
    let res1 = await packsAPI.getPacks()
    try {
        dispatch(packsActions.setPacks(res1.cardPacks))
        dispatch(appActions.setAppStatusAC('succeeded'))
    }
    catch (err) {
        dispatch(appActions.setAppErrorAC('error'))
        dispatch(appActions.setAppStatusAC('failed'))
    }
}
