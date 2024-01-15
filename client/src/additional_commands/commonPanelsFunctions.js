import {convertFiles, fetchAllFiles, updateFileUsagesAPI} from "../http/commonAPI";
import {fetchBlocks, fetchLines} from "../http/blockAPI";
import {useNavigate} from "react-router";


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

/**
 * Обновляет количество использования файла
 */

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
        blockStore.setNews(data.rows.filter(block => block.isNews === true).sort((e1, e2) => e2.id - e1.id));
    });
    fetchLines().then(data => {
        blockStore.setLines(data.rows);
    });
}


/**
 * Получает адрес страницы, количество ручных блоков, ссылку на глобальный класс, и 2 элемента состояния, хранящего блоки страницы.
 * Изначально в последнем только ссылки на компоненты-ручные блоки.
 * Метод добавляет в blockList все конструкторские блоки данной страницы
 */

export const addConstructorBlocksToBlockList = (myAddress, handMadeBlocksCount, block_store, blockList) => {
    let pageConstructorBlocks = Array.from(block_store.blocks.filter(block => block.pageLink === myAddress).sort((block1, block2) => block1.ordinal - block2.ordinal))
    const count = pageConstructorBlocks.length + handMadeBlocksCount

    for (let i = 1; (i <= count && pageConstructorBlocks.length > 0); i++) {
        if (!blockList.hasOwnProperty(i)) {
            blockList[i] = pageConstructorBlocks.shift();// shift() - удаляет 0-ой элемент из массива и возвращает его
        }
    }
}