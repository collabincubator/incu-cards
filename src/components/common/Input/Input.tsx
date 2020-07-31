import React from 'react';
import styles from './Input.module.css';
const Input = (props: any) => {
    let placeHolder: string = 'Введите текст';
    return <input type='text' placeholder={placeHolder} className={styles.mainInput}/>
}

export default Input;