import React, {FC} from 'react'
import {useFormik} from "formik";
import {useDispatch} from "react-redux";
import {Button, Checkbox, FormControl, FormControlLabel, FormHelperText, Input, InputLabel} from "@material-ui/core";
import {FormikCustomInput} from "../../../common/Input/input";
import {NavLink} from "react-router-dom";
import {loginTC} from "../../../../redux/authReducer/authReducer";


type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}
type FormPropsType = {
    styles:any

}
export const LoginForm:FC<FormPropsType> = ({styles}) => {
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            email: 'collabincubator@gmail.com',
            password: 'collaborators',
            rememberMe: false,
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
            return errors;
        },
        onSubmit: values => {
            dispatch(loginTC(values.email, values.password, values.rememberMe))
            formik.resetForm()
        }
    })
    return (
        <form onSubmit={formik.handleSubmit}>
            <FormControl {...formik.getFieldProps('email')}
                         error={!!formik.errors.email}
                         className={styles.controlInputs}>
                <InputLabel htmlFor="email">Email</InputLabel>
                <Input
                    {...formik.getFieldProps('email')}
                    id={"email"}
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    aria-describedby={'email-error'}/>
                {!!formik.errors.email && <FormHelperText id="email-error">{formik.errors.email}</FormHelperText>}
            </FormControl>
            <FormControl {...formik.getFieldProps('password')}
                         error={!!formik.errors.password}
                         className={styles.controlInputs}>
                <InputLabel htmlFor={"password"}>Password</InputLabel>
                <FormikCustomInput
                    color={'primary'}
                    id={"password"}
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    position='end'/>
                {!!formik.errors.password &&
                <FormHelperText id="password-error">{formik.errors.password}</FormHelperText>}
            </FormControl>
            <FormControlLabel
                {...formik.getFieldProps('rememberMe')}
                control={<Checkbox checked={formik.values.rememberMe}
                                   value={formik.values.rememberMe}
                                   onChange={formik.handleChange}
                                   name='rememberMe'
                                   id={'rememberMe'}
                                   color={'primary'}
                />}
                label='RememberMe'
            />
            <div className={styles.forgotBox}>
                <NavLink className={styles.navLinkForgotBox} to={'/auth/restore-password'}>
                    <span>Forgot Password</span>
                </NavLink>
            </div>
            <Button disabled={false} type={'submit'} className={styles.formButtons} variant="contained"
                    color="primary">
                Login
            </Button>
        </form>
    )
}
