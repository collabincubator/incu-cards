import React, {FC} from 'react'
import {cardType} from "../../../../api/cards-api";
import styles from "./Card.module.scss";


export const Card:FC<cardType> = ({user_id,_id,created,updated,grade,type,rating,cardsPack_id,question,shots,answer,...props}) => {

    return (
        <div className={styles.card}>
            <div>
                {question}
            </div>
            <div>{answer}</div>
            <div>{updated}</div>
            <div>{grade.toFixed(2)}</div>

        </div>
    )
}
