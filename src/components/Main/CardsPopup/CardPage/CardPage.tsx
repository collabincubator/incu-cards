import React, {ChangeEvent, useState} from 'react';
import styles from './CardPage.module.scss';
import {FormControl, FormControlLabel, FormLabel, Radio, RadioGroup} from '@material-ui/core';
import {cardType} from '../../../../api/cards-api';

type PropsType = {
    name: string
    author: string
    page: number
    card: cardType
    nextPageHandle: (arg1: string, arg2: string) => void
    length: number
}

export const CardPage: React.FC<PropsType> = ({name, author, page, card, length, nextPageHandle, ...props}) => {

    const [rate, setRate] = useState<string>('');
    const [answerVisible, setAnswerVisible] = useState(false)

    const onChangeRateHandle = (e: ChangeEvent<HTMLInputElement>) => {
        setRate(prev => prev = e.target.value)
    }
    const onClickShowAnswer = () => {
        setAnswerVisible(prev => !prev)
    }
    const onClickNextPage = () => {
        if (card._id !== undefined) {
            nextPageHandle(card._id, rate)
        }
    }

    return (
        <div className={styles.cardPage}>
            <h2>Learn «{name}»</h2>
            <h3>author: {author}</h3>
            <p><strong>Question: </strong>«{card.question}»</p>
            <p><strong>Answer: </strong>{
                answerVisible
                    ? card.answer
                    : <button onClick={onClickShowAnswer}>show the answer</button>}
            </p>
            {
                answerVisible && <FormControl component="fieldset">
                    <FormLabel component="legend">Rate yourself:</FormLabel>
                    <RadioGroup aria-label="Rate yourself" name="RateYourself" value={rate}
                                onChange={onChangeRateHandle}>
                        <FormControlLabel value="5" control={<Radio/>} label="Did not know"/>
                        <FormControlLabel value="4" control={<Radio/>} label="Forgot"/>
                        <FormControlLabel value="3" control={<Radio/>} label="A lot of thought"/>
                        <FormControlLabel value="2" control={<Radio/>} label="Confused"/>
                        <FormControlLabel value="1" control={<Radio/>} label="Knew the answer"/>
                    </RadioGroup>
                </FormControl>
            }

            <p>Question: {page} of {length}</p>
            {page < (length) && <button onClick={onClickNextPage}>next</button>}
        </div>
    )
}