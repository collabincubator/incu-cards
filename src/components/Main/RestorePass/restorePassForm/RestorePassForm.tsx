import React, { FC } from 'react'
import {Button, FormControl, FormHelperText, Input, InputLabel} from "@material-ui/core";
import {NavLink} from "react-router-dom";
import {useFormik} from "formik";
import {RestoreMailTC} from "../../../../redux/restorePassReducer/restorePassReducer";
import {useDispatch} from "react-redux";

type FormikErrorType = {
    emailForRestore?: string
}
type restorePassType = {
    styles:any
}

export const RestorePassForm:FC<restorePassType> = ({styles}) => {
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            emailForRestore: 'vvvvv',
        },
        validate: values => {
            const errors: FormikErrorType = {};
            if (!values.emailForRestore) {
                errors.emailForRestore = 'email is required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.emailForRestore)) {
                errors.emailForRestore = 'Invalid email address';
            }
            return errors;
        },
        onSubmit: values => {
            dispatch(RestoreMailTC(values.emailForRestore))
            formik.resetForm()
        }
    })
    return (
        <form onSubmit={formik.handleSubmit}>
            <h1>Cards</h1>
            <h2>Forgot your password?</h2>
            <FormControl className={styles.controlInputs}
                         error={!!formik.errors.emailForRestore}
                         {...formik.getFieldProps('emailForRestore')}>
                <InputLabel htmlFor={"emailForRestore"}>Enter your email</InputLabel>
                <Input id={"emailForRestore"}
                       value={formik.values.emailForRestore}
                       onChange={formik.handleChange}
                       />
            </FormControl>
            {!!formik.errors.emailForRestore && <FormHelperText id="emailForRestore">{formik.errors.emailForRestore}</FormHelperText>}

            <p>
                Enter your email address and we will send you further instructions
            </p>
            <Button disabled={false} type={'submit'}
                    className={styles.formButtons}
                    variant={"contained"}
                    color={"primary"}
            >
                Send Instructions
            </Button>
            <div className={styles.footerBox}>
                <p>Did you remember your password?</p>
                <NavLink to={'registration'} className={styles.footerLink}>
                    <span>Sign Up</span>
                </NavLink>
            </div>
        </form>
    )
}
