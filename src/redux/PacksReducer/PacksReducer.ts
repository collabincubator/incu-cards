import {Dispatch} from "redux";
import {packType, packsAPI} from "../../api/cards-api";
import {appActions} from "../appReducer/appReducer";
import { authActions } from "../authReducer/authReducer";
import {AppStateType} from '../store';

export const SET_PACKS = 'packsReducer/SET-PACKS' as const;
export const SET_PAGE_COUNT = 'packsReducer/SET-PAGE-COUNT' as const;
export const SET_PAGE_NUMBER = 'packsReducer/SET-PAGE-NUMBER' as const;
export const SET_RANGE_SIZE_PACKS = 'packsReducer/SET-RANGE-SIZE-PACKS' as const;
export const SET_PACKS_TOTAL_COUNT = 'packsReducer/SET-PACKS-TOTAL-COUNT' as const;
export const SET_SORT_PACKS = 'packsReducer/SET-SORT-PACKS-ORDER' as const;
export const SET_ONLY_MY_MODE = 'packsReducer/SET-ONLY-MY-MODE' as const;


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
    pageCounts: number[]
    onlyMy: boolean
}

export const initialState: InitialStateType = {
    cardPacks: [] as packType[],
    packsParams: {
        min: 0,
        max: 20,
        page: 1,
        pageCount: 10,
        sortPacks: '0updated',
    },
    cardPacksTotalCount: 0,
    pageCounts: [10, 20, 30, 50, 100],
    onlyMy: false
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
        case SET_RANGE_SIZE_PACKS: {
            return ({
                ...state,
                packsParams: {...state.packsParams, ...action.payload}
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
        case SET_ONLY_MY_MODE : {
            return ({
                ...state,
                onlyMy: action.payload.onlyMy
            })
        }
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

    setRangeSizePacks (rangeSize: number[]) {
        return ({
            type: SET_RANGE_SIZE_PACKS,
            payload: {
                min: rangeSize[0],
                max: rangeSize[1]
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
    setOnlyMyMode(onlyMy: boolean) {
        return ({
            type: SET_ONLY_MY_MODE,
            payload: {
                onlyMy
            }
        })
    },
}

export const requestPacksTC = () => async (dispatch: Dispatch, getState: () => AppStateType) => {
    dispatch(appActions.setAppStatusAC('loading'));
    //названия параметров в стейте должно соответствовать параметрам get запроса
    let params: PacksParamsType = getState().packsReducer.packsParams;
    delete params.user_id
    params = getState().packsReducer.onlyMy ? {...params, user_id: getState().profileReducer.profile?._id} : params;
    try {
        const res = await packsAPI.getPacks(params)
        dispatch(packsActions.setPacks(res.cardPacks))
        dispatch(packsActions.setTotalPacksCountAC(res.cardPacksTotalCount))
        dispatch(appActions.setAppStatusAC('succeeded'))
    }
    catch (err) {
        dispatch(appActions.setAppErrorAC('error'))
        dispatch(appActions.setAppStatusAC('failed'))
        dispatch(authActions.loginFlowAC(false))

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
