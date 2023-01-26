import {$authHost, $host} from "./index";


export const createElectionsAndContests = async (electionOrContest) => {
    const {data} = await $authHost.post("api/elections_and_contests", electionOrContest)
    return data
}

export const fetchElectionsAndContests = async (page=1, limit=100000) => {
    const {data} = await $host.get("api/elections_and_contests", {params: {page, limit}})
    return data
}