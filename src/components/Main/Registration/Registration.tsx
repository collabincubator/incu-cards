import React, { useState } from 'react';
import {useDispatch} from "react-redux";
import { RegistrationTC } from '../../../redux/registrationReducer/registrationReducer';

const Registration = (props: any) => {

    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const dispatch = useDispatch()

    const handleClick = () => {
        dispatch(RegistrationTC(email,pass))

    }
    return (
        <div className='registration'>
            <input type="text" value={email} onChange={(e) => setEmail(e.currentTarget.value)}/>
            <input type="password" value={pass} onChange={(e) => setPass(e.currentTarget.value)}/>
            <button onClick={handleClick}>registr</button>
        </div>
    )
}

export default Registration;