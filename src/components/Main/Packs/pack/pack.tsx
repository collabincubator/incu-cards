import React, {FC, useState} from 'react'
import { NavLink } from 'react-router-dom'
import styles from './pack.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {deletePackTC, updatePackTC} from "../../../../redux/PacksReducer/PacksReducer";
import {RequestStatusType} from "../../../../redux/appReducer/appReducer";
import {AppStateType} from "../../../../redux/store";
import {requestCardsTC} from "../../../../redux/cardsReducer/CardsReducer";
import {EditableSpan} from '../../../common/EditableSpan/EditableSpan';
import {cardType, ProfileResponseType} from '../../../../api/cards-api';
import {CardsPopup} from '../../CardsPopup/CardsPopup';


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

export const Pack: FC<packPropType> = ({user_id, user_name, name, cardsCount, updated, created, ...props}) => {
    const dispatch = useDispatch()
    const [packName, setPackName] = useState('');
    let [packPopup, setPackPopup] = useState(false);
    const user = useSelector<AppStateType, ProfileResponseType | null>(state => state.profileReducer.profile);


    const deleteHandler = () => {
        dispatch(deletePackTC(props._id))
    }
    const updateHandler = () => {
        dispatch(updatePackTC(props._id, packName))
    }
    const changeHandler = (name: string) => {
        setPackName(name)
    }

    const onClickQuestionHandle = () => {
        setPackPopup(prev => !prev)
    }

    return (
        <tr onClick={onClickQuestionHandle}>
            <td>
                <EditableSpan value={name} onChange={changeHandler}/>
            </td>
            <td>{cardsCount}</td>
            <td>{new Date(updated).toLocaleDateString('ru', {day: '2-digit', month: '2-digit', year: 'numeric'})}</td>
            <td>{user_name}</td>
            <td>
                {user_id === user?._id && <button onClick={deleteHandler} disabled={props.loading === 'loading'}>del</button>}
                {user_id === user?._id && <button onClick={updateHandler} disabled={props.loading === 'loading'}>update</button>}
                <NavLink
                    to={`/cards/${props._id}/${name}`}>
                    cards
                </NavLink>
            </td>
            {packPopup && (<>
                <CardsPopup onClick={onClickQuestionHandle} id={props._id} name={name} />
            </>)
            }
        </tr>

    )
}
