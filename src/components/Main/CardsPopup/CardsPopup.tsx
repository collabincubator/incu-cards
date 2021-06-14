import React, {useEffect} from 'react';
import styles from '../Packs/pack/pack.module.scss';
import {useSelector} from 'react-redux';
import {AppStateType} from '../../../redux/store';
import {cardsResponseType, cardType} from '../../../api/cards-api';

type PropsType = {
    onClick: () => void
    name: string
    id: string
}

export const CardsPopup: React.FC<PropsType> = ({onClick, name, id, ...props}) => {

    const cards = useSelector<AppStateType,cardType[]>(state => state.cardsReducer.cards)

    useEffect(()=>{

    }, [name, id])

    return(
        <>
            <div className={styles.popupQuestionContainer} onClick={(e)=>onClick}>:&nbsp;</div>
            <div className={styles.popupQuestionBox}>
                <button onClick={(e)=>onClick}>
                    close
                </button>
                <h2>Learn {name}</h2>
                <p><strong>Question</strong>{}</p>
                <p><strong>Answer</strong></p>

            </div>
        </>
        )

}