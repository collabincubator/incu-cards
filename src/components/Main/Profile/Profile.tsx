import React, {ChangeEvent, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Redirect } from 'react-router-dom';
import { ProfileResponseType } from '../../../api/cards-api';
import { changeProfileNameTC } from '../../../redux/profileReducer/profileReducer';
import {AppStateType} from '../../../redux/store';
import {authMeTC} from '../../../redux/authReducer/authReducer';


const Profile = () => {

    const profile = useSelector<AppStateType, ProfileResponseType | null>( state => state.profileReducer.profile);
    const isLoggedIn = useSelector<AppStateType, boolean | null>( state => state.authReducer.isLoggedIn);
    let [name, setName] = useState('');
    const dispatch = useDispatch();


    const onChangeNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.currentTarget.value)
    }
    const onClickChangeNameHandler = () => {
        dispatch(changeProfileNameTC(name))
    }

    if(!isLoggedIn) {
        return  <Redirect to={'auth/login'}/>
    }

    return (
        <div className='profile'>
            <div>
                <ul>
                    <li><span>{profile !== null ? profile.email : 'not authorized'}</span></li>
                    <li>
                        <input value={name} onChange={onChangeNameHandler}
                               onKeyPress={(e) => (e.key === 'Enter' && onClickChangeNameHandler())}/>
                        <span>{profile !== null && profile.name}</span>
                        <button onClick={onClickChangeNameHandler}>Change Name!</button>
                    </li>
                    <li>3</li>
                    <li>4</li>
                    <li>5</li>
                </ul>
            </div>

    </div>
    )
}

export default Profile;
