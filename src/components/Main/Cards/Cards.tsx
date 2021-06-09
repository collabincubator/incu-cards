import React, {useEffect} from 'react'
import styles from "./Cards.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../redux/store";
import {cardType} from "../../../api/cards-api";
import {Card} from "./Card/Card";




export const Cards = () => {

    const cards = useSelector<AppStateType,cardType[]>(state => state.cardsReducer.cards)

    return (
        <div className={styles.cards}>
            <div className={styles.cardsHeader}>
                <div>
                    <div>question</div>
                    <button>sort by alph</button>
                </div>
                <div>
                    <div>answer</div>

                </div>
                <div>
                    <div>Updated</div>

                </div>
                <div>
                    <div>Created</div>

                </div>
                <div><button>add</button></div>
            </div>
            <div>
                {cards.map(card => {
                    return (
                        <Card {...card}

                        />
                    )
                })}
            </div>
        </div>
    )
}
