import {$authHost, $host} from "./index";


export const createNews = async (news) => {
    const {data} = await $host.post("api/news/", news)
    console.log(data)
    return data
}

export const fetchNews = async () => {
    const {data} = await $host.get("api/news/")
    return data
}

export const convertImages = async (imageList) => {
    const {data} = await $host.post("api/news/convert_images", imageList)
    return data
}


//
// export const fetchOneDirectionBachelor = async (id) => {
//     const {data} = await $host.get("api/direction_bachelor/" + id)
//     return data
// }
