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

export const moveBlocks = async (blocks) => {
    const {data} = await $host.post("api/block/move", blocks)
    console.log(data)
    return data
}

export const removeBlock = async (id) => {
    const {data} = await $host.post("api/block/remove/" + id)
    console.log(typeof id)
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