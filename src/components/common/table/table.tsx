import React, { FC } from 'react'
import styles from './table.module.scss'
import {Card} from "../../Main/Cards/Card/Card";
import {cardType, packType} from "../../../api/cards-api";


type TablePropsType = {
    items:cardType[]
}
export const Table:FC<TablePropsType> = ({items}) => {
    return (
        <div className={styles.container}>
            <div className={styles.box}>
                <div className={styles.inner}>
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
