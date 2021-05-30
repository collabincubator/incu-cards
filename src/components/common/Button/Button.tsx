import React from 'react';
import styles from './Button.module.css';

const Button = (props: any) => {
    let btnSign:string = 'button'
    return <button className={styles.mainButton} type='submit'>
        {btnSign}
    </button>
}

export default Button;