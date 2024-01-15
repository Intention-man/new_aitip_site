import React, {useContext, useEffect} from 'react';
import Block from "./Block";
import {addConstructorBlocksToBlockList} from "../../additional_commands/commonPanelsFunctions";
import {Context} from "../../index";
import {publicRoutes} from "../../routes";
import {observer} from "mobx-react-lite";
import BlockContainer from './BlockContainer';
import FinishedBlock from "./FinishedBlock";

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
    const locationDataArr = window.location.href.split("/").slice(3)
    let myAddress = "/" + locationDataArr.join("/");
    const pageName = Array.from(publicRoutes.filter(route => route.path === myAddress))[0].name
    addConstructorBlocksToBlockList(myAddress, handMadeBlocksCount, block_store, blockList)

    return (
        <BlockContainer>
            <p className="blue_page_title">{pageName}</p>
                {
                    Object.values(blockList).map((blockData, index) => {
                        if (blockData.hasOwnProperty("id")) {
                            return <FinishedBlock key={index} blockData={blockData}/>
                        } else {
                            return <>{blockData}</>
                        }
                    })
                }
        </BlockContainer>
    );
});

export default CommonPagesDisplay;