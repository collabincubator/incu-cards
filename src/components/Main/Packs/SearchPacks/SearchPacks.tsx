import React from 'react';
import {FormControl, FormHelperText, Input, InputAdornment} from '@material-ui/core';
import {useDispatch} from 'react-redux';
import {useFormik} from 'formik';

export const SearchPacks = (props: any) => {
    const dispatch = useDispatch();
    // const formik = useFormik({
    //     initialValues: {
    //         email: 'collabincubator@gmail.com',
    //         password: 'collaborators',
    //         rememberMe:true,
    //     },
    //     // validate: values => {
    //     //     const errors: FormikErrorType = {};
    //     //     if (!values.email) {
    //     //         errors.email = 'email is required';
    //     //     } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    //     //         errors.email = 'Invalid email address';
    //     //     }
    //     //     if (!values.password) {
    //     //         errors.password = 'password is required';
    //     //     } else if (values.password.length <= 7) {
    //     //         errors.password = 'password must be at least 7 letters long';
    //     //     }
    //     //     return errors;
    //     // },
    //     onSubmit: values => {
    //         dispatch(loginTC(values.email, values.password))
    //         formik.resetForm()
    //     }
    // });

    return (
        <div>
            <FormControl>
                <Input
                    id="searchPacks"
                    aria-describedby="searchPacks-error"
                    inputProps={{
                        'aria-label': 'search packs',
                    }}
                />
                <FormHelperText id="searchPacks-error">Search packs</FormHelperText>
            </FormControl>
        </div>
    )
}