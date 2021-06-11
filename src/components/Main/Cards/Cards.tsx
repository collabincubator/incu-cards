import React, {useEffect} from 'react'
import styles from "./Cards.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../redux/store";
import {cardType} from "../../../api/cards-api";
import { Table } from '../../common/table/table';
import {useParams} from "react-router-dom";
import {requestCardsTC} from "../../../redux/cardsReducer/CardsReducer";




export const Cards = () => {

    const dispatch = useDispatch()
    // @ts-ignore
    const {id,name} = useParams()
    const cards = useSelector<AppStateType,cardType[]>(state => state.cardsReducer.cards)
    debugger
    useEffect(() => {
        dispatch(requestCardsTC(id))
    },[dispatch,id])

    return (
        <div className={styles.container}>
            <div className={styles.box}>
                <div className={styles.inner}>
                   <h2>{name}</h2>
                    <input type="text"/>

                    <Table items={cards}/>
                </div>
            </div>
        </div>
    )
}
