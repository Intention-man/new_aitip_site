import {convertFiles, fetchAllFiles, updateFileUsagesAPI} from "../http/commonAPI";
// const addFiles = (files) => {
//     const formData = new FormData();
//     files.forEach(el => formData.append("files", el));
//     console.log(files)
//     convertFiles(formData).then(list => {
//         setFilesNames(list);
//         changeLine("filesNames", list, index)
//     });
// }

export function selectFile(files, block_store) {
    console.log("selectFile")
    console.log(typeof files)
    const formData = new FormData();
    if (!Array.isArray(files)) {
        formData.append("files", files)
    } else {
        files.forEach(el => formData.append("files", el));
    }
    console.log(Object.entries(formData))


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