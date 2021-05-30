import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {loginTC} from '../../../redux/loginReducer/loginReducer';

const Login = (props: any) => {

    let [email, setEmail] = useState('')
    let [pass, setPass] = useState('')

    const dispatch = useDispatch();

    const onClickHandler = () => {
        dispatch(loginTC(email, pass, true))
    }

    return <div className='login'>
        <input value={email} onChange={(e)=> {setEmail(e.currentTarget.value)}} />
        <input value={pass} onChange={(e)=> {setPass(e.currentTarget.value)}} />
        <button onClick={onClickHandler}>Login</button>
    </div>
}

export default Login;