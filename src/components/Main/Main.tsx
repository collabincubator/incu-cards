import React from 'react';
import styles from './Main.module.css';
import Button from '../common/Button/Button';
import Input from '../common/Input/Input';





const Main = (props: any) => {

    return(
        <div className={styles.wrap}>
            <p className={styles.testText}>Main</p>
            <div className={styles.col}>
                <Input/>
                <Button />
            </div>
        </div>
    )
}

export default Main;