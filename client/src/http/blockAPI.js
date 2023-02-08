import {$authHost, $host} from "./index";


export const createBlock = async (blockData) => {
    const {data} = await $host.post("api/block/", blockData)
    console.log(data)
    return data
}

export const updateBlock = async (blockData) => {
    const {data} = await $host.post("api/block/update", blockData)
    console.log(data)
    return data
}

export const convertFiles = async (files) => {
    const {data} = await $host.post("api/block/convert_files", files)
    console.log(data)
    return data
}



export const fetchBlocks = async () => {
    const {data} = await $host.get("api/block/")
    return data
}

export const fetchLines = async () => {
    const {data} = await $host.get("api/block/lines")
    return data
}

export const fetchOneBlock = async (id) => {
    const {data} = await $host.get("api/block/" + id)
    return data
}