import React, {useContext, useEffect} from 'react';
import Block from "./Block";
import {addConstructorBlocks} from "../../additional_commands/commonPanelsFunctions";
import {Context} from "../../index";
import {publicRoutes} from "../../routes";
import {observer} from "mobx-react-lite";
import BlockContainer from './BlockContainer';

/** Компонент используется всеми компонентами страниц, которые содержат конструкторские блоки. Содержит весь повторяющийся код
 *
 * @param blockList
 * @param setBlockList
 * @param handMadeBlocksCount
 * @returns {JSX.Element}
 * @constructor
 */
const CommonPagesDisplay = observer(({blockList, handMadeBlocksCount}) => {
    const {block_store} = useContext(Context);
    const myAddress = "/" + window.location.href.split("/")[3]


    blockList = addConstructorBlocks(myAddress, handMadeBlocksCount, block_store, blockList)

    const pageName = Array.from(publicRoutes.filter(route => route.path === myAddress))[0].name

    useEffect(() => {
        blockList = addConstructorBlocks(myAddress, handMadeBlocksCount, block_store, blockList)
    }, [block_store.blocks, block_store.lines, handMadeBlocksCount, myAddress]);

    console.log(blockList)

    return (
        <BlockContainer>
            <p className="blue_page_title">{pageName}</p>
                {
                    Object.values(blockList).map((block, index) => {
                        if (block.hasOwnProperty("id")) {
                            return <Block key={index} block={block} header={block.header}/>
                        } else {
                            return <>{block}</>
                        }
                    })
                }
        </BlockContainer>
    );
});

export default CommonPagesDisplay;