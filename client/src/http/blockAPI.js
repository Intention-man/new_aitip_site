import {$authHost, $host} from "./index";


export const createBlock = async (blockData) => {
    try {
        const {data} = await $authHost.post("api/block/", blockData)
    console.log(data)
    return data
    } catch (e) {
        return null
    }
}

export const updateBlock = async (blockData) => {
    try {
        const {data} = await $authHost.post("api/block/update", blockData)
        return data
    } catch (e) {
        return null
    }

}

export const moveBlocks = async (blocks) => {
    try {
        const {data} = await $authHost.post("api/block/move", blocks)
        console.log(data)
        return data
    } catch (e) {
        return null
    } 
}

export const removeBlock = async (id) => {
    try {
        const {data} = await $authHost.post("api/block/remove/" + id)
        console.log(typeof id)
        return data
    } catch (e) {
        return null
    }   
}


export const fetchBlocks = async () => {
    try {
        const {data} = await $host.get("api/block/")
    return data
    } catch (e) {
        return null
    }   
}

export const fetchLines = async () => {
    try {
        const {data} = await $host.get("api/block/lines")
    return data
    } catch (e) {
        return null
    }
    
}

export const fetchOneBlock = async (id) => {
    try {
        const {data} = await $host.get("api/block/" + id)
    return data
    } catch (e) {
        return null
    }
    
}