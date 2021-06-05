import axios from 'axios';

const cardsRequest = axios.create({
    baseURL: 'http://localhost:7542/2.0',
    withCredentials: true
})
export type serverUserType = {
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
        return cardsRequest.post<serverUserType>(`/auth/login`, {email, password, rememberMe})
            .then(res => res.data)
    },
    me() {
        return cardsRequest.post<serverUserType>(`/auth/me`, {})
            .then(res => res.data)
    },
    logOut(){
        return cardsRequest.delete<serverResponseType>(`/auth/me`)
            .then(res => res.data)
    },
    updateMe(name: string, avatar: string) {
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