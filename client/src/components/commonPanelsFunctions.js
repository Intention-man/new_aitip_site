import {convertFiles, fetchAllFiles, updateFileUsagesAPI} from "../http/commonAPI";
import {useContext} from "react";
import {Context} from "../index";


export function selectFile(e, block_store) {
    const fileObject = e
    const formData = new FormData();
    formData.append("files", fileObject)
    convertFiles(formData).then(file => {
        fetchAllFiles().then(data => {
                block_store.setAllFiles(data.rows)
                console.log(file)
                return file.link
            }
        )
    });
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