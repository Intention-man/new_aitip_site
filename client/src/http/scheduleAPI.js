import {$authHost, $host} from "./index";


export const createSchedule = async (schedule) => {
    const {data} = await $authHost.post("api/schedule", schedule)
    return data
}

export const updateSchedule = async (schedule) => {
    const {data} = await $authHost.post("api/schedule/update", schedule)
    return data
}

export const removeSchedule = async (id) => {
    const {data} = await $authHost.post("api/schedule/remove/" + id)
    return data
}

export const fetchSchedules = async (page=1, limit=100000) => {
    const {data} = await $host.get("api/schedule", {params: {page, limit}})
    return data
}