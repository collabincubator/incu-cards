import axios from 'axios';

const cardsRequest = axios.create({
    baseURL: 'http://localhost:7542/2.0',
    withCredentials: true
})

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
        return cardsRequest.post(`/auth/login`, {email, password, rememberMe})
            .then(res => res.data)
    },
    me() {
        return cardsRequest.post(`/auth/me`, {})
            .then(res => res.data)
    },
    logOut(){
        return cardsRequest.delete(`/auth/me`)
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