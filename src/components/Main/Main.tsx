import React from 'react';
import styles from './Main.module.scss';
import Button from '../common/Button/Button';
import {InputPass} from '../common/InputPass/InputPass';

const Main = (props: any) => {

    return(
        <section className={styles.wrap}>
            <div className={styles.container}>
                <div className={styles.box}>
                    <InputPass/>
                    <Button />
                </div>
            </div>
        </section>
    )
}

export default Main;