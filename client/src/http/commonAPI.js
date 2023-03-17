import {$authHost, $host} from "./index";


export const convertFiles = async (files) => {
    const {data} = await $authHost.post("api/common/convert_files", files)
    console.log(data)
    return data
}

export const updateFileUsagesAPI = async (IdAndDelta) => {
    const {data} = await $authHost.post("api/common/update_file_usages", IdAndDelta)
    // console.log(data)
    return data
}

export const deleteAllUnusedFiles = async () => {
    const {data} = await $authHost.post("api/common/delete_all_unused_files")
    // console.log(data)
    return data
}

export const fetchAllFiles = async () => {
    const {data} = await $host.get("api/common/")
    return data
}