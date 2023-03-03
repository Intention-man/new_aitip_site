import {$authHost, $host} from "./index";


export const createDirectionBachelor = async (direction) => {
    const {data} = await $host.post("api/direction_bachelor/", direction)
    console.log(data)
    return data
}

export const updateDirectionBachelor = async (direction) => {
    const {data} = await $authHost.post("api/direction_bachelor/update", direction)
    return data
}

export const removeDirectionBachelor = async (id) => {
    const {data} = await $authHost.post("api/direction_bachelor/remove/" + id)
    return data
}

export const fetchDirectionsBachelor = async () => {
    const {data} = await $host.get("api/direction_bachelor/")
    return data
}

export const fetchOneDirectionBachelor = async (id) => {
    const {data} = await $host.get("api/direction_bachelor/" + id)
    return data
}

export const createAdditionalProgram = async (program) => {
    const {data} = await $host.post("api/additional_program/", program)
    console.log(data)
    return data
}

export const updateAdditionalProgram = async (program) => {
    const {data} = await $authHost.post("api/additional_program/update", program)
    return data
}

export const removeAdditionalProgram = async (id) => {
    const {data} = await $authHost.post("api/additional_program/remove/" + id)
    return data
}

export const fetchAdditionalPrograms = async () => {
    const {data} = await $host.get("api/additional_program/")
    return data
}

export const fetchOneAdditionalProgram = async (id) => {
    const {data} = await $host.get("api/additional_program/" + id)
    return data
}