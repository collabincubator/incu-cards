import React from 'react'
import emailCircleIcon from '../../../assets/img/svg/mail-circle-icon.svg';

type PropsType = {
    styles: any
}

export const CheckEmail: React.FC<PropsType> = ({styles, ...props}) => {
    return (
        <>
            <h1>Cards</h1>
            <img src={emailCircleIcon} alt={'email-circle-icon'} className={styles.imgSuccessAction} />
            <h2>Check Email</h2>
            <p>
                We’ve sent an Email with instructions to example@mail.com
            </p>
        </>
    )
}