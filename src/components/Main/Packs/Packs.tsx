import React, {ChangeEvent, useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {
    createPackTC, packsActions,
    requestPacksTC,
    PacksParamsType,
    requestUserCardsTC
} from "../../../redux/PacksReducer/PacksReducer";
import {AppStateType} from "../../../redux/store";
import {packType, ProfileResponseType} from "../../../api/cards-api";
import {Pack} from "./pack/pack";
import styles from './Packs.module.scss'
import { RequestStatusType } from '../../../redux/appReducer/appReducer';
import {Redirect} from "react-router-dom";
import {Pagination} from './../../Pagination/Pagination';
import {Slider, Typography} from '@material-ui/core';

type OrderType = '' | 'asc' | 'desc';
type KeyType = 'updated' | 'cardsCount' | 'user_name' | 'name';
type SortByStateUIType = {
    order: OrderType
    key: KeyType
}

export const Packs = React.memo(() => {

    const dispatch = useDispatch()
    const packs = useSelector<AppStateType,packType[]>(state => state.packsReducer.cardPacks)
    const user = useSelector<AppStateType,ProfileResponseType | null>(state => state.profileReducer.profile)
    const profileId = useSelector<AppStateType,string | undefined>(state => state.profileReducer.profile?._id)
    const error = useSelector<AppStateType,string >(state => state.appReducer.error)

    const {
            page = 1, pageCount = 10, min = 1, max = 10, packName, user_id, sortPacks
    } = useSelector<AppStateType, PacksParamsType>(state => state.packsReducer.packsParams);
    const pageCounts = useSelector<AppStateType, number[]>(state => state.packsReducer.pageCounts);
    const cardPacksTotalCount = useSelector<AppStateType, number>(state => state.packsReducer.cardPacksTotalCount);
    const loading = useSelector<AppStateType,RequestStatusType>(state => state.appReducer.status);

    const [sortByStateUI, setSortByStateUI] = useState<SortByStateUIType>({
        order: '',
        key: 'updated'
    })
    const [range, setRange] = useState<number[]>([min, max]);
    const [ckeck, setCkeck] = useState(false);


    useEffect(() => {
         dispatch(requestPacksTC())
        console.log('page changed ' + page)
    },[page, pageCount, sortPacks, min, max])

    const onClickHandler = () => {
        dispatch(createPackTC())
    }
    const onChangehandler = (e: ChangeEvent<HTMLInputElement>) => {
            e.currentTarget.checked ? dispatch(requestUserCardsTC(profileId)) : dispatch(requestPacksTC())
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

    const onChangePacksSizeHandle = (e: ChangeEvent<{}>, newRange: number | number[]): void => {
        console.log(newRange)
        setRange(newRange as number[])
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

    if(user === null) {
        return <Redirect to={'/auth/login'}/>
    }

    return (
        <div className={styles.container}>
            <div className={styles.box}>
                <div className={styles.columnParams}>
                    <label htmlFor="check">
                        show only my cards
                        <input type="checkbox"
                               id={'check'}
                               checked={ckeck}
                               onChange={onChangehandler}
                        />

                    </label>
                    <Typography id="range-slider" gutterBottom>
                        Number of cards
                    </Typography>
                    <Slider
                        value={range}
                        onChange={onChangePacksSizeHandle}
                        min={0}
                        max={120}
                        valueLabelDisplay="auto"
                        aria-labelledby="range-slider"
                        // getAriaValueText={valuetext}
                    />
                </div>
                <div className={styles.columnContent}>

                    <div className={styles.packs}>
                        <h1>Packs list</h1>
                        <table className={styles.tableBox}>
                            <tr>
                                <th>
                                    <button onClick={() => onClickSortByHandle('name')}>Name</button>
                                </th>
                                <th>
                                    <button onClick={() => onClickSortByHandle('cardsCount')}>Stack</button>
                                </th>
                                <th>
                                    <button onClick={() => onClickSortByHandle('updated')}> Update</button>
                                </th>
                                <th>
                                    <button onClick={() => onClickSortByHandle('user_name')}> sort by author</button>
                                </th>
                                <th>
                                    <button onClick={onClickHandler} disabled={loading === 'loading'}>add</button>
                                </th>
                            </tr>
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
                        </table>
                        <div className={styles.tableSettings}>
                            <Pagination totalItemsCount={cardPacksTotalCount}
                                        pageSize={pageCount}
                                        portionSize={10}
                                        currentPage={page}
                                        onPageChanged={onPageChangedHandle}
                            />
                            <span className={styles.paramsName}>Select a Page size: </span>
                            <select id={'selectPageCount'} value={pageCount} onChange={onChangePageCountHandle}>
                                {pageCounts.map((pcValue, i) => {
                                    return (
                                        <option key={`${i}`} value={pcValue}>{pcValue}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div>
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

                    </div>
                </div>

            </div>
        </div>
    )
})
