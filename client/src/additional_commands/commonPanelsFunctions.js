import {convertFiles, fetchAllFiles, updateFileUsagesAPI} from "../http/commonAPI";
import { fetchBlocks } from "../http/blockAPI";
// const addFiles = (files) => {
//     const formData = new FormData();
//     files.forEach(el => formData.append("files", el));
//     console.log(files)
//     convertFiles(formData).then(list => {
//         setFilesNames(list);
//         changeLine("filesNames", list, index)
//     });
// }

export async function selectFile(files, block_store) {
    const formData = new FormData();
    if (!Array.isArray(files)) {
        formData.append("files", files);
    } else {
        files.forEach(el => formData.append("files", el));
    }

    const filesLinksList = await convertFiles(formData);
        
    fetchAllFiles().then(data => {
        block_store.setAllFiles(data.rows)
    });

    if (filesLinksList.length === 1) {
        return filesLinksList[0];
    } else if (filesLinksList.length === 0) {
        return null;
    } else {
        return filesLinksList;
    }
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

export const refetchBlocks = (blockStore) => {
    fetchBlocks().then(data => {
        blockStore.setBlocks(data.rows);
        blockStore.setNews(data.rows.filter(block => block.isNews === true));
    });
}