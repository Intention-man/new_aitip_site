import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

export const registration = async (email, password) => {
    const {data} = await $host.post('api/user/registration', {email, password, role: 'ADMIN'})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const login = async (email, password) => {
    const {data} = await $host.post('api/user/login', {email, password})
    const tok = jwt_decode(data.token)
    localStorage.setItem('token', data.token)
    return tok
}

export const check = async () => {
    const {data} = await $host.get('api/user/auth')
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}