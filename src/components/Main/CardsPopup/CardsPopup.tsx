import React, {useEffect} from 'react';
import styles from './CardsPopup.module.scss';
import {useSelector} from 'react-redux';
import {AppStateType} from '../../../redux/store';
import {cardType} from '../../../api/cards-api';

type PropsType = {
    onClick: () => void
    name: string
}

export const CardsPopup: React.FC<PropsType> = ({onClick, name, ...props}) => {

    const cards = useSelector<AppStateType,cardType[]>(state => state.cardsReducer.cards)

    const cardsPages = cards.map((card, i) => {

        return (
            <div key={`card${i}`}>
                <h2>Learn {card.cardsPack_id}</h2>
                <h3>author: {card.user_id}</h3>
                <p><strong>Question: </strong>{card.question}</p>
                <p><strong>Answer: </strong>{card.answer}</p>
            </div>
        )
    })

    useEffect(()=>{

    }, [])
    return(
        <>
            <div className={styles.popupQuestionContainer} onClick={(e)=>{
                    if(e.currentTarget === e.target) {
                        onClick()
                    }
                }
            }>
                <div className={styles.popupQuestionBox}>
                    <p>pack name : {name}</p>
                    {cardsPages[1]}
                </div>
            </div>

        </>
        )

}