import React, {useEffect, useState} from 'react';
import styles from './CardsPopup.module.scss';
import {useSelector} from 'react-redux';
import {AppStateType} from '../../../redux/store';
import {cardType} from '../../../api/cards-api';

type PropsType = {
    onClick: () => void
    name: string
    author: string
}

export const CardsPopup: React.FC<PropsType> = ({onClick, name, author, ...props}) => {

    const [page, setPage] = useState<number>(0)

    const cards = useSelector<AppStateType,cardType[]>(state => state.cardsReducer.cards)

    const nextPageHandle = () => {
        if ((page + 1) < cards.length) {
            setPage(prev => prev + 1)
        }
    }

    useEffect(()=>{

    },[cards])

    const cardsPages = cards.map((card, i) => {
        return (
            <div className={styles.cardPage} key={`card${i}`}>
                <h2>Learn «{name}»</h2>
                <h3>author: {author}</h3>
                <p><strong>Question: </strong>«{card.question}»</p>
                <p><strong>Answer: </strong>«{card.answer}»</p>
                <p><strong>Rate yourself:</strong></p>
                <ul className={styles.rateList}>
                    <li>Did not know</li>
                    <li>Forgot</li>
                    <li>A lot of thought</li>
                    <li>Confused</li>
                    <li>Knew the answer</li>
                </ul>
                <p>page: {page + 1}</p>
                {page < (cards.length -1) && <button onClick={nextPageHandle}>next</button>}
            </div>
        )
    })

    return(
        <>
            <div className={styles.popupQuestionContainer} onClick={(e)=>{
                    e.stopPropagation()
                    if(e.currentTarget === e.target) {
                        onClick()
                    }
                }
            }>
                <div className={styles.popupQuestionBox}>
                    {cardsPages[page]}
                </div>
            </div>

        </>
        )

}