import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {
    createPackTC, packsActions,
    requestPacksTC,
    PacksParamsType,
    requestUserCardsTC
} from "../../../redux/PacksReducer/PacksReducer";
import {AppStateType} from "../../../redux/store";
import {packType} from "../../../api/cards-api";
import {Pack} from "./pack/pack";
import styles from './Packs.module.scss'
import { RequestStatusType } from '../../../redux/appReducer/appReducer';
import {Redirect} from "react-router-dom";
import {Pagination} from '../../Pagination/Pagination';

export const Packs = () => {

    const dispatch = useDispatch()
    const packs = useSelector<AppStateType,packType[]>(state => state.packsReducer.cardPacks)
    const pack = useSelector<AppStateType,packType>(state => state.packsReducer.cardPacks[0])
    const {
            page = 1, pageCount = 10, min, max, packName, user_id
    } = useSelector<AppStateType, PacksParamsType>(state => state.packsReducer.packsParams)
    const cardPacksTotalCount = useSelector<AppStateType, number>(state => state.packsReducer.cardPacksTotalCount)
    const loading = useSelector<AppStateType,RequestStatusType>(state => state.appReducer.status)
    const isLoggedIn = useSelector<AppStateType, boolean>(state => state.authReducer.isLoggedIn);

    const [sortByStateUI, setSortByStateUI] = useState({
        byName: true,
        byCount: true,
        byUpdated: true,
        byCreated: true,
    })

    const [ckeck, setCkeck] = useState(false);

    useEffect(() => {
         dispatch(requestPacksTC())
    },[page])
    const onClickHandler = () => {
        dispatch(createPackTC())
    }
    const onChangehandler = (e:any) => {
            e.currentTarget.checked ? dispatch(requestUserCardsTC(pack.user_id)) : dispatch(requestPacksTC())
            setCkeck(e.currentTarget.checked)
    }
    if(!isLoggedIn) {
        return <Redirect to={'/auth/login'}/>
    }
    // const onClickPacksSortByName = () => {
    //     setPacksUI(prevPacksUI => {
    //         return prevPacksUI?.sort( (a, b) => {
    //             if (sortByStateUI.byName) {
    //                 setSortByStateUI(prev => ({...prev, byName: !prev.byName}))
    //                 return ( (a.name < b.name) ? -1 : 1 )
    //             } else {
    //                 setSortByStateUI(prev => ({...prev, byName: !prev.byName}));
    //                 return (a.name > b.name ? -1 : 1 )
    //             }
    //         })
    //     })
    // }
    // const onClickPacksSortByCount = () => {
    //     setPacksUI(prevPacksUI => {
    //         return prevPacksUI?.sort( (a, b) => {
    //             if (sortByStateUI.byCount) {
    //                 setSortByStateUI(prev => ({...prev, byCount: !prev.byCount}))
    //                 return ( (a.cardsCount < b.cardsCount) ? -1 : 1 )
    //             } else {
    //                 setSortByStateUI(prev => ({...prev, byCount: !prev.byCount}));
    //                 return (a.cardsCount > b.cardsCount ? -1 : 1 )
    //             }
    //         })
    //     })
    // }

    const onPageChangedHandle = (curPage: number): void => {
        dispatch(packsActions.setPageAC(curPage))
    }
    const onChangePageSizeHandle = (pageSize: number): void => {
        dispatch(packsActions.setPageCountAC(pageSize))
    }
    const onChangeMinSizePacksHandle = (minSize: number): void => {
        dispatch(packsActions.setMinPacksCountAC(minSize))
    }
    const onChangeMaxSizePacksHandle = (maxSize: number): void => {
        dispatch(packsActions.setMaxPacksCountAC(maxSize))
    }
    const onChangePageCountPacksHandle = (pCount: number): void => {
        dispatch(packsActions.setPageCountAC(pCount))
    }

    return (
        <div className={styles.cards}>
            <label htmlFor="check" >
                show only my cards
                <input type="checkbox"
                       id={'check'} checked={ckeck} onChange={onChangehandler}/>
            </label>

            <Pagination totalItemsCount={cardPacksTotalCount}
                        pageSize={pageCount}
                        currentPage={page}
                        onPageChanged={onPageChangedHandle}
            />

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