import React, {ChangeEvent, useEffect, useState} from 'react';
import styles from './CardsPopup.module.scss';
import {useSelector} from 'react-redux';
import {AppStateType} from '../../../redux/store';
import {cardType} from '../../../api/cards-api';
import {FormControl, FormControlLabel, FormLabel, Radio, RadioGroup} from '@material-ui/core';
import {CardAnswer} from './CardAnswer/CardAnswer';

type PropsType = {
    onClick: () => void
    name: string
    author: string
}

export const CardsPopup: React.FC<PropsType> = ({onClick, name, author, ...props}) => {

    const [page, setPage] = useState<number>(1)

    const cards = useSelector<AppStateType,cardType[]>(state => state.cardsReducer.cards)

    const nextPageHandle = () => {
        if ((page) < cards.length) {
            setPage(prev => prev + 1)
        }
    }

    const [rate, setRate] = useState<string>('');

    const onChangeRateHandle = (e: ChangeEvent<HTMLInputElement>) => {
        setRate(prev => prev = e.target.value)
    }

    const cardsPages = cards.map((card, i) => {
        return (
            <>
            <CardAnswer card={card} name={name} page={page} author={author} key={`card${i}`} nextPageHandle={nextPageHandle} length={cards.length}/>
            {/*<div className={styles.cardPage} key={`card${i}`}>*/}
            {/*    <h2>Learn «{name}»</h2>*/}
            {/*    <h3>author: {author}</h3>*/}
            {/*    <p><strong>Question: </strong>«{card.question}»</p>*/}
            {/*    <p><strong>Answer: </strong>«{card.answer}»</p>*/}
            {/*    <FormControl component="fieldset">*/}
            {/*        <FormLabel component="legend">Rate yourself:</FormLabel>*/}
            {/*        <RadioGroup aria-label="Rate yourself" name="RateYourself" value={rate} onChange={onChangeRateHandle}>*/}
            {/*            <FormControlLabel value="Did not know" control={<Radio />} label="Did not know" />*/}
            {/*            <FormControlLabel value="Forgot" control={<Radio />} label="Forgot" />*/}
            {/*            <FormControlLabel value="A lot of thought" control={<Radio />} label="A lot of thought" />*/}
            {/*            <FormControlLabel value="Confused" control={<Radio />} label="Confused" />*/}
            {/*            <FormControlLabel value="Knew the answer" control={<Radio />} label="Knew the answer" />*/}
            {/*        </RadioGroup>*/}
            {/*    </FormControl>*/}
            {/*</div>*/}
            </>
        )
    })

    return(
        <td>
            <div className={styles.popupQuestionContainer} onClick={(e)=>{
                    e.stopPropagation()
                    if(e.currentTarget === e.target) {
                        onClick()
                    }
                }
            }>
                <div className={styles.popupQuestionBox}>
                    {cardsPages[page - 1]}
                </div>
            </div>

        </td>
        )

}