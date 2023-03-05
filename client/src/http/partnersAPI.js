import {$authHost, $host} from "./index";


export const createPartner = async (partner) => {
    const {data} = await $authHost.post("api/partners", partner)
    return data
}

export const updatePartner = async (partner) => {
    const {data} = await $authHost.post("api/partner/update", partner)
    return data
}

export const removePartner = async (id) => {
    const {data} = await $authHost.post("api/partner/remove/" + id)
    return data
}

export const fetchPartners = async (page=1, limit=100000) => {
    const {data} = await $host.get("api/partners", {params: {page, limit}})
    return data
}