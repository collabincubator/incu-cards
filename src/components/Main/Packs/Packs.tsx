import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {createPackTC, requestCardsTC, requestUserCardsTC} from "../../../redux/PacksReducer/Packs-reducer";
import {AppStateType} from "../../../redux/store";
import {packType} from "../../../api/cards-api";
import {Pack} from "./pack/pack";
import styles from './Packs.module.scss'
import { RequestStatusType } from '../../../redux/appReducer/appReducer';
import {Redirect} from "react-router-dom";

export const Packs = () => {

    const dispatch = useDispatch()
    const packs = useSelector<AppStateType,packType[]>(state => state.cardsReducer.cardPacks)
    const pack = useSelector<AppStateType,packType>(state => state.cardsReducer.cardPacks[0])
    const loading = useSelector<AppStateType,RequestStatusType>(state => state.appReducer.status)
    const isLoggedIn = useSelector<AppStateType, boolean>(state => state.authReducer.isLoggedIn);

    const [ckeck, setCkeck] = useState(false);
    useEffect(() => {
         dispatch(requestCardsTC())
    },[])
    const onClickHandler = () => {
        dispatch(createPackTC())
    }
    const onChangehandler = (e:any) => {
            e.currentTarget.checked ? dispatch(requestUserCardsTC(pack.user_id)) : dispatch(requestCardsTC())
            setCkeck(e.currentTarget.checked)
    }
    if(!isLoggedIn) {
        return <Redirect to={'/auth/login'}/>
    }
    return (
        <div className={styles.cards}>
            <label htmlFor="check" >
                show only my cards
                <input type="checkbox"
                       id={'check'} checked={ckeck} onChange={onChangehandler}/>
            </label>
            <div className={styles.cardsHeader}>
                <div>
                    <div>Name</div>
                    <button>sort by alph</button>

                </div>

                <div>
                    <div>Cards count</div>
                    <div>sort by order</div>
                    <button> from less to more</button>
                    <button> from more to less</button>
                </div>
                <div>
                    <div>Updated</div>
                    <div>sort by order</div>
                    <button> from oldest to newest</button>
                </div>
                <div>
                    <div>Created</div>
                    <div>sort by order</div>
                    <button> from oldest to newest</button>
                </div>
                <div><button onClick={onClickHandler} disabled={loading === 'loading'}>add</button></div>
            </div>
                {packs.map(pack => {
                    return (
                      <Pack
                          loading={loading}
                          key={pack._id}
                          __v={pack.__v}
                          _id={pack._id}
                          grade={pack.grade}
                          path={pack.path}
                          rating={pack.rating}
                          shots={pack.shots}
                          user_id={pack.user_id}
                          type={pack.type}
                          name={pack.name}
                          updated={pack.updated}
                          created={pack.created}
                          cardsCount={pack.cardsCount}/>
                    )
                })}
        </div>

    )
}