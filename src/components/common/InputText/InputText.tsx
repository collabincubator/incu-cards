import React, {ChangeEvent, useState} from 'react';
import styles from '../InputPass/InputText.module.scss';
export type InputPropsType = {
    type?: string
    placeholder?: string
    value?: string | undefined
    className?: string
    onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
    onBlur?:(e: ChangeEvent<HTMLInputElement>) => void
}
export const InputPass: React.FC<InputPropsType> = React.memo(({   placeholder = '',
                                                        value = '',
                                                        className,
                                                        ...props}) => {

    return <div>
        <label ><span>{placeholder}</span></label>
            <div className={styles.passInputBox}>
                <input type={'text'}
                       className={`${styles.inputText} ${className && styles[className]}`}
                       value={value}
                       onChange={props.onChange}
                />
            </div>
    </div>
})