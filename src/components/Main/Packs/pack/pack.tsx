import React, {FC, useState} from 'react'
import { NavLink } from 'react-router-dom'
import styles from './pack.module.scss'
import {useDispatch} from "react-redux";
import {deletePackTC, updatePackTC} from "../../../../redux/PacksReducer/PacksReducer";
import {RequestStatusType} from "../../../../redux/appReducer/appReducer";


interface packPropType {
    _id: string
    user_id: string
    user_name: string
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

export const Pack:FC<packPropType> = ({user_name, name,cardsCount,updated,created,...props}) => {
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
    return (
        <div className={styles.card}>
            <div>
                <div>{name}</div>
                <input type="text" className={styles.input} value={packName} onChange={changeHandler}/>
            </div>
            <div>{cardsCount}</div>
            <div>{updated}</div>
            <div>{user_name}</div>
            <div>
                <button onClick={deleteHandler} disabled={props.loading === 'loading'}>del</button>
                <button onClick={updateHandler}> update</button>
                <NavLink to={'/cards'}>cards</NavLink>
            </div>
        </div>
    )
}