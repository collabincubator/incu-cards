import React from 'react';
import styles from './Main.module.scss';
import Button from '../common/Button/Button';
import {Input} from '../common/Input/Input';

const Main = (props: any) => {

    return(
        <section className={styles.wrap}>
            <div className={styles.container}>
                <div className={styles.box}>
                    <Input/>
                    <Button />
                </div>
            </div>
        </section>
    )
}

export default Main;