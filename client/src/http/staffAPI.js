import {$authHost, $host} from "./index";


export const createStaffer = async (staff) => {
    const {data} = await $authHost.post("api/staff", staff)
    return data
}

export const updateStaffer = async (staffer) => {
    const {data} = await $authHost.post("api/staff/update", staffer)
    return data
}

export const removeStaffer = async (id) => {
    const {data} = await $authHost.post("api/staff/remove/" + id)
    return data
}

export const fetchStaff = async (page=1, limit=8) => {
    const {data} = await $host.get("api/staff", {params: {page, limit
        }})
    return data
}

export const fetchOneStaffer = async (id) => {
    const {data} = await $host.get("api/staff/" + id)
    return data
}