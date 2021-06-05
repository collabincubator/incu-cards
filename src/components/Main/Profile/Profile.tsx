import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Redirect } from 'react-router-dom';
import { serverUserType } from '../../../api/cards-api';
import {AppStateType} from '../../../redux/store';

const Profile = (props: any) => {
    const dispatch = useDispatch();

    const user = useSelector<AppStateType, serverUserType | null>( state => state.authReducer.user);
    const isLoggedIn = useSelector<AppStateType, boolean | null>( state => state.authReducer.isLoggedIn);


    if(!isLoggedIn) {
        return  <Redirect to={'auth/login'}/>
    }




    return <div className='profile'>
        <div>
            <ul>
                <li> <span>{user !== null ? user.email : 'eeeee'}</span></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
            </ul>
        </div>

    </div>
}

export default Profile;