import React, {ChangeEvent, useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {
    createPackTC, packsActions,
    requestPacksTC,
    PacksParamsType,
} from "../../../redux/PacksReducer/PacksReducer";
import {AppStateType} from "../../../redux/store";
import {packType, ProfileResponseType} from "../../../api/cards-api";
import {Pack} from "./Pack/Pack";
import avatar from '../../../assets/img/png/cybava.png';
import styles from './Packs.module.scss'
import { RequestStatusType } from '../../../redux/appReducer/appReducer';
import {NavLink, Redirect} from "react-router-dom";
import {Pagination} from './../../Pagination/Pagination';
import {Button, ButtonGroup, Slider, Typography} from '@material-ui/core';
import {SearchPacks} from './SearchPacks/SearchPacks';

import SearchIcon from '@material-ui/icons/Search';
type OrderType = '' | 'asc' | 'desc';
type KeyType = 'updated' | 'cardsCount' | 'user_name' | 'name';
type SortByStateUIType = {
    order: OrderType
    key: KeyType
}

export const Packs = React.memo(() => {

    const dispatch = useDispatch()
    const packs = useSelector<AppStateType,packType[]>(state => state.packsReducer.cardPacks)
    const onlyMy = useSelector<AppStateType, boolean>(state => state.packsReducer.onlyMy)
    const user = useSelector<AppStateType,ProfileResponseType | null>(state => state.profileReducer.profile)
    const error = useSelector<AppStateType,string >(state => state.appReducer.error)

    const {
            page = 1, pageCount = 10, min = 0, max = 10, packName, sortPacks
    } = useSelector<AppStateType, PacksParamsType>(state => state.packsReducer.packsParams);
    const pageCounts = useSelector<AppStateType, number[]>(state => state.packsReducer.pageCounts);
    const cardPacksTotalCount = useSelector<AppStateType, number>(state => state.packsReducer.cardPacksTotalCount);
    const loading = useSelector<AppStateType,RequestStatusType>(state => state.appReducer.status);

    const [sortByStateUI, setSortByStateUI] = useState<SortByStateUIType>({
        order: '',
        key: 'updated'
    })
    const [range, setRange] = useState<number | number[]>([min, max]);

    useEffect(() => {
         dispatch(requestPacksTC())
    },[page, pageCount, sortPacks, min, max, onlyMy])

    const onClickHandler = () => {
        dispatch(createPackTC())
    }

    const onPageChangedHandle = (curPage: number): void => {
        dispatch(packsActions.setPageAC(curPage))
    }

    const onChangePageCountHandle = (e: ChangeEvent<HTMLSelectElement>): void => {
        const pageCount = Number(e.currentTarget.value)
        dispatch(packsActions.setPageCountAC(pageCount))
    }

    const onChangePacksSizeHandle = (e: ChangeEvent<{}>, newRange: number | number[]): void => {
        setRange(prev => (newRange))
    }

    const onClickPageSizeHandle = (): void => {
        if (range instanceof Array) {
            dispatch(packsActions.setRangeSizePacks(range))
        }
    }

    const onClickSortByHandle = (key: KeyType = 'updated') => {
        const order: OrderType = sortByStateUI.order === 'asc' ? 'desc' : 'asc';
        const intOrder: number = order === 'desc' ? 1 : 0;
        dispatch(packsActions.setSortPacksAC(intOrder, key));
        setSortByStateUI(prev => ( {order, key} ));
    }

    const onChangeOnlyMyHandle = (mode: string): void => {
        dispatch(packsActions.setOnlyMyMode((mode === 'my')))
    }

    if(user === null) {
        return <Redirect to={'/auth/login'}/>
    }

    return (
        <div className={styles.container}>
            <div className={styles.box}>
                <div className={styles.columnParams}>
                    <div className={styles.profileContainer}>
                        <div className={styles.profileBox}>
                            <div className={styles.avatarBox}>
                                <img src={avatar} alt={'profile avatar'} className={styles.profileAvatar}/>
                            </div>
                            <h3>
                                {user?.name}
                            </h3>
                            <p>Front-end developer</p>
                            <NavLink
                                to={`/auth/profile-edit`}>
                                Edit profile
                            </NavLink>
                        </div>
                    </div>
                    <div className={styles.paramsBox}>
                        <h3>Show packs cards</h3>
                        <ButtonGroup color={'primary'}
                                     aria-label="OnlyMy mode button group"
                                     className={styles.onlyMyFilter}
                        >
                            <Button onClick={()=>{onChangeOnlyMyHandle('all')}}
                                    variant={onlyMy ? 'outlined' : 'contained'}>All</Button>
                            <Button onClick={()=>{onChangeOnlyMyHandle('my')}}
                                    variant={onlyMy ? 'contained' : 'outlined'}>My</Button>
                        </ButtonGroup>

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
                        <button type={'button'} onClick={onClickPageSizeHandle}>Select</button>
                    </div>
                </div>
                <div className={styles.columnContent}>

                    <div>
                        <h2>Packs list</h2>
                        <div className={styles.searchPacks}>
                            <SearchPacks/>
                        </div>
                        <table className={styles.tableBox}>
                            <thead>
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
                            </thead>
                            <tbody>
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
                            </tbody>
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
                    </div>
                </div>

            </div>
        </div>
    )
})
