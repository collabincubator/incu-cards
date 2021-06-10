import React from 'react'
import styles from "./Cards.module.scss";
import { useSelector} from "react-redux";
import {AppStateType} from "../../../redux/store";
import {cardType} from "../../../api/cards-api";
import { Table } from '../../common/table/table';




export const Cards = () => {

    const cards = useSelector<AppStateType,cardType[]>(state => state.cardsReducer.cards)


    return (
        <div className={styles.container}>
            <div className={styles.box}>
                <div className={styles.inner}>
                   <h2>pack name</h2>
                    <input type="text"/>
                    <Table items={cards}/>
                </div>
            </div>
        </div>
    )
}
