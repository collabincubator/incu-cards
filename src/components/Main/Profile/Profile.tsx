import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Redirect } from 'react-router-dom';
import {AppStateType} from '../../../redux/store';

const Profile = (props: any) => {

    const dispatch = useDispatch();

    const isLoggedIn = useSelector<AppStateType, boolean>( state => state.authReducer.isLoggedIn);
    const profileState = useSelector<AppStateType>( state => state.profileReducer.profileInfo);


    useEffect(()=> {
        if (!isLoggedIn) {

        }

    }, [isLoggedIn])

    console.log(profileState)
    if(!isLoggedIn) {
        return <Redirect to={'/auth/login'}/>
    }

    return <div className='profile'>
        <span>Profile</span>
    </div>
}

export default Profile;