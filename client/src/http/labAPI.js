import {$authHost, $host} from "./index";


export const createLab = async (lab) => {
    const {data} = await $authHost.post("api/lab", lab)
    return data
}

export const updateLab = async (lab) => {
    console.log("API")
    const {data} = await $authHost.post("api/lab/update", lab)
    return data
}

export const removeLab = async (id) => {
    const {data} = await $authHost.post("api/lab/remove/" + id)
    return data
}

export const fetchLabs = async (page=1, limit=100000) => {
    const {data} = await $host.get("api/lab", {params: {page, limit}})
    return data
}