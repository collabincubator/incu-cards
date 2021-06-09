import React, {FC, useState} from 'react'
import { NavLink } from 'react-router-dom'
import styles from './pack.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {deletePackTC, updatePackTC} from "../../../../redux/PacksReducer/PacksReducer";
import {RequestStatusType} from "../../../../redux/appReducer/appReducer";
import {AppStateType} from "../../../../redux/store";
import {requestCardsTC} from "../../../../redux/cardsReducer/CardsReducer";


interface packPropType {
    _id: string
    user_id: string
    name: string
    path: string
    cardsCount: number
    grade: number
    shots: number // количество попыток
    rating: number // лайки
    type: string // ещё будет "folder" (папка)
    created: string
    updated: string
    __v: number
    loading:RequestStatusType
}

export const Pack:FC<packPropType> = ({name,cardsCount,updated,created,...props}) => {
    const dispatch = useDispatch()
    const [packName, setPackName] = useState('');

    const deleteHandler = () => {
        dispatch(deletePackTC(props._id))
    }
    const updateHandler = () => {
        dispatch(updatePackTC(props._id,packName))
    }
    const changeHandler = (e:any) => {
        setPackName(e.currentTarget.value)
    }
    const packHandler = (cardsPackId: string) => {
        dispatch(requestCardsTC(cardsPackId))
    }
    return (
        <div className={styles.pack}>
            <div>
                <div>{name}</div>
                <input type="text" className={styles.input} value={packName} onChange={changeHandler}/>
            </div>
            <div>{cardsCount}</div>
            <div>{updated}</div>
            <div>{created}</div>
            <div>
                <button onClick={deleteHandler} disabled={props.loading === 'loading'}>del</button>
                <button onClick={updateHandler}> update</button>
                <NavLink
                    onClick={() => packHandler(props._id)}
                    to={'/cards'}>
                    cards
                </NavLink>
            </div>
        </div>
    )
}
