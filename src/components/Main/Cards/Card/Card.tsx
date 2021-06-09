import React, {FC} from 'react'
import {cardType} from "../../../../api/cards-api";
import styles from "../../Packs/pack/pack.module.scss";


export const Card:FC<cardType> = ({user_id,_id,created,updated,grade,type,rating,cardsPack_id,question,shots,answer,...props}) => {

    return (
        <div className={styles.card}>
            <div>
                <div>{question}</div>
            </div>
            <div>{answer}</div>
            <div>{grade}</div>
            <div>{updated}</div>
            <div>
                <button >del</button>
                <button > update</button>
            </div>
        </div>
    )
}
