import React, {useCallback, useEffect, useState} from 'react'
import styles from "./Cards.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../redux/store";
import {cardType} from "../../../api/cards-api";
import {useParams} from "react-router-dom";
import {requestCardsTC} from "../../../redux/cardsReducer/CardsReducer";
import {SearchPacks} from "../Packs/SearchPacks/SearchPacks";
import {Card} from "./Card/Card";
import {Button} from "@material-ui/core";
import {CardsPopUp} from "./PopUp/CardsPopUp";


type ParamsType = {
    id: string
    name: string
}

export const Cards = () => {

    const dispatch = useDispatch()
    const {id, name} = useParams<ParamsType>()
    const cards = useSelector<AppStateType, cardType[]>(state => state.cardsReducer.cards)
    useEffect(() => {
        dispatch(requestCardsTC(id))
    }, [dispatch, id])

    const [show, setShow] = useState<boolean>(false);

    const onClickOpenPopUp = () => {
        setShow(true)
    }
    const onClickClosePopUp = useCallback((e: any) => {
        if (e.target === e.currentTarget) {
            setShow(false)
            e.stopPropagation()
        }
    }, [])
    return (
        <div className={styles.container}>
            <div className={styles.box}>
                <h2> {name}</h2>
                <div className={styles.searchPacks}>
                    <SearchPacks/>
                    <Button variant="contained"
                            onClick={onClickOpenPopUp}
                            color="primary">
                        Add new card
                    </Button>
                </div>

                <table className={styles.tableBox}>
                    <thead>
                    <tr>
                        <th>
                            <button>Name</button>
                        </th>
                        <th>
                            <button>Stack</button>
                        </th>
                        <th>
                            <button> Update</button>
                        </th>
                        <th>
                            <button> sort by author</button>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {cards.map(card => {
                        return (
                            <Card
                                {...card}/>
                        )
                    })}
                    </tbody>
                </table>
                {show && <CardsPopUp showPopUp={onClickClosePopUp}/>}
            </div>
        </div>

    )
}
