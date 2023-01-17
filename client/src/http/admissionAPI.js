import {$authHost, $host} from "./index";


export const createDirectionBachelor = async (direction) => {
    const {data} = await $host.post("api/direction_bachelor/", direction)
    console.log(data)
    return data
}

export const fetchDirectionsBachelor = async () => {
    const {data} = await $host.get("api/direction_bachelor/")
    console.log(data)
    return data
}


export const fetchOneDirectionBachelor = async (id) => {
    const {data} = await $host.get("api/direction_bachelor/" + id)
    return data
}