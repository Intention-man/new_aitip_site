// Creation prefixes for every API request

import axios from "axios";

const $host = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

const $authHost = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

// checking that admin token (that appear after authorization) was created
const authInterceptor = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem("token")}`
    return config
}

// if request has $authHost prefix, it will be executed only if admin authorized
$authHost.interceptors.request.use(authInterceptor)

export {
    $host,
    $authHost
}