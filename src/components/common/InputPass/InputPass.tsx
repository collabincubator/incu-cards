import React, {ChangeEvent, useState} from 'react';
import styles from './InputPass.module.scss';
import {faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
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
    let [isBlind, setIsBlind] = useState(true)

    const eyeToggle = () => {
        setIsBlind(prev => !prev)
    }

    return <div>
        <label ><span>{placeholder}</span></label>
            <div className={styles.passInputBox}>
                <input type={isBlind ? 'password' : 'text'}
                       className={`${styles.inputText} ${className && styles[className]}`}
                       value={value}
                       onChange={props.onChange}
                />
                <button className={styles.passToggleBtn}>
                    <FontAwesomeIcon icon={isBlind ? faEye : faEyeSlash} className={styles.eyeToggleIcon} onClick={eyeToggle}/>
                </button>
            </div>
    </div>
})