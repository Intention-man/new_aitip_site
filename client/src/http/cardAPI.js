import {$authHost, $host} from "./index";


export const createCard = async (cardData) => {
    const {data} = await $host.post("api/card/", cardData)
    console.log(data)
    return data
}

export const fetchCards = async () => {
    const {data} = await $host.get("api/card/")
    return data
}

export const convertImages = async (imageList) => {
    const {data} = await $host.post("api/card/convert_images", imageList)
    console.log(data)
    return data
}


//
// export const fetchOneDirectionBachelor = async (id) => {
//     const {data} = await $host.get("api/direction_bachelor/" + id)
//     return data
// }
