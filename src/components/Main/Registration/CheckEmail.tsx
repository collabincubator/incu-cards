import React from 'react'
import styles from "../RestorePass/Restore.module.scss";

export const CheckEmail = () => {
    return (
                <div className={styles.inner}>
                    <h1>Cards</h1>
                    <div className={styles.svg}>
                        <svg width="108" height="108" viewBox="0 0 108 108" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M54 108C83.8234 108 108 83.8234 108 54C108 24.1766 83.8234 0 54 0C24.1766 0 0 24.1766 0 54C0 83.8234 24.1766 108 54 108Z" fill="#D7D8EF"/>
                        </svg>
                    </div>
                    <h2>Check Email</h2>
                    <div >
                        We’ve sent an Email with instructions to example@mail.com
                    </div>
                </div>
    )
}