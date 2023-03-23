import {convertFiles, fetchAllFiles, updateFileUsagesAPI} from "../http/commonAPI";


export function selectFile(e, block_store) {
    const fileObject = e
    const formData = new FormData();
    formData.append("files", fileObject)
    convertFiles(formData).then(filesLinksList => {
        fetchAllFiles().then(data => {
            block_store.setAllFiles(data.rows)
        })
        console.log(filesLinksList)
        if (filesLinksList.length === 1) {
            console.log(filesLinksList[0])
            return filesLinksList[0]
        } else if (filesLinksList.length === 0) {
            console.log(null)
            return null
        } else {
            console.log(filesLinksList)
            return filesLinksList
        }
    })
}

export const updateFileUsages = (fileLink, delta) => {
    const formData = new FormData();
    formData.append("fileLink", fileLink)
    formData.append("delta", `${delta}`)
    updateFileUsagesAPI(formData).then(newCountUsages => {
        console.log(fileLink, delta)
        console.log(newCountUsages)
        return newCountUsages
    })
}