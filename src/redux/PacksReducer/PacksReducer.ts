import {Dispatch} from "redux";
import {packType, packAPI} from "../../api/cards-api";
import {appActions} from "../appReducer/appReducer";


export const GET_PACKS = 'packsReducer/GET_PACKS' as const;
export const GET_USER_PACKS = 'packsReducer/GET_USER_PACKS' as const;




type InitialStateType = {
    cardPacks:packType[]
    cardPacksTotalCount: number // количество колод
    maxCardsCount: number
    minCardsCount: number
    page: number // выбранная страница
    pageCount: number // количество элементов на странице
}

export const initialState: InitialStateType = {
    cardPacks: [] as packType[] ,
    cardPacksTotalCount: 0,
    maxCardsCount: 20,
    minCardsCount: 10,
    page: 1 ,
    pageCount: 0 ,
}

type PropertiesType<ActionType> = ActionType extends { [key: string]: infer ResponseType } ? ResponseType : never;
type ActionsType = ReturnType<PropertiesType<typeof packsActions>>

export const packsReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case GET_PACKS:{
            return ({
                ...state,
                cardPacks:action.payload.cards
            })
        }
        // case GET_USER_PACKS:{
        //     return ({
        //         ...state,
        //         cardPacks:action.payload.cards
        //     })
        // }
        default:
            return state
    }
}

export const packsActions = {
    getPacksAC (cards:packType[])  {
        return ({
            type:GET_PACKS,
            payload : {
                cards
            }
        })
    },
    getUserPacksAC (userId:string)  {
        return ({
            type:GET_USER_PACKS,
            payload : {
                userId
            }
        })
    },
}
export const requestCardsTC = () => async (dispatch: Dispatch) => {
    dispatch(appActions.setAppStatusAC('loading'))
    let res = await packAPI.getPacks()
    try {
        dispatch(packsActions.getPacksAC(res.cardPacks))
        dispatch(appActions.setAppStatusAC('succeeded'))
    }
    catch (err) {
        dispatch(appActions.setAppErrorAC('error'))
        dispatch(appActions.setAppStatusAC('failed'))
    }
}
export const requestUserCardsTC = (user_id:string) => async (dispatch: Dispatch) => {
    dispatch(appActions.setAppStatusAC('loading'))
    let res = await packAPI.getUserPacks(1000,4,user_id)
    try {
        dispatch(packsActions.getPacksAC(res.cardPacks))
        dispatch(appActions.setAppStatusAC('succeeded'))
    }
    catch (err) {
        dispatch(appActions.setAppErrorAC('error'))
        dispatch(appActions.setAppStatusAC('failed'))
    }
}
export const createPackTC = () => async (dispatch: Dispatch) => {
    dispatch(appActions.setAppStatusAC('loading'))
    let res = await packAPI.createPack()
    let res1 = await packAPI.getPacks()
    try {
        dispatch(packsActions.getPacksAC(res1.cardPacks))
        dispatch(appActions.setAppStatusAC('succeeded'))
    }
    catch (err) {
        dispatch(appActions.setAppErrorAC('error'))
        dispatch(appActions.setAppStatusAC('failed'))
    }
}
export const deletePackTC = (packId:string) => async (dispatch: Dispatch) => {
    dispatch(appActions.setAppStatusAC('loading'))
    let res = await packAPI.deletePack(packId)
    let res1 = await packAPI.getPacks()
    try {
        dispatch(packsActions.getPacksAC(res1.cardPacks))
        dispatch(appActions.setAppStatusAC('succeeded'))
    }
    catch (err) {
        dispatch(appActions.setAppErrorAC('error'))
        dispatch(appActions.setAppStatusAC('failed'))
    }
}
export const updatePackTC = (packId:string,name:string) => async (dispatch: Dispatch) => {
    dispatch(appActions.setAppStatusAC('loading'))
    let res = await packAPI.updatePack(packId,name)
    let res1 = await packAPI.getPacks()
    try {
        dispatch(packsActions.getPacksAC(res1.cardPacks))
        dispatch(appActions.setAppStatusAC('succeeded'))
    }
    catch (err) {
        dispatch(appActions.setAppErrorAC('error'))
        dispatch(appActions.setAppStatusAC('failed'))
    }
}
