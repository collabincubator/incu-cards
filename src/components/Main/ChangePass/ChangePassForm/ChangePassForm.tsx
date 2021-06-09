import React, {FC} from 'react'
import {Button, FormControl, FormHelperText, InputLabel} from "@material-ui/core";
import {useFormik} from "formik";
import {useDispatch} from "react-redux";
import {useParams} from "react-router-dom";
import {FormikCustomInput} from "../../../common/Input/input";
import {RestorePassTC} from "../../../../redux/changePassReducer/changePassReducer";

type FormPropsType = {
    styles: any
}
type FormikErrorType = {
    password?: string
    repeatPassword?: string
    passwordLength?:string
}

export const ChangePassForm: FC<FormPropsType> = ({styles, ...props}) => {

    const dispatch = useDispatch();
    const {token} = useParams<{ token: string }>()
    const formik = useFormik({
        initialValues: {
            password: '',
            repeatPassword: '',

        },
        validate: values => {
            const errors: FormikErrorType = {};
            if (!(values.password && values.repeatPassword)) {
                errors.password = 'password is required';
            } else if (values.password !== values.repeatPassword) {
                errors.repeatPassword = 'passwords are not match'
                errors.password = 'passwords are not match'
            } else if (!(values.password.length <= 7 && values.repeatPassword.length <=7)) {
                errors.passwordLength = 'passwords should be more then 7 symbols'
            }
            return errors;
        },
        onSubmit: values => {
            dispatch(RestorePassTC(values.password, token))
            formik.resetForm()
        }
    })

    return (
        <form onSubmit={formik.handleSubmit}>
            <FormControl
                error={!!formik.errors.password }
                {...formik.getFieldProps('password')}
                className={styles.controlInputs}>
                <InputLabel htmlFor={"password"}>Password</InputLabel>
                <FormikCustomInput color={'primary'} id={'password'} name={'password'} value={formik.values.password}
                                   onChange={formik.handleChange} position={'end'}/>
            </FormControl>
            <FormControl
                {...formik.getFieldProps('repeatPassword')}
                error={!!formik.errors.repeatPassword }
                className={styles.controlInputs}>
                <InputLabel htmlFor={"repeatPassword"}>Repeat password</InputLabel>
                <FormikCustomInput color={'primary'} name={'repeatPassword'}  id={'repeatPassword'}
                                   value={formik.values.repeatPassword}
                                   onChange={formik.handleChange} position={'end'}/>
                {formik.errors.repeatPassword && <FormHelperText id="repeatPassword">{formik.errors.repeatPassword}</FormHelperText>}
            </FormControl>
            <Button type={'submit'} className={styles.formButtons} variant="contained"
                    color="primary"
            >
                Change pass
            </Button>
        </form>
    )
}
