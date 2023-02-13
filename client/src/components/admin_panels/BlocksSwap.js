import React, {useEffect} from 'react';
import Block from "../common/Block";
import {useState} from "react";
import {useContext} from "react";
import {Context} from "../../index";
import {moveBlocks, updateBlock} from "../../http/blockAPI";


const BlocksSwap = () => {
    const {block_store} = useContext(Context);

    const [updatedBlocks, setUpdatedBlocks] = useState([]);

    useEffect(() => setUpdatedBlocks(block_store.selectedBlocks.sort((block1, block2) => block1.ordinal - block2.ordinal)), []);

    const swapBlocks = (index1, index2) => {
        let newBlockList = []
        for (let block of updatedBlocks) {
            if (block.ordinal !== index1 && block.ordinal !== index2) {
                newBlockList.push(block)
            } else {
                if (block.ordinal === index1) {
                    newBlockList.push({...block, ordinal: index2})
                } else {
                    newBlockList.push({...block, ordinal: index1})
                }
            }
        }
        newBlockList.sort((block1, block2) => block1.ordinal - block2.ordinal)
        setUpdatedBlocks(newBlockList)
    }

    const saveBlocksOrder = () => {
        const formData = new FormData()
        formData.append("blocks", JSON.stringify(updatedBlocks))
        moveBlocks(formData).then(data => console.log(data))
    }


    return (
        <div>
            {updatedBlocks.map(block =>
                <div style={{border: 'solid grey 5px', margin: "20px" }}>
                    <Block block={block}/>
                    {block.ordinal > 1 && <button onClick={() => swapBlocks(block.ordinal - 1, block.ordinal)}>Передвинуть блок на 1 выше</button>}
                    {block.ordinal < updatedBlocks.length && <button onClick={() => swapBlocks(block.ordinal, block.ordinal + 1)}>Передвинуть блок на 1 ниже</button>}
                </div>
            )}
            <button onClick={saveBlocksOrder}>Сохранить текущий порядок блоков</button>
        </div>
    );
};

export default BlocksSwap;