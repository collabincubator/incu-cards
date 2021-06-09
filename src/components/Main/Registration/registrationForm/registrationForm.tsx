import React, {FC} from 'react'
import {Button, FormControl, FormHelperText, Input, InputLabel} from "@material-ui/core";
import {FormikCustomInput} from "../../../common/Input/input";
import {useFormik} from "formik";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";
import {RegistrationTC} from "../../../../redux/registrationReducer/registrationReducer";


type FormikErrorType = {
    email?: string
    password?: string
    passwordConfirm?: string
}
type registrationFormType ={
    styles:any
}
export const RegistrationForm:FC<registrationFormType> = ({styles}) => {
    const history = useHistory()
    const onClickBack = () => {
        history.goBack()
    }
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            passwordConfirm: ''
        },
        validate: values => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'email is required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.password) {
                errors.password = 'password is required';
            } else if (values.password.length <= 7) {
                errors.password = 'password must be at least 7 letters long';
            }
            if (values.password !== values.passwordConfirm) {
                errors.passwordConfirm = 'passwords are not match'
                errors.password = 'passwords are not match'
            }
            return errors;
        },
        onSubmit: values => {
            dispatch(RegistrationTC(values.email, values.password))
            formik.resetForm()
        }
    })
    return (
        <form onSubmit={formik.handleSubmit}>
            <FormControl {...formik.getFieldProps('email')}
                         error={!!formik.errors.email}
                         className={styles.controlInputs}>
                <InputLabel htmlFor="email">Email</InputLabel>
                <Input id={"email"} value={formik.values.email} onChange={formik.handleChange} />
                {!!formik.errors.email && <FormHelperText id="email">{formik.errors.email}</FormHelperText>}
            </FormControl>
            <FormControl {...formik.getFieldProps('password')}
                         error={!!formik.errors.password}
                         className={styles.controlInputs}>
                <InputLabel htmlFor={"password"}>Password</InputLabel>

                <FormikCustomInput color={'primary'} id={'password'}
                                   value={formik.values.password} onChange={formik.handleChange}
                                   position={'end'}/>
                {!!formik.errors.password &&
                <FormHelperText id="password">{formik.errors.password}</FormHelperText>}
            </FormControl>

            <FormControl {...formik.getFieldProps('passwordConfirm')}
                         error={!!formik.errors.password}
                         className={styles.controlInputs}>
                <InputLabel htmlFor={"passwordConfirm"}>Confirm password</InputLabel>
                <FormikCustomInput color={'primary'} id={'passwordConfirm'}
                                   value={formik.values.passwordConfirm} onChange={formik.handleChange}
                                   position={'end'}/>
                {!!formik.errors.password &&
                <FormHelperText id="passwordConfirm">{formik.errors.password}</FormHelperText>}
            </FormControl>
            <div className={styles.btnContainer}>
                <Button disabled={false} type={'button'} variant={"contained"}
                        className={styles.formButtons}
                        onClick={onClickBack}>
                    Login
                </Button>
                <Button disabled={false} type={'submit'} variant={"contained"}
                        className={styles.formButtons}
                        color="primary" >
                    Login
                </Button>
            </div>
        </form>
    )
}
