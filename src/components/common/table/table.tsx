import React, { FC } from 'react'
import styles from './table.module.scss'
import {Card} from "../../Main/Cards/Card/Card";
import {cardType} from "../../../api/cards-api";


type TablePropsType = {
    items:cardType[]
}
export const Table:FC<TablePropsType> = ({items}) => {
    return (
        <div className={styles.container}>
            <div className={styles.box}>
                <div className={styles.inner}>
                    <div className={styles.tableHeader}>
                        <div>Question</div>
                        <div>answer</div>
                        <div>Last Updated</div>
                        <div>Grade</div>
                    </div>
                    {items.map(item => {
                        return (
                            <Card {...item}
                            />
                        )
                    })}
                </div>
            </div>
        </div>


    )
}
