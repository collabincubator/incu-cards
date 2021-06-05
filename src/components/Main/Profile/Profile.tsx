import React from 'react';
import {useSelector} from 'react-redux';
import { Redirect } from 'react-router-dom';
import { ProfileResponseType } from '../../../api/cards-api';
import {AppStateType} from '../../../redux/store';

const Profile = (props: any) => {

    const profile = useSelector<AppStateType, ProfileResponseType | null>( state => state.profileReducer.profile);
    const isLoggedIn = useSelector<AppStateType, boolean | null>( state => state.authReducer.isLoggedIn);


    if(!isLoggedIn) {
        return  <Redirect to={'auth/login'}/>
    }

    return <div className='profile'>
        <div>
            <ul>
                <li> <span>{profile !== null ? profile.email : 'eeeee'}</span></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
            </ul>
        </div>

    </div>
}

export default Profile;