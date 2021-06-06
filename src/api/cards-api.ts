import axios from 'axios';

const cardsRequest = axios.create({
    baseURL: 'http://localhost:7542/2.0',
    withCredentials: true
})
export type ProfileResponseType = {
    _id: string;
    email: string;
    name: string;
    avatar?: string;
    publicCardPacksCount: number; // количество колод
    created: Date;
    updated: Date;
    isAdmin: boolean;
    verified: boolean; // подтвердил ли почту
    rememberMe: boolean;
    error?: string;
}
export type packType = {
    _id: string
    user_id: string
    name: string
    path: string
    cardsCount: number
    grade: number
    shots: number // количество попыток
    rating: number // лайки
    type: string // ещё будет "folder" (папка)
    created: string
    updated: string
    __v: number
}
export type packsResponse = {
    cardPacks:packType[]
    cardPacksTotalCount: number // количество колод
    maxCardsCount: number
    minCardsCount: number
    page: number // выбранная страница
    pageCount: number // количество элементов на странице
}
export type  cardsResponseType =  {
    cards: [
        {
            answer: string
            question: string
            cardsPack_id: string
            grade: 4.987525071790364
            rating: number
            shots: number
            type: string
            user_id: string
            created: string
            updated: string
            __v: number
            _id: string
        },
    ]
    cardsTotalCount: number
    maxGrade:number
    minGrade: number
    page: number
    pageCount: number
    packUserId: string
}
export type serverResponseType = {
    info: string
    error: string;
}
export const pingAPI = {
    pingBack() {
        const response = cardsRequest.get<number>(`/ping?frontTime=${Date.now()}`) //
        return response
    }
}

export const authAPI = {
    registration(email: string, password: string) {
        return cardsRequest.post(`/auth/register/`, {email, password})
            .then(res => res.data)
    },
    logIn(email: string, password: string, rememberMe: boolean) {
        return cardsRequest.post<ProfileResponseType>(`/auth/login`, {email, password, rememberMe})
            .then(res => res.data)
    },
    me() {
        return cardsRequest.post<ProfileResponseType>(`/auth/me`, {})
            .then(res => res.data)
    },
    logOut(){
        return cardsRequest.delete<serverResponseType>(`/auth/me`)
            .then(res => res.data)
    },
    updateMe(name: string, avatar?: string) {
        return cardsRequest.put(`/auth/me`, {name, avatar})
            .then(res => res.data)
    },
    setNewPassword(password: string, resetPasswordToken: string) {
        return cardsRequest.post(`/auth/set-new-password`, {password, resetPasswordToken})
            .then(res => res.data)
    },
    restorePassword(email: string, from: string, message: string) {
        return cardsRequest.post(`https://neko-back.herokuapp.com/2.0/auth/forgot`, {email, from, message})
            .then(res => res.data)
    }

}
export const packAPI = {
    getPacks(pageCount:number = 1000,page:number = 4) {
        return cardsRequest.get<packsResponse>(`/cards/pack?pageCount=${pageCount}&page=${page}&sortPacks=0updated`)
            .then(res => res.data)
    },
    getUserPacks(pageCount:number = 1000,page:number = 4,user_id:string) {
        return cardsRequest.get<packsResponse>(`/cards/pack?pageCount=${pageCount}&page=${page}&sortPacks=0updated&user_id=${user_id}`)
            .then(res => res.data)
    },
    createPack() {
        return cardsRequest.post<packsResponse>(`/cards/pack`,{
            cardsPack: {
                name: "new pack 2.0",
            }})
            .then(res => res.data)
    },
    deletePack(id:string) {
        return cardsRequest.delete(`/cards/pack?id=${id}`)
            .then(res =>res.data)
    },
    updatePack(id:string,name:string) {
        return cardsRequest.put(`/cards/pack`,{
            cardsPack: {
                _id: id,
                name,
            }})
            .then(res => res.data)
    }
}
export const cardsAPI = {
    getCards(cardsPack_id:string) {
        return cardsRequest.get<cardsResponseType>('/cards/card')
            .then(res => res.data)
    },
    createCard(cardsPack_id: string) {
        return cardsRequest.post<packsResponse>(`/cards/card`,{cardsPack_id})
            .then(res => res.data)
    },
    deleteCard() {
        return cardsRequest.delete(`/cards/card`)
            .then(res =>res.data)
    },
    updateCard(_id:string,name:string) {
        return cardsRequest.put(`/cards/card `,{_id,name})
            .then(res => res.data)
    }
}