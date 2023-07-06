import {convertFiles, fetchAllFiles, updateFileUsagesAPI} from "../http/commonAPI";
import {fetchBlocks} from "../http/blockAPI";


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

/**
 * Функция, вызывающая переполучение всего контента (блоков и линий) из БД
 */
export const refetchAllContent = (blockStore) => {
    fetchBlocks().then(data => {
        blockStore.setBlocks(data.rows);
        blockStore.setNews(data.rows.filter(block => block.isNews === true));
    });
    fetchLines().then(data => {
        blockStore.setLines(data.rows);
    });
}

export const addConstructorBlocks = (myAddress, handMadeBlocksCount, block_store, blockList, setBlockList) => {
    let pageConstructorBlocks = Array.from(block_store.blocks.filter(block => block.pageLink === myAddress).sort((block1, block2) => block1.ordinal - block2.ordinal))
    const count = pageConstructorBlocks.length + handMadeBlocksCount
    console.log(pageConstructorBlocks)

    for (let i = 1; (i <= count && pageConstructorBlocks.length > 0); i++) {
        if (!blockList.hasOwnProperty(i)) {
            // shift() - удаляет 0-ой элемент из массива и возвращает его
            const first = pageConstructorBlocks.shift()
            setBlockList(prev => ({...prev, [i]: first}))
        } else {
            console.log(blockList[i])
        }
    }
}