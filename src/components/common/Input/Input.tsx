import React, {ChangeEvent} from 'react';
import styles from './Input.module.scss';
export type InputPropsType = {
    type?: string
    placeholder?: string
    value?: string | undefined
    className?: string
    onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
    onBlur?:(e: ChangeEvent<HTMLInputElement>) => void
}
export const Input: React.FC<InputPropsType> = React.memo(({   placeholder = '',
                                                        type = 'text',
                                                        value = '',
                                                        className,
                                                        ...props}) => {
    console.log(`render ${value}`);
    return <label>
        <span>{placeholder}</span>
            <input type={type}
            placeholder={placeholder}
            className={`${styles.inputText} ${className && styles[className]}`}
            value={value}
            onChange={props.onChange}
            />
    </label>
})