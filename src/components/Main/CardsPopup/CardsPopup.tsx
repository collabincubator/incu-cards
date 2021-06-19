import React, {ChangeEvent, MouseEventHandler, useEffect, useState} from 'react';
import styles from './CardsPopup.module.scss';
import {useDispatch, useSelector} from 'react-redux';
import {AppStateType} from '../../../redux/store';
import {cardType} from '../../../api/cards-api';
import {CardPage} from './CardPage/CardPage';
import {updateCardRateTC} from '../../../redux/cardsReducer/CardsReducer';

type PropsType = {
    onClick: () => void
    name: string
    author: string
}

export const CardsPopup: React.FC<PropsType> = ({onClick, name, author, ...props}) => {

    const dispatch = useDispatch()
    const [page, setPage] = useState<number>(1)

    const cards = useSelector<AppStateType,cardType[]>(state => state.cardsReducer.cards)

    const nextPageHandle = (card_id: string , rate: string) => {

        if ((page) < cards.length) {
            setPage(prev => prev + 1)
        }
        if (rate !== '') {
            dispatch(updateCardRateTC( card_id, (+rate) ))
        }
    }

    const onClickOuterHandle = (e: React.MouseEvent<HTMLDivElement>) => {
        if(e.currentTarget === e.target) {
            e.stopPropagation()
            onClick()
        }
    }

    return(
        <td>
            <div className={styles.popupQuestionContainer} onClick={onClickOuterHandle}>
                <div className={styles.popupQuestionBox}>
                    {/*{cardsPages[page - 1]}*/}
                    <CardPage name={name} author={author} page={page} card={cards[page]} nextPageHandle={nextPageHandle} length={cards.length}/>
                </div>
            </div>

        </td>
        )

}