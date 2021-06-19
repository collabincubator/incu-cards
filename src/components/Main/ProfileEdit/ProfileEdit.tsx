import React, {ChangeEvent, RefObject, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useFormik} from 'formik';
import {FormControl, FormHelperText, Input, InputLabel} from '@material-ui/core';
import {AppStateType} from '../../../redux/store';
import {authAPI, ProfileResponseType} from '../../../api/cards-api';
import profileAvatar from './../../../assets/img/png/cybava.png';
import updateAvatarIcon from './../../../assets/icons/camera.svg';
import {updateProfileAvatarTC} from '../../../redux/profileReducer/profileReducer';

type PropsType = {
    styles: any
}
type FormikErrorType = {
    nicknameForUpdate?: string
    emailForUpdate?: string

}

export const ProfileEdit: React.FC<PropsType> = ({styles, ...props}) => {
    const dispatch = useDispatch()
    const profile = useSelector<AppStateType, ProfileResponseType | null>(state => state.profileReducer.profile)
    const updAvatarRef = useRef<HTMLInputElement>(null)
    const [updAvatar, setUpdAvatar] = useState<File>();
    const [updAvatarURL, setUpdAvatarURL] = useState<string>();
    const formik = useFormik({
        initialValues: {
            nicknameForUpdate: profile?.name,
            emailForUpdate: profile?.email

        },
        validate: values => {
            const errors: FormikErrorType = {};
            if (!values.emailForUpdate) {
                errors.emailForUpdate = 'email is required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.emailForUpdate)) {
                errors.emailForUpdate = 'Invalid email address';
            }
            if (!values.nicknameForUpdate) {
                errors.nicknameForUpdate = 'nicknameForUpdate is required';
            } else if (values.nicknameForUpdate.length <= 2) {
                errors.nicknameForUpdate = 'nicknameForUpdate must be at least 2 letters long';
            }
            return errors;
        },
        onSubmit: values => {
            formik.resetForm()
        }
    })

    const onClickUpdateAvatarHandle = (e: ChangeEvent<HTMLInputElement>) => {
        e.stopPropagation()
        const newAvatar = e.target.files && e.target.files[0]

        if (newAvatar) {
            setUpdAvatar( prev => newAvatar)
            setUpdAvatarURL( prev => window.URL.createObjectURL(newAvatar))
            dispatch(updateProfileAvatarTC(window.URL.createObjectURL(newAvatar)))
        }

    }

    return (<>
        <h2>Personal information</h2>
        <div className={styles.imgProfileAvatarBox}>
            <img src={updAvatarURL || profile?.avatar} alt={'profile avatar'} className={styles.imgProfileAvatar}/>
            <div className={styles.imgUpdateAvatarBox}>
                <img src={updateAvatarIcon}
                     alt='update avatar'
                     className={styles.imgUpdateAvatar}
                     onClick={() => updAvatarRef && updAvatarRef.current && updAvatarRef.current.click()}/>
                <input type={'file'} onChange={onClickUpdateAvatarHandle} style={{display: 'none'}} ref={updAvatarRef}/>
            </div>
        </div>
        <FormControl {...formik.getFieldProps('nicknameForUpdate')}
                     error={!!formik.errors.nicknameForUpdate}
                     className={styles.controlInputs}>
            <InputLabel htmlFor='nicknameForUpdate'>Nickname</InputLabel>
            <Input
                {...formik.getFieldProps('nicknameForUpdate')}
                id={"nicknameForUpdate"}
                value={formik.values.nicknameForUpdate}
                onChange={formik.handleChange}
                aria-describedby={'nicknameForUpdate-error'}/>
            {!!formik.errors.nicknameForUpdate &&
            <FormHelperText id='nicknameForUpdate-error'>{formik.errors.nicknameForUpdate}</FormHelperText>}
        </FormControl>

        <FormControl {...formik.getFieldProps('emailForUpdate')}
                     error={!!formik.errors.emailForUpdate}
                     className={styles.controlInputs}>
            <InputLabel htmlFor={'emailForUpdate'}>Email</InputLabel>
            <Input id={'emailForUpdate'}
                   value={formik.values.emailForUpdate}
                   onChange={formik.handleChange}
            />
        </FormControl>
            {!!formik.errors.emailForUpdate &&
            <FormHelperText id='emailForUpdate-error'>{formik.errors.emailForUpdate}</FormHelperText>}

    </>)
}