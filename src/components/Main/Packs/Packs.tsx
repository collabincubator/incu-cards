import React, {ChangeEvent, useEffect, useState} from 'react'
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
import {Pagination} from './../../Pagination/Pagination';

type OrderType = '' | 'asc' | 'desc';
type KeyType = 'updated' | 'cardsCount' | 'user_name' | 'name';
type SortByStateUIType = {
    order: OrderType
    key: KeyType
}

export const Packs = () => {

    const dispatch = useDispatch();
    const packs = useSelector<AppStateType,packType[]>(state => state.packsReducer.cardPacks);
    const pack = useSelector<AppStateType,packType>(state => state.packsReducer.cardPacks[0]);
    const {
            page = 1, pageCount = 10, min = 1, max = 10, packName, user_id, sortPacks
    } = useSelector<AppStateType, PacksParamsType>(state => state.packsReducer.packsParams);
    const pageCounts = useSelector<AppStateType, number[]>(state => state.packsReducer.pageCounts);
    const cardPacksTotalCount = useSelector<AppStateType, number>(state => state.packsReducer.cardPacksTotalCount);
    const loading = useSelector<AppStateType,RequestStatusType>(state => state.appReducer.status);
    const isLoggedIn = useSelector<AppStateType, boolean>(state => state.authReducer.isLoggedIn);

    const [sortByStateUI, setSortByStateUI] = useState<SortByStateUIType>({
        order: '',
        key: 'updated'
    })

    const [ckeck, setCkeck] = useState(false);

    useEffect(() => {
         dispatch(requestPacksTC())
        console.log('page changed ' + page)
    },[page, pageCount, sortPacks, min, max])
    const onClickHandler = () => {
        dispatch(createPackTC())
    }
    const onChangehandler = (e: ChangeEvent<HTMLInputElement>) => {
            e.currentTarget.checked ? dispatch(requestUserCardsTC(pack.user_id)) : dispatch(requestPacksTC())
            setCkeck(e.currentTarget.checked)
    }

    const onPageChangedHandle = (curPage: number): void => {
        dispatch(packsActions.setPageAC(curPage))
    }
    const onChangePageCountHandle = (e: ChangeEvent<HTMLSelectElement>): void => {
        const pageCount = Number(e.currentTarget.value)
        dispatch(packsActions.setPageCountAC(pageCount))
    }
    const minPacksSizeHandler = (minSize: string): void => {
        const intMinValue: number = (+minSize > 0 && +minSize < 1000) ? +minSize : 1;
        dispatch(packsActions.setMinPacksCountAC(intMinValue))
    }
    const maxPacksSizeHandler = (maxSize: string): void => {
        const intMaxValue: number = (+maxSize > min && +maxSize < 1000) ? +maxSize : min;
        dispatch(packsActions.setMaxPacksCountAC(intMaxValue))
    }

    const onClickSortByHandle = (key: KeyType = 'updated') => {

        const order: OrderType = sortByStateUI.order === 'asc' ? 'desc' : 'asc';
        const intOrder: number = order === 'desc' ? 1 : 0;

        dispatch(packsActions.setSortPacksAC(intOrder, key));
        setSortByStateUI(prev => ( {order, key} ));
        console.log(intOrder + key + '')
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

    if(!isLoggedIn) {
        return <Redirect to={'/auth/login'}/>
    }

    return (
        <div className={styles.packs}>
            <label htmlFor="check">
                show only my cards
                <input type="checkbox"
                       id={'check'} checked={ckeck} onChange={onChangehandler}/>
            </label>

            <Pagination totalItemsCount={cardPacksTotalCount}
                        pageSize={pageCount}
                        portionSize={10}
                        currentPage={page}
                        onPageChanged={onPageChangedHandle}
            />
            <div className={styles.paramsBox}>
                <span className={styles.paramsName}>Select a Page size: </span>
                <select id={'selectPageCount'} value={pageCount} onChange={onChangePageCountHandle}>
                    {pageCounts.map((pcValue, i) => {
                        return (
                            <option key={`${i}`} value={pcValue}>{pcValue}</option>
                        )
                    })}
                </select>
                <input className={styles.paramsInput}
                       onBlur={(e) => minPacksSizeHandler(e.currentTarget.value)}
                       onKeyPress={(e) => (e.key === 'Enter' && minPacksSizeHandler(e.currentTarget.value))}
                />
                <span className={styles.paramsName}>{min}</span>
                <input className={styles.paramsInput}
                       onBlur={(e) => maxPacksSizeHandler(e.currentTarget.value)}
                       onKeyPress={(e) => (e.key === 'Enter' && maxPacksSizeHandler(e.currentTarget.value))}
                />
                <span className={styles.paramsName}>{max}</span>

            </div>
            <div className={styles.packsHeader}>
                <div>
                    <div>Name</div>
                    <button onClick={() => onClickSortByHandle('name')}>sort by Name</button>

                </div>

                <div>
                    <div>Cards count</div>
                    <div>sort by order</div>
                    <button onClick={() => onClickSortByHandle('cardsCount')}> sort by Cards stack</button>
                </div>
                <div>
                    <div>Updated</div>
                    <div>sort by order</div>
                    <button onClick={() => onClickSortByHandle('updated')}> sort by update</button>
                </div>
                <div>
                    <div>Author</div>
                    <div>sort by order</div>
                    <button onClick={() => onClickSortByHandle('user_name')}> sort by author</button>
                </div>
                <div>
                    <button onClick={onClickHandler} disabled={loading === 'loading'}>add</button>
                </div>
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
                          user_name={pack.user_name}
                          updated={pack.updated}
                          created={pack.created}
                          cardsCount={pack.cardsCount}/>
                    )
                })}
        </div>

    )
}
