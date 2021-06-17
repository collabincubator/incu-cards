import React, {ChangeEvent, useState} from 'react';
import styles from './CardAnswer.module.scss';
import {FormControl, FormControlLabel, FormLabel, Radio, RadioGroup} from '@material-ui/core';
import {cardType} from '../../../../api/cards-api';

type PropsType = {
    name: string
    author: string
    page: number
    card: cardType
    nextPageHandle: () => void
    length: number
}

export const CardAnswer: React.FC<PropsType> = ({name, author, page, card, length, nextPageHandle, ...props}) => {

    const [rate, setRate] = useState<string>('');

    const onChangeRateHandle = (e: ChangeEvent<HTMLInputElement>) => {
        setRate(prev => prev = e.target.value)
    }

    return (
        <div className={styles.cardPage}>
            <h2>Learn «{name}»</h2>
            <h3>author: {author}</h3>
            <p><strong>Question: </strong>«{card.question}»</p>
            <p><strong>Answer: </strong>«{card.answer}»</p>
            <FormControl component="fieldset">
                <FormLabel component="legend">Rate yourself:</FormLabel>
                <RadioGroup aria-label="Rate yourself" name="RateYourself" value={rate} onChange={onChangeRateHandle}>
                    <FormControlLabel value="Did not know" control={<Radio />} label="Did not know" />
                    <FormControlLabel value="Forgot" control={<Radio />} label="Forgot" />
                    <FormControlLabel value="A lot of thought" control={<Radio />} label="A lot of thought" />
                    <FormControlLabel value="Confused" control={<Radio />} label="Confused" />
                    <FormControlLabel value="Knew the answer" control={<Radio />} label="Knew the answer" />
                </RadioGroup>
            </FormControl>
            <p>Question: {page} of {length}</p>
            {page < (length) && <button onClick={nextPageHandle}>next</button>}
        </div>
    )
}