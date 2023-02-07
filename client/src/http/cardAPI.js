import {$authHost, $host} from "./index";


export const createCard = async (cardData) => {
    const {data} = await $host.post("api/lines/", cardData)
    console.log(data)
    return data
}

export const fetchCards = async () => {
    const {data} = await $host.get("api/lines/")
    return data
}

export const convertImages = async (imageList) => {
    const {data} = await $host.post("api/lines/convert_images", imageList)
    console.log(data)
    return data
}


//
// export const fetchOneDirectionBachelor = async (id) => {
//     const {data} = await $host.get("api/direction_bachelor/" + id)
//     return data
// }
