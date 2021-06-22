import React, { FC } from 'react'
import styles from './PopUp.module.scss'

type CardsPropsType = {
    showPopUp:(e:any) => void
}
export const CardsPopUp:FC<CardsPropsType> = ({showPopUp}) => {
    return (
        <div className={styles.container} onClick={showPopUp}>
            <div className={styles.box}>
                <h3>text</h3>
                <input type="text"/>
                <input type="text"/>
                <div>
                    <button>d</button>
                    <button>d</button>
                </div>
            </div>
        </div>
    )
}
