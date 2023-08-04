import React, {useContext, useEffect} from 'react';
import Block from "./Block";
import {addConstructorBlocks} from "../../additional_commands/commonPanelsFunctions";
import {Context} from "../../index";

/** Компонент используется всеми компонентами страниц, которые содержат конструкторские блоки. Содержит весь повторяющийся код
 *
 * @param blockList
 * @param setBlockList
 * @param handMadeBlocksCount
 * @returns {JSX.Element}
 * @constructor
 */

const CommonPagesDisplay = ({blockList, setBlockList, handMadeBlocksCount}) => {
    const {block_store} = useContext(Context);
    const myAddress = "/" + window.location.href.split("/")[3]

    addConstructorBlocks(myAddress, handMadeBlocksCount, block_store, blockList, setBlockList)

    useEffect(() => {
        addConstructorBlocks(myAddress, handMadeBlocksCount, block_store, blockList, setBlockList)
    }, [block_store.blocks, block_store.lines, handMadeBlocksCount, myAddress]);

    console.log(blockList)

    return (
        <>
            {Object.values(blockList).map((block, index) => {
                if (block.hasOwnProperty("id")) {
                    return <Block key={index} block={block} header={block.header}/>
                } else {
                    return <>{block}</>
                }
            })}
        </>
    );
};

export default CommonPagesDisplay;