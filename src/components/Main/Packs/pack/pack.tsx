import React, {FC, useState} from 'react'
import { NavLink } from 'react-router-dom'
import styles from './pack.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {deletePackTC, updatePackTC} from "../../../../redux/PacksReducer/PacksReducer";
import {RequestStatusType} from "../../../../redux/appReducer/appReducer";
import {AppStateType} from "../../../../redux/store";
import {requestCardsTC} from "../../../../redux/cardsReducer/CardsReducer";
import {EditableSpan} from '../../../common/EditableSpan/EditableSpan';


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

export const Pack: FC<packPropType> = ({user_name, name, cardsCount, updated, created, ...props}) => {
    const dispatch = useDispatch()
    const [packName, setPackName] = useState('');



    const deleteHandler = () => {
        dispatch(deletePackTC(props._id))
    }
    const updateHandler = () => {
        dispatch(updatePackTC(props._id, packName))
    }
    const changeHandler = (name: string) => {
        setPackName(name)
    }

    return (
        <tr>
            <td>
                <EditableSpan value={name} onChange={changeHandler}/>
            </td>
            <td>{cardsCount}</td>
            <td>{updated = new Date(updated).toLocaleDateString('ru', {day: '2-digit', month: '2-digit', year: 'numeric'})}</td>
            <td>{user_name}</td>
            <td>
                <button onClick={deleteHandler} disabled={props.loading === 'loading'}>del</button>
                <button onClick={updateHandler}> update</button>
                <NavLink
                    to={`/cards/${props._id}/${name}`}>
                    cards
                </NavLink>
            </td>
        </tr>
    )
}
