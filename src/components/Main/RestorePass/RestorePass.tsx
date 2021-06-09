import React from 'react';
import { useSelector} from "react-redux";
import {AppStateType} from "../../../redux/store";
import {CheckEmail} from "../Registration/CheckEmail";
import {RestorePassForm} from "./restorePassForm/RestorePassForm";

type PropsType = {
    styles: any
}

const RestorePass: React.FC<PropsType> = ({styles, ...props}) => {
    const email = useSelector<AppStateType,boolean>(state => state.restorePassReducer.email)

    return (
        <>
            {email ? <CheckEmail styles={styles}/>
                :
                <>
                    <RestorePassForm styles={styles}/>
                </>
            }</>
    )
}

export default RestorePass;
