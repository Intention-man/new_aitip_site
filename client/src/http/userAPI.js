import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

export const registration = async (email, password) => {
    const {data} = await $host.post('api/user/registration', {email, password, role: 'ADMIN'})
    sessionStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const login = async (email, password) => {
    const {data} = await $host.post('api/user/login', {email, password})
    const tok = jwt_decode(data.token)
    sessionStorage.setItem('token', data.token)
    return tok
}

export const check = async () => {
    try {
        const {data} = await $authHost.get('api/user/auth')
        sessionStorage.setItem('token', data.token)
        return jwt_decode(data.token)

    } catch (error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data.message);
            // console.log(error.response.status);
            // console.log(error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            alert(error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            alert('Error: ' + error.message);
        }
        // alert(error.config);
    }
}